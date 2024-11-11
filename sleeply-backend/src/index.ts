import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source'; // Import your data source
import userRoutes from './routes/authRoutes'; // Import routes

const app = express();
const port = 3000;

app.use(express.json());

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    
    // Define routes
    app.use('/api/users', userRoutes);
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1); // Exit if the connection fails
  });
