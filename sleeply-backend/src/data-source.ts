// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './models/User'; // Assuming you have a User model
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, // Make sure to use environment variables
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true, // Important for Neon DB
  synchronize: true, // Automatically sync schema (development)
  logging: false, // Set to true to see SQL logs in the console
  entities: [User], // Add all your entity models here
  migrations: [],
  subscribers: [],
});
