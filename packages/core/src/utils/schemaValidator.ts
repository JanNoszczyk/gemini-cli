/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Schema } from '@google/genai';
import { default as Ajv } from 'ajv';

const ajValidator = new Ajv({
  allErrors: true,
  verbose: true,
});

/**
 * Simple utility to validate objects against JSON Schemas
 */
export class SchemaValidator {
  /**
   * Returns null if the data confroms to the schema described by schema (or if schema
   *  is null). Otherwise, returns a string describing the error.
   */
  static validate(schema: Schema | undefined, data: unknown): string | null {
    if (!schema) {
      return null;
    }
    if (typeof data !== 'object' || data === null) {
      return 'Value of params must be an object';
    }
    const validate = ajValidator.compile(this.toObjectSchema(schema));
    const valid = validate(data);
    if (!valid && validate.errors) {
      // Create error message manually to match expected format
      const error = validate.errors[0];
      if (error.keyword === 'required') {
        return `params must have required property '${error.params.missingProperty}'`;
      } else if (error.keyword === 'type') {
        const path = error.instancePath ? `params${error.instancePath}` : 'params';
        return `${path} must be ${error.schema}`;
      } else if (error.keyword === 'pattern') {
        const path = error.instancePath ? `params${error.instancePath}` : 'params';
        return `${path} must match pattern "${error.schema}"`;
      } else if (error.keyword === 'minItems') {
        const path = error.instancePath ? `params${error.instancePath}` : 'params';
        return `${path} must NOT have fewer than ${error.schema} items`;
      } else if (error.keyword === 'minLength') {
        const path = error.instancePath ? `params${error.instancePath}` : 'params';
        return `${path} must NOT have fewer than ${error.schema} characters`;
      } else {
        // Fallback to basic error message
        return `Validation error: ${error.message}`;
      }
    }
    return null;
  }

  /**
   * Converts @google/genai's Schema to an object compatible with avj.
   * This is necessry because it represents Types as an Enum (with
   * UPPERCASE values) and minItems and minLength as strings, when they should be numbers.
   */
  private static toObjectSchema(schema: Schema): object {
    const newSchema: Record<string, unknown> = { ...schema };
    if (newSchema.anyOf && Array.isArray(newSchema.anyOf)) {
      newSchema.anyOf = newSchema.anyOf.map((v) => this.toObjectSchema(v));
    }
    if (newSchema.items) {
      newSchema.items = this.toObjectSchema(newSchema.items);
    }
    if (newSchema.properties && typeof newSchema.properties === 'object') {
      const newProperties: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(newSchema.properties)) {
        newProperties[key] = this.toObjectSchema(value as Schema);
      }
      newSchema.properties = newProperties;
    }
    if (newSchema.type) {
      newSchema.type = String(newSchema.type).toLowerCase();
    }
    if (newSchema.minItems) {
      newSchema.minItems = Number(newSchema.minItems);
    }
    if (newSchema.minLength) {
      newSchema.minLength = Number(newSchema.minLength);
    }
    return newSchema;
  }
}
