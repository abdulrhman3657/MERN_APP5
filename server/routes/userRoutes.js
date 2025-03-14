import express from 'express';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import protect from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// register new user
userRouter.post('/', async (req, res) => {
    try {
        
        console.log(`${req.method}: ${req.path}`);

        const {name, email, password} =  req.body;

        if(!name || !email || !password) {
            res.status(400);
            throw new Error("please add all fields");
        }

        const userExists = await userModel.findOne({email});

        if(userExists) {
            res.status(400);
            throw new Error("user already exists");
        }

        // has password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        // user.id = 67d3b2a83e1a3a1e651885b3
        // user._id = new ObjectId('67d3b2a83e1a3a1e651885b3')

        if(user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error("invalid user data");
        }
        
    } catch (error) {
        res.json({message: error.message});
    }
})

// login user
userRouter.post('/login', async (req, res) => {
    try {
        
        console.log(`${req.method}: ${req.path}`);

        const {email, password} =  req.body;

        // check for user email
        const user = await userModel.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400);
            throw new Error("invalid credentials");
        }
        
    } catch (error) {
        res.json({message: error.message});
    }
})

// get me (login using the token), protect the route using middleware
userRouter.get('/me', protect, asyncHandler(async (req, res) => {
    try {
        
        console.log(`${req.method}: ${req.path}`);
        // console.log(`${req.method}: ${req.baseUrl}`);

        // console.log(req.body);

        const {_id, name, email} = await userModel.findById(req.user.id);

        res.status(200).json({
            id: _id,
            name, 
            email
        });
        
    } catch (error) {
        res.json({message: error.message});
    }
}))

// generate JWT
function generateToken(ID) {
    return jwt.sign({ ID }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
} 

export default userRouter;