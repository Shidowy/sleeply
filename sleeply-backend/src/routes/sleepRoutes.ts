import express from 'express';
import { logSleep } from '../controllers/SleepController';

const router = express.Router();

router.post('/log', logSleep);

export default router;