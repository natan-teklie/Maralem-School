import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import React, { useContext, useRef } from 'react'
import { Appstate } from '../App';

const Login = () => {
  const navigate = useNavigate()
  const{setUser} = useContext(Appstate)
  const emailDemo = useRef();
  const passwordDemo = useRef();
  async function handleSubmit(e){
    e.preventDefault()
    const emailValue = emailDemo.current.value;
    const passwordValue = passwordDemo.current.value;
    if(!emailValue || !passwordValue){
      alert('please fill all required fields')
    }

    try {
      const {data} = await axios.post('/users/login', {
        email:emailValue,
        password:passwordValue,
      })
      alert('successfuly login')
      localStorage.setItem('token', data.token)
      setUser(data)
      // console.log(data)

      navigate('/')


    } catch (error) {
      alert(error?.response?.data?.msg)
    }
  }
  return (
    <section className='login'>
      <form onSubmit={handleSubmit}>
        <div><span>Email:</span><input ref={emailDemo} type="email" placeholder='email'/></div>
        <div><span>Password:</span><input ref={passwordDemo} type="password" placeholder='password' /></div>
        <button type='submit'>Login</button>
        <p>Have no account? <Link to={'/register'}>Register</Link></p>
      </form>
    </section>
  )
}

export default Login