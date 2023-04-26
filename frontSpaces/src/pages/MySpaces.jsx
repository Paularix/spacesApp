import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import './MySpaces.css'
import { API_URL } from "../apiconfig";
import SpaceCard from '../components/SpaceCard';


export const MySpaces = () => {

    const [spaces, setSpaces] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const model = "auth/mySpaces";
    const space = {
        "id": 4,
        "name": "El Torreon",
        "address": "la costa 3030",
        "capacity": "20",
        "price": 90,
        "description": ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus",
        "rules": ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus",
        "space_picture": "space.jpg",
        "rid_host_user": 2
    }

    function loadData() {
        fetch(API_URL + model)
            .then(resultat => resultat.json())
            .then(retornat => {
                if (retornat.ok === true) {
                    setSpaces(retornat.data);
                } else {
                    setError(retornat.error)
                }
            })
            .catch(error => setError(error))
    }

    const rows = spaces.map((item, idx) => {
        return (
            <li key={idx}>
                <SpaceCard />
            </li>)
    });
    return (
        <div className='myspaces-container'>
            <div className='myspaces-card-container'>
                <Card sx={{ maxWidth: 900 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="https://www.loiola.com/images/espacio_abierto_portada.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            No tienes ningún espacio cargado... ¡por ahora!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Comienza a planear tu próxima evento
                        </Typography>
                    </CardContent>
                    <Button className='myspaces-button myspaces-banner-button' variant="contained">Sube tu espacio</Button>
                </Card>
            </div>

            <div>
                <Typography mt={2} variant="h5" color="text.primary">
                    Mis Espacios
                </Typography>
                <div className='myspaces-list-spaces' >
                    <ul>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                        <li>
                            <SpaceCard space={space} />
                        </li>
                    </ul>

                </div>

            </div>

        </div>
    )
}

export default MySpaces