import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.use(authenticate);

// Placeholder - implement checkpoint management
router.get('/', async (req, res) => {
  res.json({ message: 'Checkpoints endpoint - to be implemented' });
});

export default router;