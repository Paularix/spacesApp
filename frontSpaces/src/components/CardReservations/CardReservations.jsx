import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { parseDate } from '../../utils/parseDate';
import { Button } from '@mui/material';

import './CardReservations.css'

export default function CardReservations({ booking }) {

    console.log(booking)
    return (

        <div className="card-reservation-container">
            <Card className="card-reservation" sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image="https://www.lexington.es/app/uploads/2023/02/5-consejos-para-alquilar-tu-primer-espacio-de-oficina.jpg"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1' }}>
                        <Typography component="div" variant="subtitle2">
                            <b>{booking?.Space?.name}</b>
                        </Typography>
                        <Typography component="div" variant="subtitle4">
                            Anfitrion: {booking?.User?.first_name}
                        </Typography>
                        <Typography className="card-reservation-dates card-reservation-dates-text" variant="body2" color="text.secondary" component="div">
                            {parseDate(booking.date_from)} -   {parseDate(booking.date_to)}
                        </Typography>

                    </CardContent>
                </Box>
            </Card>
        </div>
    );
}