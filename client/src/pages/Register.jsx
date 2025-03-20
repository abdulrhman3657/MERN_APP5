import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;

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

    if (password !== password2) {
      toast.error('passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData));

    }
  }



  return (
    <div>
        <p>please create an account</p>

        <form onSubmit={onSubmit}>

          <input
            type="text"
            // id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='name'
          /> <br />

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

          <input
            type="text"
            // id='name'
            name='password2'
            value={password2}
            onChange={onChange}
            placeholder='enter password again'
          /> <br />

          <button type='submit'>submit</button>

        </form>

    </div>
  )
}

export default Register