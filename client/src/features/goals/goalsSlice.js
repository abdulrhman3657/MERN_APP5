import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';


const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create new goal
export const createGoal = createAsyncThunk('goals/create',
    async (goalData, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.user.token;

            if(token) {
                return goalService.createGoal(goalData, token);
            }
            
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// get user goals
export const getGoals = createAsyncThunk('goals/getAll',
    async (_, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.user.token;

            if(token) {
                return goalService.getGoals(token);
            }
            else {
                console.log("user token is null")
            }
            
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// delete user goal
export const deleteGoal = createAsyncThunk('goals/delete',
    async (id, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.user.token;

            if(token) {
                return await goalService.deleteGoal(id, token);
            }

    
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)
  
export const goalSlice = createSlice({
    name: 'goal',
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;