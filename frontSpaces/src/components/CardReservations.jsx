import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CardReservations({ space, bookings }) {

    return (

        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 100}}
                image="https://www.lexington.es/app/uploads/2023/02/5-consejos-para-alquilar-tu-primer-espacio-de-oficina.jpg"
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1' }}>
                    <Typography component="div" variant="subtitle2">
                        <span>{bookings.name}   
                            Gran Londres</span> 
                    </Typography>
                    <Typography component="div" variant="subtitle1">
                      
                     Anfitrion:  Cintia
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {bookings.date_from} - {bookings.date_to}
                        {/* 19 de nov. de 2022 – 21 de nov. de 2022 */}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}