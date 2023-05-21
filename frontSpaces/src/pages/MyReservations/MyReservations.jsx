import React from 'react'
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import './MyReservations.css';
import { API_URL } from "../../apiconfig";
import CardReservations from '../../components/CardReservations/CardReservations';


export const Myreservations = () => {

    const { user } = useContext(GlobalContext)
    const [spaces, setSpaces] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user.token)
            loadData();
    }, [user])

    const route = "bookings/auth/Myreservations";

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
                    setBookings(response.data);
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
                <Typography mt={2} variant="h5" color="text.primary" align="center">
                    Mis Reservas
                </Typography>
                <div className='myreservations-list-spaces' >
                    {bookings.map((booking, index) => (
                        <div className='myreservations-card-spaces'>
                            <CardReservations key={index} booking={booking} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Myreservations