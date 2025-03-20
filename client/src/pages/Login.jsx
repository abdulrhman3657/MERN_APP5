import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';


function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading,  isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
  
      if (isError) {
        toast.error(message);
      }
  
      if (isSuccess || user) {
        navigate('/');
      }
  
      dispatch(reset());
  
    }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email, 
      password
    }

    dispatch(login(userData));

  }



  return (
    <div>
        <p>Login</p>

        <form onSubmit={onSubmit}>

          <input
            type="text"
            // id='name'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='email'
          /> <br />

          <input
            type="text"
            // id='name'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='password'
          /> <br />

          <button type='submit'>submit</button>

        </form>

    </div>
  )
}

export default Login