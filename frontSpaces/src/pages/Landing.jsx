import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ForumIcon from '@mui/icons-material/Forum'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './Landing.css'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { InputBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Calendar from '../components/Calendar'


export const Landing = () => {
  const landingButton = {
    marginTop: '25px',
    fontSize: '18px',
    padding: '10px',
    cursor: 'pointer'
  }
  const iconStyle = {
    marginTop: '10px',
  }

  const [showCalendar, setShowCalendar] = useState(null);

  const handleClick = (event) => {
    setShowCalendar(event.currentTarget);
  };
  const handleClose = () => {
    setShowCalendar(null);
  };

  const open = Boolean(showCalendar);
  const id = open ? 'simple-popover' : undefined;

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

            <InputBase
              size="small"
              id="input-location"
              label="Ciudad"
              defaultValue="¿Dónde?"
              inputProps={{
                style: {
                  border: '1px solid',
                  borderRadius: 3,
                  padding: 7,
                  marginTop: 8,
                  paddingLeft: 12
                }
              }}
            />



            <Button variant="outlined" sx={{
              marginLeft: 3,
              marginBottom: 0.5,
              borderColor: '#000000',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#000000',
              },
            }}
              onClick={handleClick}
            >
              <CalendarTodayIcon sx={{
                fontSize: 26,
                color: '#000000'
              }}
                aria-describedby={id}
                variant="contained"
              />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={showCalendar}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Calendar />
            </Popover>


            <div>
              <Link to="/Home" style={{ textDecoration: 'none', color: 'black' }}>
                <Chip style={landingButton} label="Search" />
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