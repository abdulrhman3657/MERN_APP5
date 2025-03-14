import express from 'express';
import goalModel from '../models/goalModel.js';
import protect from '../middleware/authMiddleware.js';

const goalRouter = express.Router();

// get goals
goalRouter.get('/', protect, async (req, res) => {
    try {
        
        console.log(`${req.method}: ${req.path}`);

        const goals = await goalModel.find({ user: req.user.id });

        res.status(200).json(goals);
        // res.status(200).send("hello");
        
    } catch (error) {
        res.json({message: error.message});
    }
})

// post goal
goalRouter.post('/', protect, async (req, res) => {
    try {

        console.log(`${req.method}: ${req.path}`);

        // { text: 'ssd', user: 2323 }
        // console.log({...{text:"ssd"}, user: 2323});

        const goal = await goalModel.create({...req.body, user: req.user.id});

        res.status(200).json(goal);
        
    } catch (error) {
        res.json({message: error.message});
    }

})

// update goal
goalRouter.put('/:goalID', protect, async (req, res) => {
    try {

        console.log(`${req.method}: ${req.path}`);

        const goal = await goalModel.findById(req.params.goalID)
        
        if (!goal) {
            res.status(400)
            throw new Error('goal not found')
        }

        // check for user
        if (!req.user) {
            res.status(401)
            throw new Error('user not found')
        }

        // check if the logged in user matches the goal user
        if (goal.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('user not authorized')
        }

        const updatedGoal = await goalModel.findByIdAndUpdate(req.params.goalID, req.body, {new: true});

        res.status(200).json(updatedGoal)
        
    } catch (error) {
        res.json({message: error.message});
    }
})

// delete goal
goalRouter.delete('/:goalID', protect, async (req, res) => {
    try {

        console.log(`${req.method}: ${req.path}`);

        const goal = await goalModel.findById(req.params.goalID)

        if (!goal) {
          res.status(400)
          throw new Error('goal not found')
        }
      
        // check for user
        if (!req.user) {
          res.status(401)
          throw new Error('user not found')
        }
      
        // check if the logged in user matches the goal user
        if (goal.user.toString() !== req.user.id) {
          res.status(401)
          throw new Error('user not authorized')
        }
      
        await goalModel.findByIdAndDelete(req.params.goalID);
      
        res.status(200).json({ id: req.params.goalID })
        
    } catch (error) {
        res.json({message: error.message});
    }
    
})

export default goalRouter;