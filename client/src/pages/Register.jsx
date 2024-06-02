import React from "react";
import { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const usernameDemo = useRef()
    const firstnameDemo = useRef()
    const lastnameDemo = useRef()
    const emailDemo = useRef()
    const passwordDemo = useRef()
   async function handleSubmit(e){
        e.preventDefault()
        // console.log(usernameDemo.current.value)
        const usernameValue = usernameDemo.current.value
       
        const firstnameValue = firstnameDemo.current.value
        const lastnameValue = lastnameDemo.current.value
        const emailValue = emailDemo.current.value
        const passwordValue = passwordDemo.current.value
        if(!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue){
            alert("please provide all requierd filds")
            return
        }
try {
    await axios.post('/users/register', {
        username:usernameValue,
        firstname:firstnameValue,
        lastname:lastnameValue,
        email:emailValue,
        password:passwordValue,
    },)
    alert('succefuly registered')
    navigate('/login')

} catch (error) {
    // alert(error)
}
       

    }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>User:</span>
          <input ref={usernameDemo} type="text" placeholder="username" />
        </div>
        <div>
          <span>Firstname:</span>
          <input ref={firstnameDemo} type="text" placeholder="firstname" />
        </div>
        <div>
          <span>Lastname:</span>
          <input  ref={lastnameDemo} type="text" placeholder="lastname" />
        </div>
        <div>
          <span>Email:</span>
          <input  ref={emailDemo} type="email" placeholder="email" />
        </div>
        <div>
          <span>Password:</span>
          <input ref={passwordDemo} type="password"  placeholder="password"/>
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
