"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from the root .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
// Also load from the server's .env file if it exists
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
// Ensure we have required environment variables for tests
if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required for integration tests');
}
// Set test-specific environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-for-integration-tests';
process.env.PORT = '0'; // Let the system assign a random port
//# sourceMappingURL=setup.js.map