import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../apiconfig';
import {
    Button, Card, CardContent, TextField, Typography, FormControl, IconButton,
    OutlinedInput, InputLabel, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import jwt_decode from 'jwt-decode'
import GlobalContext from "../context/GlobalContext"
import './Login.css'


export const Login = () => {
    const goTo = useNavigate();

    const { user, setUser, error, setError } = useContext(GlobalContext)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (user.token) {
            goTo("/home")
        } 
    }, [user])

    const login = () => {

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
            .then(res => {
                if (res.ok === true) {
                    const decoded = jwt_decode(res.token)
                    localStorage.token = res.token;
                    setUser({
                        ...user,
                        email: decoded.email,
                        password: '',
                        token: res.token
                    })
                } else {
                    setUser({
                        ...user,
                        password: '',
                        error: res.error
                    })
                }
            })
            .catch(error => {
                console.log(error)
                setError(error)
                goTo("error")
            })
    }


    const setUserField = (field, value) => {
        setUser({
            ...user,
            [field]: value
        })
    }
    return (
        <div className='login-container'>
            <Card className='login-card'>
                <CardContent>
                    <form className="register-form" >
                        <Typography variant="h4" className='register-title register-sub'>Bienvenido</Typography >
                        <TextField
                            className="login-field login-text"
                            label="Email"
                            value={user.email}
                            onInput={(e) => setUserField("email", e.target.value)}
                            size="small"
                            required
                        />
                        <FormControl className="login-field login-text" size="small" required>
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
                        { 
                        user.error && 
                        <Typography sx={{
                            color: 'red',
                        }} className='register-title register-sub'>
                            {user.error}
                        </Typography >
                        }

                        <br />
                        <Button variant="contained" onClick={() => login()}>
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