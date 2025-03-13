import express from 'express';
import dotenv from 'dotenv';
import router from './routes/goalRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/goals', router);

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
    connectDB();
})