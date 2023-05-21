import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ForumIcon from '@mui/icons-material/Forum'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import Popover from '@mui/material/Popover';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './Landing.css'
import { Link } from 'react-router-dom'
import { InputBase } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar'
import NativeSelect from '@mui/material/NativeSelect'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import GlobalContext from '../../context/GlobalContext'
import Select from '@mui/material/Select';


const yyyymmdd = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + (date.getDate())).slice(-2)}`
};


export const Landing = () => {
  const { date, queryLocation, setQueryLocation } = useContext(GlobalContext)
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

  // FETCH a open street map para cargar la ciudad citada
  const search = () => {

    console.log(queryLocation, date)
     const query = `http://localhost:3080/api/spaces/find/?location=${queryLocation}&from=${yyyymmdd(date[0])}&to=${yyyymmdd(date[1])}`
     const options = {
       method: 'GET',
     }
     fetch(query, options)
       .then(res => res.json())
       .then(res => console.log(res))
       .catch(err => console.log(err))
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
            <FormControl sx={{ m: 1, minWidth: 120, width: 300 }} size="small">
              <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
              <Select
                
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={queryLocation}
                label="Ciudad"
                size="small"
                onChange={(e) => setQueryLocation(e.target.value)}
              >
                <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
                <MenuItem value={"Hospitalet"}>L'Hospitaled del Llobregat</MenuItem>
                <MenuItem value={"ElPrat"}>El Prat de Llobregat</MenuItem>
                <MenuItem value={"Mollet"}>Mollet del Vallès</MenuItem>
                <MenuItem value={"Terrassa"}>Terrassa</MenuItem>
              </Select>
              
            </FormControl>

            {/* <NativeSelect
              value={queryLocation}
              onChange={(e) => setQueryLocation(e.target.value)}
              size="small"
              id="input-location"
              placeholder="Ciudad"
              variant="filled"
              inputProps={{
                style: {
                  border: '1px solid',
                  borderRadius: 3,
                  padding: 7,
                  marginTop: 8,
                  paddingLeft: 12,
                  width: 120,
                  '&:hover': {
                    color: 'red'
                  }
                }
              }}
            >
              <option>
                <MenuItem>Barcelona</MenuItem>
              </option>
              <option>
                <MenuItem>Terrassa</MenuItem>
              </option>
              <option>
                <MenuItem>L'Hospitalet</MenuItem>
              </option>

            </NativeSelect> */}

            <Button variant="outlined" sx={{
              marginLeft: 3,
              marginTop: 1,
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


            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Link to="/Home" style={{ textDecoration: 'none', color: 'black' }} >
                <Chip style={landingButton} onClick={() => search()} label="Search" />
              </Link>
            </Box>
          </div>
        </Box>

        <div className='shadow-landing-box'>
          <img className='shadow-landing-box-image' src="https://images.adsttc.com/media/images/5ea1/a85a/b357/6527/3b00/0184/newsletter/LHG_Leila_Heller_Gallery_007.jpg?1587652686" />
        </div>
      </div >

      <Box sx={{
        marginTop: 8,
        marginBottom: 4
      }}>
        <div className="introduction">
          <Box sx={{
            marginLeft: 30,
            marginRight: 4,
          }} className="introduction-box">
            <h1> <span className='colored'>B</span>usca</h1>
            <div className='introduction-inner-box'>
              <GpsFixedIcon style={iconStyle}></GpsFixedIcon>
              <p>Espacios cerca con diferentes servicios y posibilidades.</p>
            </div>
          </Box>
          <Box sx={{
            marginLeft: 4,
            marginRight: 4,
          }}  className="introduction-box">
            <h1><span className='colored'>C</span>ontacta</h1>
            <div className='introduction-inner-box'>
              <ForumIcon style={iconStyle}></ForumIcon>
              <p>Con los propietarios y otros organizadores para colaborar.</p>
            </div>
          </Box>
          <Box sx={{
            marginLeft: 4,
            marginRight: 32,
          }} className="introduction-box">
            <h1><span className='colored'>O</span>rganiza</h1>

            <div className='introduction-inner-box'>
              <EventAvailableIcon style={iconStyle}></EventAvailableIcon>
              <p>Eventos u otras actividades de forma autogestionada. </p>
            </div>
          </Box>
        </div>

      </Box>

    </div >
  )
}

export default Landing