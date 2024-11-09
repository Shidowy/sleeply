import express from 'express';
import { logSleep } from '../controllers/SleepController';

const router = express.Router();

// POST route for logging sleep data
router.post('/log', logSleep);

// Optional: GET route for the root of /api/sleep (e.g., to list sleep logs)
router.get('/', (req, res) => {
  res.send('Sleep API is working');
});

export default router;