import React, { useContext } from 'react'
import './Home.css'
import { Appstate } from '../App'

const Home = () => {
  const {user} = useContext(Appstate)
  return (
    <div className='home'><h1>Home</h1>
    <br />
    <br />
    <br />
    <br />
    <br />
    <h4>Wellcome: {user.username}</h4>
    </div>
  )
}

export default Home