import { useDispatch } from "react-redux";
import { deleteGoal } from '../features/goals/goalsSlice'

function GoalItem({goal}) {

  const dispatch = useDispatch();

  return (
    <div style={{border: '1px solid rgba(252, 251, 251, 0.85)'}}>
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
    </div>
  )
}

export default GoalItem