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
  const [aproximateLocation, setAproximateLocation] = useState([])
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
      fetch(API_URL + "services")
        .then(res => res.json())
        .then(res => {
          setServices([...services, ...res.data])
        })
        .catch(err => {
          console.log(err)
        })

      getLocation();
    } else {
      setError("Not authentified.")
      goTo("/error")
    }
  }, [])

  function HandleMapEvents() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log(lat, lng)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
          .then(response => response.json())
          .then(data => {
            setCenter([lat, lng])
            setAproximateLocation([parseFloat(data.lat), parseFloat(data.lon)])
          });
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }


  return (
    <div className='add-space-container'>
      <Grid container spacing={1}>
        <Grid item xs={5.5}>
        </Grid>
        <Grid item xs={6.5} sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop:3
        }}>
          <Typography variant="h1" sx={{
            fontSize: 32,
          }}>
            Añade tu espacio
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
                      aproximateLocation.length > 0
                        ? (
                          <Marker position={aproximateLocation}>
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
        <Grid xs={6.5} sx={{
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
                  size="small"
                  required
                />
                <TextField
                  className="space-field space-description"
                  id="outlined-multiline-static"
                  label="Descripción"
                  multiline
                  required
                  rows={4}
                />
                <TextField
                  className="space-field space-name"
                  label="Capacidad"
                  size="small"
                  required
                />
                <TextField
                  className="space-field space-name"
                  label="Precio/dia"
                  type="number"
                  size="small"
                  required
                />
                <TextField
                  className="space-field space-name"
                  label="Dirección"
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
                  <input hidden accept="image/*" multiple type="file" />
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
                        <FormControlLabel key={index} control={<Checkbox />} value={service.value} label={service.name} />
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
                }}>
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