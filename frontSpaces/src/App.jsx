import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Route, Routes} from "react-router-dom"
import GlobalContext from "./context/GlobalContext"

import Menu from './components/Menu'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Home from './pages/Home'


function App() {

  return (
    <GlobalContext.Provider value={null}>

      <div className="app">

        Spaces App

        <Menu/>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/spaces" element={<Home />}/>
        </Routes>
      </div>
    </GlobalContext.Provider>

  )
}

export default App
