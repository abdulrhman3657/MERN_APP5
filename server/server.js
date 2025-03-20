import express from 'express';
import dotenv from 'dotenv';
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
    connectDB();
})