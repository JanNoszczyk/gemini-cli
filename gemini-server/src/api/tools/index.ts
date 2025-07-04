import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.use(authenticate);

// Placeholder - implement tools management
router.get('/', async (req, res) => {
  res.json({ message: 'Tools endpoint - to be implemented' });
});

export default router;