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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
          <h2>Espacio apto para músicos. Anfitrión: <strong>Valentina</strong></h2>
            <div className="description-wrapper">
            
              <div>
                <Typography variant="h5" component="h3">
                  Conoce a tu anfitrión
                </Typography>
                <div className='spaceInfo-host'>
                  <img className='spaceInfo-image' src="https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg" alt="" />
                  <h2><strong>Valentina</strong></h2>
                  <h6>Anfitrión</h6>
                  <div className='spaceInfo-host-description'>Descripción: Soy escritora, escritora y tengo un doctorado en cine y teología de King 's College London. Fui director de una escuela de cine durante 13 años y ahora tengo un negocio de consultoría en la industria del cine. Me encanta comer la comida increíble de mi marido David, sobre todo en compañía. Me encanta viajar y soy aventurero </div>
                </div>
              </div>
              <Divider />
              <div>
                <h2>Información sobre este espacio</h2>
                <div className='spaceInfo-space-description'>
                  <div>*descripcion*Sala polivalente situado en Gràcia. ​Cocina completa, televisión 65', equipo de sonido alta fidelidad, wifi, work-shops, clases privadas, presentaciones comerciales, coworking, reuniones de trabajo, estudio de grabación y fotográfico; cine, música y televisión (ideal para ver retransmisiones deportivas), reuniones de trabajo. Un espacio versátil y acogedor, es un local discreto, moderno y con encanto</div>
                </div>
              </div>
              <Divider />
              <div>
                <h2>Características</h2>
                <div>
                  <h2>Comodidades</h2>
                  <div>* Aire Acondicionado</div>
                  <div>* Sillas</div>
                  <div>* Wi-Fi</div>
                </div>
                <div>
                  <h2>Zonas</h2>
                  <div>* Aire Acondicionado</div>
                  <div>* Sillas</div>
                  <div>* Wi-Fi</div>
                </div>
              </div>
              <Divider />
              <div>
                <h2>Aforo</h2>
                <div>
                  <div>Aforo del espacio:</div>
                </div>
              </div>
              <Divider />
              <div>
                <h2>Qué debes saber</h2>
                <div>
                  <div>
                    <h4>Normas del espacio</h4>
                    <div>*reglas*Respecto el aforo dependiendo del evento puede variar. Sentados en mesa de trabajo es de 12 a 15 personas. Para otro tipo de reuniones puede ser sobre 20 personas.</div>
                  </div>
                  <div>
                    <h4>Política de cancelación</h4>
                    <div>Cancelación gratuita antes del 24 may..
                      Consulta la política de cancelación completa del anfitrión, que se aplicará incluso si cancelas por haber contraído la COVID-19 o por cualquier problema relacionado con el coronavirus
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Card className='spaceInfo-card' sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <strong>25€</strong>/dia
                </Typography>
                <input type="text" value={date} onClick={handleClick} />
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
                <Button variant="contained" size="medium">
                    Reservar
                </Button>
                <div>
                </div>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography> */}
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
            <div>
              <div className="price-wrapper">

                <div className="datepickers-wrapper">
                  <div className="form-group">
                    {/* <DateRangePicker
                    startDate={dateRange.startDate}
                    startDateId="start-date"
                    endDate={dateRange.endDate}
                    endDateId="end-date"
                    onDatesChange={({ startDate, endDate }) => setDateRange({ startDate, endDate })}
                    focusedInput={dateRange.focusedInput}
                    onFocusChange={(focusedInput) => setDateRange({ ...dateRange, focusedInput })}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                  /> */}
                    {/* <Calendar /> */}

                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SpaceInfo;
