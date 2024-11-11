import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

// Register route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);

export default router;
