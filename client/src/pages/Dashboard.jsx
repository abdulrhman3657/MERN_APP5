import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/goalForm";
import { getGoals, reset } from "../features/goals/goalsSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {

  const navigte = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    if(!user) {
      navigte('/login');
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    }

  }, [user, navigte])

  return (
    <>
    
    <div>
      welcome {user && user.name}
    </div>

    <p>goals dashboard</p>

    {isLoading && <p>Loading...</p>}

    <GoalForm/>

    <div>
      {goals.length > 0 ? (
        <div>
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<p>you have not set any gols</p>)}
    </div>
    
    </>
  )
}

export default Dashboard