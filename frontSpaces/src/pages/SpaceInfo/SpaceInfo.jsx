import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GlobalContext from '../../context/GlobalContext'
import { parseSmallDate, parseISODate } from '../../utils/parseDate';
import { useParams, useSearchParams } from 'react-router-dom';
import { API_URL } from "../../apiconfig";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


const SpaceInfo = () => {

  const goTo = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: window.screen.availWidth > 1300 ? 3 : 2,
    slidesToScroll: 1
  };

  const { date, setDate, user, error, setError } = useContext(GlobalContext);
  const [showCalendar, setShowCalendar] = useState(null);
  const [space, setSpace] = useState(null)
  const [message, setMessage] = useState('')
  const [searchParams] = useSearchParams();
  const { spaceId } = useParams();
  const [services, setServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickReservate = () => {
    if (user.token) {
      if (isValidRange())
        setOpenModal(true);
      else
        handleOpenAlert()
    } else
      goTo('/login')
  };

  const handleCloseReservate = () => {

    setOpenModal(false);

  };

  useEffect(() => {
    if (spaceId)
      loadData()
  }, [spaceId])

  const cantDays = useMemo(() => {
    const diffTime = Math.abs(date[1] - date[0]);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days !== 0 ? days : 1
  }, [date])

  function loadData() {
    const route = `spaces/${spaceId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      }
    };
    fetch(API_URL + route, options)
      .then(result => result.json())
      .then(response => {
        if (response.ok === true) {
          setSpace(response.data);
        } else {
          setError(response.error)
        }
      })
      .catch(error => setError(error))
  }

  function submit(e) {
    e.preventDefault();
    handleCloseReservate()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      },
      body: JSON.stringify({
        date_from: date[0],
        date_to: date[1],
        status: 0,
        payment_method: "cash",
        rid_space: spaceId,
        message: message,
      })
    };

    fetch(API_URL + "bookings", options)
      .then(res => res.json())
      .then(res => console.log(res))
      .then(res => {
        goTo('/confirmation')
      })
      .catch(error => {
        console.log(error)
      })

  }

  const datesToDisable = ({ date }) => {
    const dates = space?.Dates
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    const in90Days = today.setDate(today.getDate() + 90)
    if (date.getTime() < yesterday)
      return true
    if (date.getTime() > in90Days)
      return true
    if (dates && dates.length) {
      const simpleDates = dates.map(d => d.date)
      return simpleDates.indexOf(parseISODate(date)) !== -1
    }
    return false
  }

  const isValidRange = () => {
    const dates = space?.Dates
    console.log(dates);
    if (dates && dates.length) {
      const simpleDates = dates.map(d => d.date)
      const unavailableDates = simpleDates.filter(d =>
        d >= parseISODate(date[0]) && d <= parseISODate(date[1])
      )
      return !unavailableDates.length
    }
    return true
  }

  useEffect(() => {
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    if (from && to) {
      setDate([
        new Date(from),
        new Date(to)
      ])
    } else if (!date[0] && !date[1]) {
      setDate([
        new Date(),
        new Date()
      ])
    }
  }, [searchParams])

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
              <strong>{space?.name}</strong>
            </Typography>
            <h6 className="text-center mb-4"> <a href="https://www.google.com/maps/place/Barcelona/" target="_blank"><FmdGoodIcon fontSize='small' />Barcelona, España</a></h6>
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
                <Typography className='spaceInfo-title-typography' variant="h5" component="h4">Anfitrión: {space?.User?.first_name}</Typography>
                <h6 className='spaceInfo-title-personIcon'><PersonIcon className='spaceInfo-personIcon' /> 18 Personas</h6>
              </div>
              <div className="description-wrapper">
                <div>
                  <Typography variant="h5" component="h5">
                    Conoce a tu anfitrión
                  </Typography>
                  <div className='spaceInfo-host'>
                    <div className='spaceInfo-host-card'>
                      <Card className='spaceInfo-host-picture' sx={{ maxWidth: 300 }}>
                        <img className='spaceInfo-image' src="https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg" alt="" />
                        <h2><strong>{space?.User?.first_name}</strong></h2>
                        <h6>Anfitrión</h6>
                      </Card>
                    </div>
                    <div className='spaceInfo-host-description'><DescriptionIcon /> <strong>Descripción: </strong>
                      {space?.User?.bio}
                    </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <Typography mt={2} variant="h6" component="h2"><strong>Información sobre este espacio</strong></Typography>
                  <div className='spaceInfo-space-description'>
                    <div>
                      {space?.description}
                    </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <Typography mt={2} variant="h6" component="h2"><strong>Características</strong></Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" component="h2"><OutdoorGrillIcon fontSize="small" /> Comodidades</Typography>
                      {space?.Services?.map((service, index) => (
                        <ul className='spaceInfo-features-list'>
                          <li key={index}>{service.name}</li>
                        </ul>
                      ))}
                    </Grid>
                    {/* <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2"><ChairIcon fontSize="small" /> Zonas</Typography>
                      <ul className='spaceInfo-features-list'>
                        <li> Microondas</li>
                        <li> Sillas</li>
                        <li> Wi-Fi</li>
                      </ul>
                    </Grid> */}
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Card className='spaceInfo-card' sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography m={2} variant="h5" component="div">
                  <strong>25 €</strong> día
                </Typography>
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">¿Qué día?</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={'text'}
                    endAdornment={
                      <InputAdornment position="end">
                        <CalendarTodayRoundedIcon onClick={handleClick} />
                      </InputAdornment>
                    }
                    label="¿Qué día?"
                    value={`${parseSmallDate(date[0])} - ${parseSmallDate(date[1])}`}
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
                  <Calendar disableDates={datesToDisable} />
                </Popover>
                <div className='spaceInfo-card-pay'>
                  <Button style={{ width: '80%' }} mt={2} variant="contained" size="medium" onClick={handleClickReservate}>
                    {user.token ? 'Reservar' : 'Identificarse para reservar'}
                  </Button>
                  <Typography m={2} variant="body2" style={{ opacity: 0.5 }} align="center">
                    No se te cobrara nada aún.
                  </Typography>
                  <div className='spaceInfo-card-typography'>
                    <Typography mt={2} variant="body2" color="opacity">
                      <span className='spaceInfo-card-info'>{space?.price} € x {cantDays} dias</span> <span align="left" className='spaceInfo-card-price'> {space?.price * cantDays} €</span>
                    </Typography>
                    <Typography mt={2} variant="body2" color="opacity">
                      <span className='spaceInfo-card-info'>Comisión de servicio de FlexSpace  </span><span className='spaceInfo-card-price'>
                        {Math.round(space?.price * cantDays * 0.02)} €
                      </span>
                    </Typography>
                    <Divider />
                    <Typography mt={2} variant="body2" color="opacity">
                      <strong><span className='spaceInfo-card-info'>Total</span><span className='spaceInfo-card-price'>
                        {Math.round(space?.price * cantDays * 0.02) + space?.price * cantDays} €
                      </span></strong>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className='spaceInfo-grid-rules'>
          <Divider />
          <Typography mt={2} variant="h6" component="h2"><strong>Qué debes saber</strong></Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2"><strong>Normas del espacio</strong></Typography>
              <div>
                {space?.rules}
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2"><strong>Política de cancelación</strong></Typography>
              <div>Cancelación gratuita hasta 24hs antes de iniciada la reserva.
                Las cancelaciones de reservas enviadas menos de 24 horas antes de la hora de inicio del evento no son reembolsables.
                Consulta la política de cancelación completa del anfitrión, que se aplicará incluso si cancelas por haber contraído la COVID-19 o por cualquier problema relacionado con el coronavirus.
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Dialog open={openModal} onClose={handleCloseReservate}>
        <DialogTitle> Enviar tu solicitud al anfitrión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Explícale tu actividad lo más detalladamente posible al anfitrión
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mensaje"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReservate}>Cancelar</Button>
          <Button onClick={submit}>Reservar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          No se pudo realizar la reserva
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Alguna de las fechas que ha seleccionado no se encuentran disponibles
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpaceInfo;
