import React, { useEffect, useState, useContext } from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import { API_URL } from '../apiconfig';
import PublicPrivateSwitch from '../components/PublicPrivateSwitch';
import './addSpace.css';
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';


const addSpace = () => {
  const goTo = useNavigate();


  const [services, setServices] = useState([])
  const [center, setCenter] = useState([]);
  const [image, setImage] = useState()
  const [newSpace, setNewSpace] = useState({
    name: "",
    description: "",
    capacity: "",
    price: "",
    adress: "",
    services: [],
    approximateCoords: []
  })
  const { user, setUser, error, setError } = useContext(GlobalContext)


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


  useEffect(() => {
    if (user.token) {
      const options = {
        headers: {
          authorization: user.token
        }
      }
      fetch(API_URL + "services/auth", options)
        .then(res => res.json())
        .then(res => {
          if (res.ok == true) {
            console.log(res)
            setServices([...services, ...res.data])
            console.log(services)
          } else {
            setError(res.error)
            goTo("/error")
          }
        })
        .catch(err => {
          console.log(err)
          //setError(err)
          goTo("/error")
        })


      getLocation();
    } else {
      setError("Not authentified.")
      goTo("/error")
    }
  }, [])


  const handleServiceCheck = (e) => {
    if (newSpace.services.includes(e.target.value)) {
      setNewSpace({
        ...newSpace,
        services: [
          ...newSpace.services.filter(service => service != e.target.value)
        ]
      })
    } else {
      setNewSpace({
        ...newSpace,
        services: [
          ...newSpace.services,
          e.target.value
        ]
      })
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
              approximateCoords: [parseFloat(data.lat), parseFloat(data.lon)]
            })
          });
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }


  const savePhoto = (e) => {
    setImage(e.target.files[0])
  }




  const postSpace = () => {
    const data = new FormData()
    data.append('file', image)
    //data.append('newSpace', newSpace)


     const options = {
       method: 'POST',
       headers: {
        'content-type': 'application/json',
        'authorization': user.token,
       },
       body: data
     }



    //console.log(options.body)
    fetch(API_URL + "spaces/auth", options)


  }


  return (
    <div className='add-space-container'>

      <Grid container spacing={1}>
        <Grid item xs={5.5}>
        </Grid>
        <Grid item xs={6.5} sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 3
        }}>
          <Typography variant="h1" sx={{
            fontSize: 32,
          }}>
            Añade un espacio
          </Typography>
        </Grid>


        <Grid item xs={5.5}>


          {
            center.length > 0
              ? (
                <>
                  <Typography variant="h1" sx={{
                    fontSize: 18,
                    textAlign: 'center',
                    margin: 9
                  }}>
                    Selecciona una dirección aproximada:
                  </Typography>
                  <MapContainer center={center} zoom={13}>
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
                </>
              )
              : (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: 52
                }}>
                  <CircularProgress />
                </Box>
              )
          }


        </Grid>
        <Grid item xs={6.5} sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Card sx={{
            marginLeft: 4,
            marginRight: 4,
            marginTop: 2,
          }}>
            <CardContent>


              <Grid item sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <TextField
                  className="space-field space-name"
                  label="Nombre"
                  value={newSpace.name}
                  onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                  size="small"
                  required
                />
                <TextField
                  className="space-field space-description"
                  id="outlined-multiline-static"
                  label="Descripción"
                  value={newSpace.description}
                  onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                  multiline
                  required
                  rows={4}
                />
                <TextField
                  className="space-field space-name"
                  label="Capacidad"
                  value={newSpace.capacity}
                  onChange={(e) => setNewSpace({ ...newSpace, capacity: e.target.value })}
                  size="small"
                  required
                />
                <TextField
                  className="space-field space-name"
                  label="Precio/dia"
                  value={newSpace.price}
                  onChange={(e) => setNewSpace({ ...newSpace, price: e.target.value })}
                  type="number"
                  size="small"
                  required
                />
                <TextField
                  className="space-field space-name"
                  label="Dirección"
                  value={newSpace.adress}
                  onChange={(e) => setNewSpace({ ...newSpace, adress: e.target.value })}
                  helperText="No compartiremos la dirección exacta hasta que no se haya aprobado una reserva."
                  size="small"
                  required
                />


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
                  <input hidden accept="image/*" multiple type="file" onChange={(e) => savePhoto(e)}
                  />
                </Button>


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
                          value={service.name}
                          label={service.name} />
                      ))
                    }
                  </Box>


                  <PublicPrivateSwitch />


                </FormControl>


                <Button variant="contained" component="label" sx={{
                  background: '#7879F1',
                  marginLeft: 1.78,
                  marginTop: 1,
                  marginRight: 1.78,
                  boxShadow: 'none',
                  justifyItems: 'center',
                  '&:hover': {
                    background: '#7879F1',
                    boxShadow: 'none',
                  },
                }}
                  onClick={() => postSpace()}
                >
                  Guardar
                </Button>
              </Grid>




            </CardContent>
            <CardActions>


            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div >
  )
}






export default addSpace