import { useState } from 'react';
import './App.css'
//import '@fontsource/roboto/300.css';
//import '@fontsource/roboto/400.css';
//import '@fontsource/roboto/500.css';
//import '@fontsource/roboto/700.css';
import {Route, Routes, useNavigate} from "react-router-dom"
import GlobalContext from "./context/GlobalContext"

import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import SpaceCard from './components/SpaceCard/SpaceCard'

import Error from './pages/Error/Error';

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import { Home } from './pages/Home/Home'; 
import SpaceInfo from './pages/SpaceInfo/SpaceInfo'
import MySpaces from './pages/MySpaces/MySpaces'
import MyReservations from './pages/MyReservations/MyReservations'
import AddSpace from './pages/addSpace/addSpace'
import Confirmation from './pages/Confirmation/Confirmation'
import Bookings from './pages/Bookings/Bookings'
import EditSpace from './pages/EditSpace/EditSpace'

function App() {

  const navigate = useNavigate()
  const [date, setDate] = useState([
    new Date(),
    new Date(),
  ])
  const [newUser, setNewUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
})

const [queryLocation, setQueryLocation] = useState("")
const [fetchSpaceId, setFetchSpaceId] = useState("")
const [bookings, setBookings] = useState([])
const [refresh, setRefresh] = useState(false)

const [error, setError]  = useState("")
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
  localStorage.removeItem("token");
  navigate("/")
}

const context = { 
  date, setDate,
  newUser, setNewUser, 
  user, setUser, 
  error, setError, 
  queryLocation, setQueryLocation,
  bookings, setBookings,
  refresh, setRefresh,
  fetchSpaceId, setFetchSpaceId,
  logout 
}

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
          <Route path="/spaceInfo/:spaceId" element={<SpaceInfo />}/>
          <Route path="/MySpaces" element={<MySpaces />}/>
          <Route path="/MyReservations" element={<MyReservations/>}/>
          <Route path="/bookings" element={<Bookings/>}/>
          <Route path="/addSpace" element={<AddSpace />} />
          <Route path="/editSpace" element={<EditSpace />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/error" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </GlobalContext.Provider>

  )
}

export default App
