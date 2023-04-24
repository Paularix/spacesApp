import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../apiconfig';
import { Button, Card, CardContent, TextField, Typography, FormControl, IconButton, 
    OutlinedInput, InputLabel, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff }from '@mui/icons-material';
import './Login.css'

export const Login = () => {
    const goTo = useNavigate();

    const [userFields, setUserFields] = useState({
        email: '',
        password: '',
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
                email: userFields.email,
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
    return (
        <div className='login-container'>
            <Card className='login-card'>
                <CardContent>
                    <form className="login-form" onSubmit={submit} >
                        <Typography variant="h4" className='login-title login-sub'>Bienvenido</Typography >
                        <TextField
                            className="login-field login-text"
                            label="Email"
                            value={userFields.email}
                            onInput={(e) => setUserField("email", e.target.value)}
                            size="small"
                            required
                        />
                        <FormControl className="login-field login-text" size="small" required>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                value={userFields.password}
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
                            Iniciar sesión
                        </Button>
                        <Typography className='login-title login-sub'>¿No tienes una cuenta? <Link to='/Register'>Registrarse</Link></Typography >
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login