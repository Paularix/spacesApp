import React from 'react'
import { useState, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../apiconfig';
import { Button, Card, CardContent, TextField, Typography, FormControl, IconButton, 
    OutlinedInput, InputLabel, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff }from '@mui/icons-material';
import GlobalContext from "../context/GlobalContext"
import './Login.css'


export const Login = () => {
    const goTo = useNavigate();

    const { user, setUser} = useContext(GlobalContext)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function submit(e) {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        };

        fetch(API_URL + "users/login", options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error))

        goTo('/users')

    }
    
    const setUserField = (field, value) => {
        setUser({
            ...user,
            [field]: value
        })
    }
    return (
        <div className='register-container'>
            <Card className='register-card'>
                <CardContent>
                    <form className="register-form" onSubmit={submit} >
                        <Typography variant="h4" className='register-title register-sub'>Bienvenido</Typography >
                        <TextField
                            className="register-field register-text"
                            label="Email"
                            value={user.email}
                            onInput={(e) => setUserField("email", e.target.value)}
                            size="small"
                            required
                        />
                        <FormControl className="register-field register-text" size="small" required>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                value={user.password}
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
                        <Typography className='register-title register-sub'>¿No tienes una cuenta? <Link to='/Register'>Registrarse</Link></Typography >
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login