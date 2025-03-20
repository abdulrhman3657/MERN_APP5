import express from 'express';
import dotenv from 'dotenv';
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { connectDB } from './config/db.js';
import cors from 'cors'


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
    connectDB();
})