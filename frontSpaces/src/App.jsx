import './App.css'
import {Route, Routes} from "react-router-dom"
import GlobalContext from "./context/GlobalContext"

import Menu from './components/Menu'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Spaces from './pages/Spaces'


function App() {

  return (
    <GlobalContext.Provider value={null}>

      <div className="app">

        Spaces App

        <Menu/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/spaces" element={<Spaces />}/>
        </Routes>
      </div>
    </GlobalContext.Provider>

  )
}

export default App
