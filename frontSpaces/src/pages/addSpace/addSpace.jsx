import React, { useEffect, useState, useContext } from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import { API_URL } from '../../apiconfig';
import PublicPrivateSwitch from '../../components/PublicPrivateSwitch/PublicPrivateSwitch';
import './addSpace.css';
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormHelperText from '@mui/material/FormHelperText';
//import Calendar from '../../components/Calendar/Calendar'
import '../../components/Calendar/Calendar.css';

import Calendar from 'react-calendar'
import {useMediaQuery} from '@mui/material';
import { styled } from '@mui/system';



const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const yyyymmdd = (date) => `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + (date.getDate())).slice(-2)}`;

//dayX és 0 per diumenge, 1 dilluns i anar fent
function getDaysXOfYear(dayX, year) {
  const firstDayOfYear = new Date(year + '-1-1')
  const dayInMillis = 86400000; // number of milliseconds in a day
  let dayToCheck = new Date(firstDayOfYear.getTime())
  const dates = [];
  let t = 0;

  while (dayToCheck.getFullYear() === year) {
    if (dayToCheck.getDay() === dayX) {
      dates.push(yyyymmdd(dayToCheck))
    }
    t++;
    dayToCheck = new Date(firstDayOfYear.getTime() + t * dayInMillis);
  }

  const ThirteenWeeksFromToday = dates.filter(date => {
    const today = new Date().getTime()
    const day = new Date(date).getTime()
    while (day > today) {
      return date
    }
  })

  return ThirteenWeeksFromToday.slice(0, 13);
}


function fourMonthsFromNow(year) {
  let month = new Date().getMonth() + 1;
  const months = [
    [`${year}-0${month++}`, `${year}-0${month++}`],
    [`${year}-0${month++}`, `${year}-0${month++}`]
  ]

  return months
}

const addSpace = () => {
  const goTo = useNavigate();
  const [year, setYear] = useState((new Date()).getFullYear());
  const [selectedDates, setSelectedDates] = useState([]);
  const [services, setServices] = useState([])
  const [center, setCenter] = useState([]);
  const [image, setImage] = useState()
  const [send, setSend] = useState(false)
  const [lockedDays, setLockedDays] = useState([])
  const [newSpace, setNewSpace] = useState({
    name: "",
    description: "",
    capacity: "",
    price: "",
    address: "",
    rules: "",
    status: "private",
    services: [],
    approximateCoords: [],
    errors: {
      name: [],
      description: [],
      capacity: [],
      price: [],
      address: [],
      rules: [],
      services: [],
      approximateCoords: [],
    }
  })
  const validate = (field, value) => {

    let errors = [...newSpace.errors[field]];

    switch (field) {
      case "name":
        if (!value) {
          if (!errors.includes("Por favor, intruduce un nombre para tu espacio.")) {
            errors.push("Por favor, intruduce un nombre para tu espacio.")
          }
        }
        break
      case "description":
        if (!value) {
          if (!errors.includes("Por favor, intruduce una descripción para tu espacio.")) {
            errors.push("Por favor, intruduce una descripción para tu espacio.")
          }
        }
        break
      case "capacity":
        if (value == 0) {
          if (!errors.includes("El aforo no puede ser cero.")) {
            errors.push("El aforo no puede ser cero.");
          }
        }
        break
      case "price":
        if (value == 0) {
          if (!errors.includes("El precio no puede ser 0.")) {
            errors.push("El precio no puede ser 0.");

          }
        }
        break
      case "address":
        if (!value) {
          if (!errors.includes("Por favor, intruduce una dirección para tu espacio.")) {
            errors.push("Por favor, intruduce una dirección para tu espacio.")
          }
        }
        break
      case "services":
        if (value.length == 0) {
          if (!errors.includes("¿De verdad no tienes ninguno de los servicios de la lista?")) {
            errors.push("¿De verdad no tienes ninguno de los servicios de la lista?");
          }
        }
        break
      case "approximateCoords":
        if (value.length == 0) {
          if (!errors.includes("Indicanos en el mapa una ubicación aproximada para poder mostrarla al ofertar el espacio.")) {
            errors.push("Indicanos en el mapa una ubicación aproximada para poder mostrarla al ofertar el espacio.");
          }

        }
        break
      case "rules":
        if (!value) {
          if (!errors.includes("¿De verdad no hay ninguna regla?")) {
            errors.push("¿De verdad no hay ninguna regla?");
          }
        }
        break

      default:
        break
    }

    setNewSpace((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: errors,
      },
    }))
  }




  const { user, setUser, error, setError, date, setDate } = useContext(GlobalContext)


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(coords);
    }
  }
  function coords(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setCenter([lat, long]);
  }

  function removeDuplicates(arr) {
    return Array.from(new Set(arr));
  }

  function handleClickDay(date) {
    const dateStr = yyyymmdd(date)
    let addDates = false

    if (selectedDates.indexOf(dateStr) === -1) {
      addDates = true;
    }
    if (addDates) {
      console.log("add date")
      setSelectedDates(removeDuplicates([...selectedDates, dateStr]))
    } else {
      console.log("remove date")
      let dates = [...selectedDates]
      dates = dates.filter(day => day != dateStr)
      console.log(dates)
      setSelectedDates(dates)
    }
  }

  function tileClassName({ date, view }) {
    if (view === 'month') {
      const dateStr = yyyymmdd(date)
      if (selectedDates.includes(dateStr)) {
        //console.log(dateStr)
        return "highlighted-date";
      }
    }
    return null
  }

  useEffect(() => {
    if (user.token) {
      const options = {
        headers: {
          'authorization': user.token
        }
      }
      fetch(API_URL + "services/auth", options)
        .then(res => res.json())
        .then(res => {
          if (res.ok == true) {
            setServices([...services, ...res.data])
          } else {
            setError(res.error.name)
            goTo("/error")
          }
        })
        .catch(err => {
          setError(err.message)
          goTo("/error")
        })


      getLocation();
    } else {
      setError("Not authentified.")
      goTo("/error")
    }
  }, [])

  useEffect(() => {
    if (send == true) {
      if (newSpace.errors.name.length == 0
        && newSpace.errors.description.length == 0
        && newSpace.errors.rules.length == 0
        && newSpace.errors.price.length == 0
        && newSpace.errors.capacity.length == 0
        && newSpace.errors.services.length == 0
        && newSpace.errors.approximateCoords.length == 0
        && newSpace.errors.address.length == 0) {
        const data = new FormData()
        data.append('file', image)
        data.append('newSpace', JSON.stringify(newSpace))
        data.append('selectedDates', JSON.stringify(selectedDates))

        const options = {
          method: 'POST',
          body: data,
          headers: {
            'authorization': user.token,
          }
        }
        fetch(API_URL + "spaces/auth", options)
          .then(res => res.json())
          .then((res) => {
            if (res.ok == true) {
              goTo("/mySpaces")
            } else {
              setError(res.error)
              goTo("/error")
            }
          })
          .catch((err) => {
            setError(err.error)
            goTo("/error")
          })
      }
      setSend(false)
    }
  }, [newSpace.errors])

  const handleServiceCheck = (e) => {

    if (newSpace.services.includes(e.target.value)) {
      setNewSpace({
        ...newSpace,
        services: [
          ...newSpace.services.filter(service => service != e.target.value)
        ]
      })
      setNewSpace((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          services: [],
        }
      }))
    } else {
      setNewSpace({
        ...newSpace,
        services: [
          ...newSpace.services,
          e.target.value
        ]
      })
      setNewSpace((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          services: [],
        }
      }))
    }
  }


  function HandleMapEvents() {
    const map = useMapEvents({
      click: (e) => {

        const { lat, lng } = e.latlng;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
          .then(response => response.json())
          .then(data => {
            setCenter([lat, lng])
            setNewSpace({
              ...newSpace,
              approximateCoords: [parseFloat(data.lat), parseFloat(data.lon)],
              errors: {
                ...newSpace.errors,
                approximateCoords: [],
              }
            })
          });


      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }



  const handleChange = (e) => {
    setNewSpace((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setNewSpace((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [e.target.name]: [],
      }
    }))
  };


  const savePhoto = (e) => {
    setImage(e.target.files[0])
  }


  const validateAndSend = () => {

    setNewSpace((prevState) => ({
      ...prevState,
      errors: {

        [prevState.errors.name]: [],
        description: [],
        capacity: [],
        price: [],
        address: [],
        rules: [],
        services: [],
        approximateCoords: [],
      }
    }))

    validate("name", newSpace.name)
    validate("description", newSpace.description)
    validate("rules", newSpace.rules)
    validate("price", newSpace.price)
    validate("capacity", newSpace.capacity)
    validate("address", newSpace.address)
    validate("services", newSpace.services)
    validate("approximateCoords", newSpace.approximateCoords)
    setSend(true)

  }

  const blockDayOfTheWeek = (d) => {
    if (lockedDays.includes(d)) {
      console.log("desmarcar dia semana")
      let day = ['LU', 'MT', 'MC', 'JV', 'VR', 'SD', 'DG'].indexOf(d) + 1;
      if (day === 7) {
        day = 0;
      }
      const days = getDaysXOfYear(day, year);
      let dates = [...selectedDates]
      dates = dates.filter(date => !days.includes(date))
      setSelectedDates(dates)
      setLockedDays([...lockedDays.filter(day => day != d)])
    } else {
      console.log("marcar dia semana")

      let day = ['LU', 'MT', 'MC', 'JV', 'VR', 'SD', 'DG'].indexOf(d) + 1;
      if (day === 7) {
        day = 0;
      }
      const days = getDaysXOfYear(day, year);
      let dates = [...selectedDates]
      dates = [...dates, ...days]
      setSelectedDates(dates)
      setLockedDays([...lockedDays, d])
    }

  }





  return (
    <div className='add-space-container'>

      <Grid container spacing={1} justifyContent="center" alignItems="center">

        <Grid item xs={12} sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Typography variant="h1" sx={{
            fontSize:40,
          }}>
            Añade tu espacio
          </Typography>
        </Grid>

        <Grid item xs={12} md={8} lg={5} mt={4} sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>


          <Card>

            <CardContent>
              <Grid item sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <TextField
                  error={newSpace.errors.name.length == 0 ? false : true}
                  helperText={newSpace.errors.name.length == 0 ? ' ' : newSpace.errors.name}
                  name="name"
                  className="space-field space-name"
                  label="Dinos el nombre del espacio"
                  value={newSpace.name}
                  onChange={(e) => handleChange(e)}
                  size="small"
                />
                <TextField
                  error={newSpace.errors.description.length == 0 ? false : true}
                  helperText={newSpace.errors.description.length == 0 ? ' ' : newSpace.errors.description}
                  className="space-field space-description"
                  id="outlined-multiline-static"
                  label="Descripción: Dinos algo... ¿qué se suele organizar en él?"
                  value={newSpace.description}
                  onChange={(e) => handleChange(e)}
                  name="description"
                  multiline
                  rows={4}
                />

                <TextField
                  error={newSpace.errors.rules.length == 0 ? false : true}
                  helperText={newSpace.errors.rules.length == 0 ? ' ' : newSpace.errors.rules}
                  className="space-field space-description"
                  id="outlined-multiline-static"
                  label="¡Reglas! ¿Fumar? ¿Ruido? ¿Horario? ¿Limpieza?"
                  value={newSpace.rules}
                  onChange={(e) => handleChange(e)}
                  name="rules"
                  multiline
                  rows={4}
                />

                <TextField
                  error={newSpace.errors.capacity.length == 0 ? false : true}
                  helperText={newSpace.errors.capacity.length == 0 ? ' ' : newSpace.errors.capacity}
                  className="space-field space-name"
                  label="Aforo"
                  type="number"
                  value={newSpace.capacity}
                  onChange={(e) => handleChange(e)}
                  name="capacity"
                  size="small"
                />

                <TextField
                  error={newSpace.errors.price.length == 0 ? false : true}
                  helperText={newSpace.errors.price.length == 0 ? ' ' : newSpace.errors.price}
                  className="space-field space-name"
                  label="Precio por dia"
                  value={newSpace.price}
                  onChange={(e) => handleChange(e)}
                  name="price"
                  type="number"
                  size="small"

                />

                <TextField
                  error={newSpace.errors.address.length == 0 ? false : true}
                  helperText="No compartiremos la dirección exacta hasta que no se haya aprobado una reserva."
                  className="space-field space-address"
                  label="Dirección"
                  value={newSpace.address}
                  onChange={(e) => handleChange(e)}
                  name="address"
                  size="small"
                  padding="none"
                  sx={{
                    padding: 0,
                  }}
                />

                {newSpace.errors.address
                  ? (newSpace.errors.address.map((error, index) => (
                    <FormHelperText sx={{
                      marginLeft: 3.55,
                      color: '#ba000d'
                    }}
                      key={index}>
                      {error}
                    </FormHelperText>
                  )))
                  : (' ')
                }




                <Button variant="outlined" component="label" sx={{
                  color: '#7879F1',
                  borderColor: '#7879F1',
                  marginLeft: 1.78,
                  marginTop: 1,
                  marginRight: 1.78,
                  boxShadow: 'none',
                  justifyItems: 'center',
                  '&:hover': {
                    color: '#7879F1',
                    borderColor: '#7879F1',
                    boxShadow: 'none',
                  },
                }}>
                  Imagen del espacio
                  <input hidden accept="image/*" multiple type="file" onChange={(e) => savePhoto(e)} />
                </Button>
                
                {image
                  ? (
                    <Grid item xs={12} sx={{
                      height: 16,
                      width: 500
                    }}>

                      <AttachFileIcon sx={{
                        fontSize: 16,
                        marginTop: 2,
                        marginRight: 0.8,
                      }}>
                      </AttachFileIcon>
                      <Typography variant="p" sx={{
                        fontSize: 16,
                        textAlign: 'justify',
                        marginBottom: 1
                      }}>
                        {image.name}
                      </Typography>
                    </Grid>
                  )
                  : (' ')
                }

                <FormControl sx={{ m: 1.78, marginTop: 3.4, minWidth: 120 }}>
                  <Typography variant="h6" sx={{
                    textAlign: 'left'
                  }}>Servicios:</Typography>
                  <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}>
                    {
                      services.map((service, index) => (
                        <FormControlLabel
                          key={index}
                          control={<Checkbox
                            onChange={(e) => handleServiceCheck(e)}
                          />}
                          value={service.id}
                          label={service.name} />
                      ))
                    }
                  </Box>

                  {newSpace.errors.services
                    ? (newSpace.errors.services.map((error, index) => (
                      <FormHelperText sx={{
                        marginLeft: 1.78,
                        color: '#ba000d'
                      }}
                        key={index}>
                        {error}
                      </FormHelperText>
                    )))
                    : (' ')
                  }


                  <PublicPrivateSwitch
                    newSpace={newSpace}
                    setNewSpace={setNewSpace}
                  />

                </FormControl>

              </Grid>
            </CardContent>
            
          </Card>
        </Grid>

        <Grid item xs={12} lg={7} justifyContent="center" mt={4} >

          {
            center.length > 0
              ? (
                <>
                  <Typography variant="h1" mt={4} sx={{
                    fontSize: 18,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                    Selecciona la localización aproximada:
                  </Typography>

                  <MapContainer center={center} zoom={13} style={{ 'margin': '0 auto' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <HandleMapEvents />
                    {
                      newSpace.approximateCoords.length > 0
                        ? (
                          <Marker position={newSpace.approximateCoords}>
                          </Marker>
                        )
                        : (' ')
                    }
                  </MapContainer>


                  {newSpace.errors.approximateCoords
                    ? (newSpace.errors.approximateCoords.map((error, index) => (
                      <FormHelperText sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: 4,
                        marginTop: 3,
                        color: '#ba000d'
                      }}
                        key={index}>
                        {error}
                      </FormHelperText>
                    )))
                    : (' ')
                  }
                </>
              )
              : (
                <Box className="loading-box" style={{margin: '0 auto'}}>

                  <CircularProgress />
                </Box>
              )
          }
          <Typography variant="h1" sx={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 5,
            marginLeft: 4,
            marginRight:4,
            marginBottom: 3
          }}>
            Configura la disponibilidad de los próximos 90 días bloqueando los días que no quieras habilitar reservas:
          </Typography>
          <Box style={{

            'display': 'flex',
            'justify-content': 'center'

          }}>

            {['LU', 'MT', 'MC', 'JV', 'VR', 'SD', 'DG'].map((el, idx) => <Button variant="outlined" sx={{
              background: lockedDays.includes(el) ? '#7879F1' : '#FFFFFF',
              color: lockedDays.includes(el) ? '#FFFFFF' : '#7879F1',
              borderColor: '#7879F1',
              fontSize: 10,
              padding: 0.33,
              margin: 1,
              '&:hover': {
                color: '#7879F1',
                borderColor: '#7879F1',
                boxShadow: 'none',
              },
            }} onClick={() => blockDayOfTheWeek(el)} key={idx}>{el}</Button>)}

          </Box>


          {
            fourMonthsFromNow(year).map((q, idx) => (
              <ResponsiveBox
                
                className="calendar-space-container"
                sx={{
                  margin: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                key={idx}
              >
                {q.map((month, idx) => (
                  <Grid item sx={{
                    display: 'flex',
                    margin: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                    key={idx}

                  >
                    <Calendar
                      onChange={setDate}
                      minDetail="month"
                      value={date}
                      onClickDay={handleClickDay}
                      tileClassName={tileClassName}
                      activeStartDate={new Date(month + '-01')}
                      showNeighboringMonth={false}
                      nextLabel=''
                      prevLabel=''
                      prev2Label=''
                      next2Label=''
                    />
                  </Grid>

                ))
                }
              </ResponsiveBox>
            ))
          }
        </Grid>

        <Grid item xs={8} lg={4} justifyContent="center" >
          <Button variant="contained" component="label" sx={{
            background: '#7879F1',
            display:'flex',
            margin: 4,
            boxShadow: 'none',
            justifyContent: 'center',
            '&:hover': {
              background: '#7879F1',
              boxShadow: 'none',
            },
          }}
            onClick={() => validateAndSend()}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div >
  )
}






export default addSpace