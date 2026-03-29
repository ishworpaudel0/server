import { Router } from 'express';
import authRoutes from './authRouter';
import sessionRoutes from './sessionRoute';

const router = Router();

router.use('api/auth', authRoutes);
router.use('api/sessions', sessionRoutes);

export default router;