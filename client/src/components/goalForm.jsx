import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from '../features/goals/goalsSlice';

function goalForm() {

    const [text, setText] = useState('');

    const dispatch = useDispatch(); 

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createGoal({text}));
        setText('');

    }


  return (
    <div>
        <form onSubmit={onSubmit}>
            <label>Goal</label>
            <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)} />
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default goalForm