import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext"
import './MyReservations.css'
import { API_URL } from "../../apiconfig";
import SpaceCard from '../../components/SpaceCard/SpaceCard';


export const MyReservations = () => {

    // const { user } = useContext(GlobalContext)
    // const [spaces, setSpaces] = useState([]);

    // useEffect(() => {
    //     console.log(user)
    //     if (user.token)
    //         loadData();
    // }, [user])

    // const route = "spaces/auth/MyReservations";

    // function loadData() {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': user.token
    //         }
    //     };
    //     fetch(API_URL + route, options)
    //         .then(result => result.json())
    //         .then(response => {
    //             if (response.ok === true) {
    //                 setSpaces(response.data);
    //             } else {
    //                 setError(response.error)
    //             }
    //         })
    //         .catch(error => setError(error))
    // }

    return (

        <div className='myspaces-container'>
            {/* {!spaces.length ?
                <div className='myspaces-card-container'>
                    <Card className='myspaces-card'>
                        <CardMedia
                            component="img"
                            alt="space image"
                            height="300"
                            image="https://www.loiola.com/images/espacio_abierto_portada.png"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No tienes ningún espacio reservado aún ¡por ahora!
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Comienza a planear tu próxima evento
                            </Typography>
                        </CardContent>
                        <Button className='myspaces-button myspaces-banner-button' variant="contained">Sube tu espacio</Button>
                    </Card>
                </div> :
                <div>
                    <Typography mt={2} variant="h5" color="text.primary">
                        Mis Reservas
                    </Typography>
                    <div className='myspaces-list-spaces' >
                        {spaces.map((space, index) => (
                            <div className='myspaces-card-spaces'>
                                <SpaceCard key={index} space={space} />
                            </div>
                        ))}
                    </div>
                </div>
            } */}
        </div>
    )
}

export default MyReservations