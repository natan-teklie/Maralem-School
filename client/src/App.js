
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const Appstate = createContext()
function App() {
  const [user, setUser]  = useState({})
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  async function checkUser(){
    try {
      const {data} = await axios.get('/users/check',{
        headers:{
          Authorization:'Bearer ' + token,
        },
      })
    } catch (error) {
      navigate('/login');
      console.log(error.response)
    }
    }


    useEffect(()=>{
      checkUser()
    }, [])
  return (
    <Appstate.Provider value={{user, setUser}} className="App">
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
   </Routes>
    </Appstate.Provider>
  );
}

export default App;
