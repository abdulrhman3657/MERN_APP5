import express from 'express';
import goalModel from '../models/goalModel.js';

// Goal == goalModel

const router = express.Router();

// get goals
router.get('/', async (req, res) => {
    try {
        
        console.log(`${req.method}: ${req.path}`);

        const goals = await goalModel.find();

        res.status(200).json(goals);
        // res.status(200).send("hello");
        
    } catch (error) {
        res.json({message: error.message});
    }
})

// post goal
router.post('/', async (req, res) => {
    try {

        console.log(`${req.method}: ${req.path}`);

        console.log(req.body);

        const goal = await goalModel.create(req.body);

        res.status(200).json(goal);
        
    } catch (error) {
        res.json({message: error.message});
    }

})

// update goal
router.put('/:goalID', async (req, res) => {
    try {

        console.log(`${req.method}: ${req.path}`);

        if(req.params.goalID === undefined)
            throw new Error(`goalID:${req.params.goalID} is not defiend`);

        const updatedGoal = await goalModel.findByIdAndUpdate(req.params.goalID, req.body, {new: true});

        if (updatedGoal === null)
            throw new Error("trying to update null (goal not found)");

        res.json(updatedGoal);
        
    } catch (error) {
        res.json({message: error.message});
    }
})


// delete goal
router.delete('/:goalID', async (req, res) => {
    try {

        console.log(`${req.method}: ${req.path}`);

        if(req.params.goalID === undefined)
            throw new Error(`goalID:${req.params.goalID} is not defiend`);

        const goal = await goalModel.findByIdAndDelete(req.params.goalID);

        if (goal === null)
            throw new Error("trying to delete null (goal not found)");


        res.status(200).json({ ID: req.params.goalID });
        
    } catch (error) {
        res.json({message: error.message});
    }
    
})

export default router;