import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, JwtTokenPayload } from '../types';

export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  
  // In production, this would be a database
  private users: Map<string, User & { password: string }> = new Map();

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default-secret-change-this';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
    
    // Initialize with a demo user (remove in production)
    this.createUser({
      email: 'demo@example.com',
      password: 'demo123',
      name: 'Demo User',
      role: 'engineer'
    });
  }

  async createUser(userData: {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'engineer' | 'viewer';
  }): Promise<User> {
    const id = this.generateUserId();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user: User & { password: string } = {
      id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.users.set(id, user);
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    
    if (!user) {
      return null;
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateApiKey(apiKey: string): Promise<User | null> {
    // In production, validate against database
    // For now, we'll accept a specific format
    if (apiKey.startsWith('gsk_')) {
      const userId = apiKey.split('_')[1];
      const user = this.users.get(userId);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }
    return null;
  }

  generateToken(user: User): string {
    const payload: JwtTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    } as jwt.SignOptions);
  }

  verifyToken(token: string): JwtTokenPayload {
    return jwt.verify(token, this.jwtSecret) as JwtTokenPayload;
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = this.users.get(userId);
    if (!user) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  generateApiKey(userId: string): string {
    // Simple API key generation - in production, use a more secure method
    return `gsk_${userId}_${this.generateRandomString(32)}`;
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Export singleton instance
export const authService = new AuthService();