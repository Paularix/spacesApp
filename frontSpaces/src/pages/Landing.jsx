import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ForumIcon from '@mui/icons-material/Forum'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import './Landing.css'
import { Link } from 'react-router-dom'


export const Landing = () => {
  const today = new Date().toISOString().substr(0, 10);
  const landingButton = {
    marginTop: '25px',
    fontSize: '18px',
    padding: '10px',
  }
  const iconStyle = { 
    marginTop: '10px' 
  }

  const handleClick = () => {
    console.info('You clicked the Chip.');
  }

  return (

    <div className='landing-page'>
      
      <div className='landing-page-container'>
        <Box
          className='landing-form'
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <h1 className='header'>Encuentra un espacio para tu siguiente evento </h1>
          <h2 className='header'>¿Dónde quieres buscar?</h2>

          <div className='landing-inputs'>

            <TextField
              id="input-location"
              label="Ciudad"
              defaultValue="¿Dónde?"
            />

            <TextField
              type="date"
              id="input-date"
              label="Desde"
              value={today}
            />

            <TextField
              type="date"
              id="input-date"
              label="Hasta"
              value={today}
            />

            <div>
              <Link to="/Home">
              <Chip style={landingButton} label="Search" onClick={handleClick} />
              </Link>
            </div>
          </div>
        </Box>

        <div className='shadow-landing-box'>
          <img className='shadow-landing-box-image' src="https://images.adsttc.com/media/images/5ea1/a85a/b357/6527/3b00/0184/newsletter/LHG_Leila_Heller_Gallery_007.jpg?1587652686" />
        </div>
      </div>

      <Box>
        <div className="introduction">
          <div className="introduction-box">
            <h1> <span className='colored'>B</span>usca</h1>
            <div className='introduction-inner-box'>
              <GpsFixedIcon style={iconStyle}></GpsFixedIcon>
              <p>Espacios cerca con diferentes servicios y posibilidades.</p>
            </div>
          </div>
          <div className="introduction-box">
            <h1><span className='colored'>C</span>ontacta</h1>
            <div className='introduction-inner-box'>
              <ForumIcon style={iconStyle}></ForumIcon>
              <p>Con los propietarios y otros organizadores para colaborar.</p>
            </div>
          </div>
          <div className="introduction-box">
          <h1><span className='colored'>O</span>rganiza</h1>

            <div className='introduction-inner-box'>
              <EventAvailableIcon style={iconStyle}></EventAvailableIcon>
              <p>Eventos u otras actividades de forma autogestionada. </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Landing