import React from 'react'
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import './BookingMGMT.css';
import { API_URL } from "../../apiconfig";
import CardReservations from '../../components/CardReservationMGMT/CardReservationMGMT';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

export const BookingMGMT = () => {

    const { user, setError, bookings, setBookings, refresh, setRefresh } = useContext(GlobalContext)
    const [spaces, setSpaces] = useState([]);
    

    useEffect(() => {
        if (user.token)
            loadData();
    }, [user, refresh])

    const route = "bookings/auth/bookingmgmt";

    function loadData() {
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

                    setBookings(response.data)

                } else {
                    setError(response.error)
                }
            })
            .catch(error => setError(error))
    }

    return (

        <div className='myreservations-container'>
            {/* {!spaces.length ?
                <div className='myreservations-card-container'>
                    <Card className='myreservations-card'>
                        <CardMedia
                            component="img"
                            alt="space image"
                            height="300"
                            image="https://www.lexington.es/app/uploads/2019/04/Alquiler-espacios-para-grabaciones-en-Madrid.png"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No tienes ningún espacio reservado aún ¡por ahora!
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Comienza a planear tu próxima evento
                            </Typography>
                        </CardContent>
                        <Button className='myreservations-button myreservations-banner-button' variant="contained">Reservar</Button>
                    </Card>
                </div> : */}
            <div>
                <Typography mt={2} variant="h5" color="text.primary">
                    Gestión de Reservas
                </Typography>
                <div className='myreservations-list-spaces' >
                    <Card className='booking-card' sx={{
                        margin: 3,
                        padding: 5,
                    }}>
                        <Typography variant="h5" component="div" sx={{
                            marginBottom: 2,
                        }} >
                            Solicitudes:
                        </Typography>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            {
                                bookings.filter(booking => booking.status == 0).length > 0
                                ?
                                (bookings.map((booking, index) => (

                                    <div>
                                        {
                                            booking.status == 0
                                                ? (<CardReservations key={index} booking={booking} />)
                                                : (' ')
                                        }
                                    </div>
                                )))
                                : (<p> No tienes solicitudes de reservas.</p>)
                            }
                        </Box>


                    </Card>

                    <Card sx={{
                        margin: 3,
                        padding: 5,

                    }}>
                        <Typography variant="h5" component="div" sx={{
                            marginBottom: 2,
                        }}>
                            Reservas confirmadas:
                        </Typography>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            {
                                 bookings.filter(booking => booking.status == 1).length > 0 ?
                                (bookings.map((booking, index) => (

                                    <div>
                                        {
                                            booking.status == 1
                                                ? (<CardReservations key={index} booking={booking} />)
                                                : (' ')
                                        }
                                    </div>
                                )))
                                : (<p>No tienes reservas confirmadas...</p>)
                            }
                            
                            
                        </Box>
                    </Card>

                    <Card sx={{
                        margin: 3,
                        padding: 5,
                    }}>
                        <Typography variant="h5" component="div" sx={{
                            marginBottom: 2,
                        }}>
                            Reservas rechazadas:
                        </Typography>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            {
                                bookings.filter(booking => booking.status == 2).length > 0 ?
                                (bookings.map((booking, index) => (

                                    <div>
                                        {
                                            booking.status == 2
                                                ? (<CardReservations key={index} booking={booking} />)
                                                : (' ')
                                        }
                                    </div>
                                )))
                                : (<p>No has rechazado ninguna reserva.</p>)
                            }
                        </Box>
                    </Card>


                </div>
            </div>

        </div>

    )
}

export default BookingMGMT