import { Router, Request, Response, NextFunction } from 'express';
import { authService } from '../../services/AuthService';
import { monitoringService } from '../../services/MonitoringService';

const router = Router();

// Login with email/password
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = await authService.validateUser(email, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = authService.generateToken(user);
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create API key
router.post('/api-key', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const user = await authService.validateUser(email, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const apiKey = authService.generateApiKey(user.id);
    
    res.json({
      apiKey,
      userId: user.id
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token
router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }
    
    const decoded = authService.verifyToken(token);
    const user = await authService.getUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const newToken = authService.generateToken(user);
    
    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
});

// Register new user (admin only in production)
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, role = 'engineer' } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' });
    }
    
    const user = await authService.createUser({
      email,
      password,
      name,
      role: role as 'admin' | 'engineer' | 'viewer'
    });
    
    const token = authService.generateToken(user);
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// OAuth callback (placeholder)
router.post('/callback', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Implement OAuth callback logic here
    res.json({ message: 'OAuth callback not implemented yet' });
  } catch (error) {
    next(error);
  }
});

// Logout (optional - mainly for session tracking)
router.delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // This endpoint can be used for audit logging
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;