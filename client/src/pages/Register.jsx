import React, { useState } from 'react'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;

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