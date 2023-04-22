import { useState } from 'react';
import './App.css'
//import '@fontsource/roboto/300.css';
//import '@fontsource/roboto/400.css';
//import '@fontsource/roboto/500.css';
//import '@fontsource/roboto/700.css';
import {Route, Routes, useNavigate} from "react-router-dom"
import GlobalContext from "./context/GlobalContext"

import Menu from './components/Menu'
import Footer from './components/Footer';
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { Home } from './pages/Home'; 
import SpaceInfo from './pages/SpaceInfo'


function App() {
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
})

const [user, setUser] = useState({
  email: '',
  password: '',
})

const logout = () => {
  setUser({
    ...user,
    email: '',
    token: ''
  })
  navigate("/")
}

const context = { newUser, setNewUser, user, setUser, logout }

  return (
    <GlobalContext.Provider value={context}>
      <div className="app">
        <Menu/>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/spaceInfo" element={<SpaceInfo />}/>

        </Routes>
        <Footer />
      </div>
    </GlobalContext.Provider>

  )
}

export default App
