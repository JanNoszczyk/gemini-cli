/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * TokenManager handles JWT token lifecycle including expiry checking and refresh
 */
export class TokenManager {
  private token: string;
  private expiresAt: Date;
  private refreshCallback?: () => Promise<string>;

  constructor(initialToken: string, refreshCallback?: () => Promise<string>) {
    this.token = initialToken;
    this.expiresAt = this.parseTokenExpiry(initialToken);
    this.refreshCallback = refreshCallback;
  }

  async getValidToken(): Promise<string> {
    if (this.isTokenExpiring() && this.refreshCallback) {
      this.token = await this.refreshCallback();
      this.expiresAt = this.parseTokenExpiry(this.token);
    }
    return this.token;
  }

  private isTokenExpiring(): boolean {
    const bufferMinutes = 5;
    return new Date() >= new Date(this.expiresAt.getTime() - bufferMinutes * 60000);
  }

  private parseTokenExpiry(token: string): Date {
    // Parse JWT to get expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch {
      // Default to 1 hour if parsing fails
      return new Date(Date.now() + 3600000);
    }
  }

  /**
   * Update the token manually
   */
  updateToken(newToken: string): void {
    this.token = newToken;
    this.expiresAt = this.parseTokenExpiry(newToken);
  }

  /**
   * Check if token is valid (not expired)
   */
  isTokenValid(): boolean {
    return new Date() < this.expiresAt;
  }

  /**
   * Get token expiration time
   */
  getExpirationTime(): Date {
    return this.expiresAt;
  }
}