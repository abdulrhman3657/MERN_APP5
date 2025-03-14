import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import userModel from '../models/userModel.js';


const protect = asyncHandler(async (req, res, next) => {
    try{

        let token;
    
        if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')) {
            try {
                
                // get the token from the header
                token = req.headers.authorization.split(' ')[1];
    
                // verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
                // get the user from the token, exclude the password
                req.user = await userModel.findById(decoded.ID).select('-password');
    
                next();
    
            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error("not authorized");
            }
        }
    
        if (!token) {
            res.status(401);
            throw new Error("not authorized, no token");
        }

    } catch(error) {
        res.json({message: error.message});
    }
});

export default protect;