import React, { useState } from 'react'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
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