import express, { Request, Response } from 'express';
import sleepRoutes from './routes/sleepRoutes';
import cors from 'cors';

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies

// Link the routes
app.use('/api/sleep', sleepRoutes);  // All routes in sleepRoutes will start with /api/sleep

// Example of a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
