import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SpaceInfo.css';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Calendar from '../../components/Calendar/Calendar'
import Popover from '@mui/material/Popover';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import ChairIcon from '@mui/icons-material/Chair';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';

const SpaceInfo = () => {

  // const [dateRange, setDateRange] = useState({
  //   startDate: moment(),
  //   endDate: moment(),
  //   focusedInput: null,
  // });

  const [date, setDate] = useState(new Date())
  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: window.screen.availWidth > 1300 ? 3 : 2,
    slidesToScroll: 1
  };


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
    <div className="spaceInfo-container">
      <div className="row">
        <div className="col-md-6 col-lg-5">
          <div className='spaceInfo-title'>
            <Typography variant="h5" component="h4">
              Encantador Loft para Reuniones
            </Typography>
            <h6 className="text-center mb-4"> <a href="https://www.google.com/maps/place/Barcelona/" target="_blank">Barcelona, España</a></h6>
          </div>
          <div className="carousel-wrapper">
            <Slider className="carousel-slider" {...settings}>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg?im_w=960" alt="Foto 1" />
              </div>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e077fa-8985-483e-9946-8c088fbd8e78.jpeg?im_w=720" alt="Foto 2" />
              </div>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e077fa-8985-483e-9946-8c088fbd8e78.jpeg?im_w=720" alt="Foto 3" />
              </div>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/45b4ce4b-6bc9-4f19-af4b-811e6d2d8ef1.jpeg?im_w=720" alt="Foto 4" />
              </div>
            </Slider>
          </div>
        </div>
        <Grid className="spaceInfo-grid-container" container spacing={2}>
          <Grid item xs={7}>
            <div className='spaceInfo-grid-part1'>
              <div className='spaceInfo-title2'>
                <Typography variant="h6" component="h4">Espacio apto para músicos. Anfitrión: Valentina</Typography>
                <h6 className='spaceInfo-title-personIcon'><PersonIcon className='spaceInfo-personIcon' /> 18 Personas</h6>
              </div>
              <div className="description-wrapper">
                <div>
                  <Typography variant="h5" component="h3">
                    Conoce a tu anfitrión
                  </Typography>
                  <div className='spaceInfo-host'>
                    <div className='spaceInfo-host-card'>
                      <Card className='spaceInfo-host-picture' sx={{ maxWidth: 300 }}>
                        <img className='spaceInfo-image' src="https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg" alt="" />
                        <h2><strong>Valentina</strong></h2>
                        <h6>Anfitrión</h6>
                      </Card>
                    </div>

                    <div className='spaceInfo-host-description'><DescriptionIcon /> <strong>Descripción: </strong>
                      Soy escritora, escritora y tengo un doctorado en cine y teología de King 's College London. Fui director de una escuela de cine durante 13 años y ahora tengo un negocio de consultoría en la industria del cine. Me encanta comer la comida increíble de mi marido David, sobre todo en compañía. Me encanta viajar y soy aventurero </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <Typography mt={2} variant="h6" component="h2">Información sobre este espacio</Typography>
                  <div className='spaceInfo-space-description'>
                    <div>*descripcion*Sala polivalente situado en Gràcia. ​Cocina completa, televisión 65', equipo de sonido alta fidelidad, wifi, work-shops, clases privadas, presentaciones comerciales, coworking, reuniones de trabajo, estudio de grabación y fotográfico; cine, música y televisión (ideal para ver retransmisiones deportivas), reuniones de trabajo. Un espacio versátil y acogedor, es un local discreto, moderno y con encanto</div>
                  </div>
                </div>
                <Divider />
                <div>
                  <Typography mt={2} variant="h6" component="h2">Características</Typography>
                  <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2"><OutdoorGrillIcon fontSize="small"/> Comodidades</Typography>
                    <ul className='spaceInfo-features-list'>
                      <li> Microondas</li>
                      <li> Sillas</li>
                      <li> Wi-Fi</li>
                    </ul>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2"><ChairIcon fontSize="small"/> Zonas</Typography>
                    <ul className='spaceInfo-features-list'>
                      <li> Cocina</li>
                      <li> Comedor</li>
                      <li> Parque</li>  
                    </ul>
                  </Grid>

                  </Grid>
               
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Card className='spaceInfo-card' sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <strong>25 €</strong> día
                </Typography>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">¿Qué día?</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={'text'}
                    endAdornment={
                      <InputAdornment position="end">
                        <CalendarTodayRoundedIcon onClick={handleClick} />
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
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
                  <Calendar date={date} setDate={setDate} />
                </Popover>
                <div className='spaceInfo-card-pay'>
                  <Button variant="contained" size="medium">
                    Reservar
                  </Button>
                  <Typography variant="body2" color="opacity">
                    No se te cobrara nada aún.
                  </Typography>
                  <span>
                    <Typography variant="body2" color="opacity">
                      80 € x 5 dias 400 €
                    </Typography>
                    <Typography variant="body2" color="opacity">
                      Comisión de servicio de FlexSpace 59 €
                    </Typography>
                    <Divider />
                    <Typography variant="body2" color="opacity">
                      <strong>Total 400 €</strong>
                    </Typography>
                  </span>
                </div>




              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
        </Grid>
        <div>
          <Divider />
          <Typography variant="h6" component="h2">Qué debes saber</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h4>Normas del espacio</h4>
              <div>*reglas*Respecto el aforo dependiendo del evento puede variar. Sentados en mesa de trabajo es de 12 a 15 personas. Para otro tipo de reuniones puede ser sobre 20 personas.</div>
            </Grid>
            <Grid item xs={6}>
              <h4>Política de cancelación</h4>
              <div>Cancelación gratuita antes del 24 may..
                Consulta la política de cancelación completa del anfitrión, que se aplicará incluso si cancelas por haber contraído la COVID-19 o por cualquier problema relacionado con el coronavirus
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SpaceInfo;
