import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { parseDate } from '../../utils/parseDate';
import { Button } from '@mui/material';
import GlobalContext from '../../context/GlobalContext';
import './CardReservationMGMT.css'
import { API_URL } from '../../apiconfig';



export default function CardReservationMGMT({ booking }) {

    const { error, setError, user, bookings, setBookings, refresh, setRefresh } = useContext(GlobalContext)

    const route = "bookings/auth/bookingmgmt";

    const acceptBooking = () => {

        fetch(API_URL + route + `/accept/${booking.id}`, {
            method: 'PUT',
            headers: {
                authorization: user.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok == true) {
                    setBookings([
                        ...bookings.map(bk => bk.id == booking.id ? bk.status = 1 : bk)
                    ])
                    setRefresh(!refresh)
                } else {
                    setError(res.error)
                }
            })
            .catch(err => setError(err.message))
    }

    const rejectBooking = () => {
        fetch(API_URL + route + `/reject/${booking.id}`, {
            method: 'PUT',
            headers: {
                authorization: user.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok == true) {
                    setBookings([
                        ...bookings.map(bk => bk.id == booking.id ? bk.status = 2 : bk)
                    ])
                    setRefresh(!refresh)
                } else {
                    setError(res.error)
                }
            })
            .catch(err => setError(err.message))

    }

    return (

        <div className="card-reservation-container">
            <Card className="card-reservation" sx={{
                display: 'flex',
                background: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#e2e2e2' : ''
            }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image="https://www.lexington.es/app/uploads/2023/02/5-consejos-para-alquilar-tu-primer-espacio-de-oficina.jpg"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1' }}>
                        <Typography component="div" variant="subtitle2" sx={{
                            marginTop: 1,
                            color: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#757575' : ''

                        }}>
                            <b>{booking?.Space?.name}</b>
                        </Typography>
                        <Typography component="div" variant="subtitle4" sx={{
                            display: 'flex',
                            marginTop: 1,
                            color: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#757575 ' : ''

                        }}>
                            Usuario: <Typography component="div" variant="subtitle4" sx={{
                                cursor: 'pointer', marginLeft: 2,
                                color: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#757575 ' : '#7879F1'
                            }}>{booking?.User?.first_name + " " + booking?.User?.last_names}</Typography>
                        </Typography>
                        <Typography className="card-reservation-dates card-reservation-dates-text" variant="body2" color="text.secondary" component="div" sx={{
                            marginTop: 1,
                            color: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#757575 ' : ''

                        }}>
                            {parseDate(booking.date_from)} -   {parseDate(booking.date_to)}
                        </Typography>
                        <Typography component="div" variant="subtitle2" sx={{
                            marginTop: 1,
                            color: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#757575 ' : ''

                        }}>
                            Mensaje:
                            <Typography sx={{
                                marginTop: 1,
                                marginLeft: 1,
                                fontSize: 12,
                                color: (new Date().getTime() > new Date(booking.date_from).getTime()) ? '#757575 ' : ''

                            }}>
                                {booking.message}
                            </Typography>
                        </Typography>
                        {
                            booking.status == 0
                                ? (
                                    <Box sx={{
                                        marginTop: 2,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <Button variant="contained" size="small" sx={{
                                            boxShadow: 'none',
                                            background: '#7879F1',
                                            marginRight: '18px',
                                            '&:hover': {
                                                background: '#7879F1',
                                                boxShadow: 'none',
                                            },
                                        }}
                                            onClick={() => acceptBooking()}

                                        >Accept</Button>
                                        <Button variant="contained" size="small" sx={{
                                            boxShadow: 'none',
                                            background: '#7879F1',
                                            marginRight: '18px',
                                            '&:hover': {
                                                background: '#7879F1',
                                                boxShadow: 'none',
                                            },
                                        }}
                                            onClick={() => rejectBooking()}
                                        >Reject</Button>
                                    </Box>
                                )
                                : (' ')
                        }

                    </CardContent>
                </Box>
            </Card>
        </div>
    );
}

