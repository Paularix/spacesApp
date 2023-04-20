import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../apiconfig';
import { Button, Card, CardContent, TextField, Typography, FormControl } from '@mui/material';
import './Register.css'


import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function Register() {

    const goTo = useNavigate();

    const [userFields, setUserFields] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function submit(e) {
        e.preventDefault();

        const opcions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: userFields.name,
                last_names: userFields.lastName,
                email: userFields.email,
                phone_number: userFields.phone,
                password: userFields.password
            })
        };

        fetch(API_URL + "users", opcions)
        goTo('/users')

    }

    const setUserField = (field, value) => {
        setUserFields({
            ...userFields,
            [field]: value
        })
    }



    return (<>
        <div className='register-container'>
            <Card className='register-card'>
                <CardContent>
                    <form className="register-form" onSubmit={submit} >
                        <Typography variant="h4" className='register-title register-sub'>Te damos la bienvenida</Typography >
                        <Typography className='register-title register-sub'>Regístrate gratis y empieza a utilizar SpaceApp</Typography >
                        <TextField
                            className="register-field register-text"
                            label="Nombre"
                            onInput={(e) => setUserField("name", e.target.value)}
                            value={userFields.name}
                            size="small"
                            required
                        />
                        <TextField
                            className="register-field register-text"
                            label="Apellido"
                            value={userFields.lastName}
                            onInput={(e) => setUserField("lastName", e.target.value)}
                            size="small"
                            required
                        />
                        <TextField
                            className="register-field register-text"
                            label="Email"
                            value={userFields.email}
                            onInput={(e) => setUserField("email", e.target.value)}
                            size="small"
                            required
                        />

                        <TextField
                            className="register-field register-text"
                            label="Teléfono"
                            value={userFields.phone}
                            onInput={(e) => setUserField("phone", e.target.value)}
                            size="small"
                            required
                        />
                        <FormControl>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className="register-field register-text"
                                value={userFields.password}
                                size="small"
                                required
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onInput={(e) => setUserField("password", e.target.value)}
                                label="Password"
                            />
                        </FormControl>
                        <br />
                        <Button variant="contained" type="submit">
                            Registrarse
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </>)
}


export default Register;