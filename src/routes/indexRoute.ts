import { Router } from 'express';
import authRoutes from './authRouter';
import sessionRoutes from './userRoute';
import permissionRoutes from './permissionRoute';
import rolesRoutes from './rolesRoute';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/sessions', sessionRoutes);
router.use('/permissions', permissionRoutes);
router.use('/roles', rolesRoutes);

export default router;