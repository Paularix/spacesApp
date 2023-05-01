import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { InputBase } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';



import './addSpace.css';
import { display } from '@mui/system';

const addSpace = () => {
  const services = [
    {
      id: 1,
      name: "Aire Acondicionado",
      value: "Aire Acondicionado",
    },
    {
      id: 2,
      name: "Sillas",
      value: "Sillas"

    },
    {
      id: 3,
      name: "Microondas",
      value: "Microondas"

    },
    {
      id: 4,
      name: "Mesas",
      value: "Mesas"

    }
  ]

  const [selectedServices, setSelectedServices] = useState([services[1]]);

  const handleChange = (event) => {
    setSelectedServices(
      ...selectedServices,
      event.target.value
    );
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={5.5}>
        </Grid>
        <Grid item xs={6.5} sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Typography variant="h1" sx={{
            fontSize: 32,
          }}>
            Añade tu espacio
          </Typography>
        </Grid>

        <Grid item xs={5.5}>
          <Typography variant="h1" sx={{
            fontSize: 18,
            textAlign: 'center',
            margin: 3
          }}>
            Selecciona una dirección aproximada:
          </Typography>
          <MapContainer center={[41.391306159158506, 2.179069519042969]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[41.391306159158506, 2.179069519042969]}>
            </Marker>
          </MapContainer>
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
                  <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap'
                  }}>
                    {
                      services.map((service, index) => (
                        <FormControlLabel key={index} control={<Checkbox />} value={service.value} label={service.name} />
                      ))
                    }
                  </Box>


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
                  <input hidden accept="image/*" multiple type="file" />
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