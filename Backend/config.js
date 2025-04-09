import dotenv from 'dotenv';
dotenv.config();

export const PORT = 5000;

export const mongoDBURI = process.env.MONGODB_URI;
