import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../apiconfig';
import {
  Button, Card, CardContent, TextField, Typography, FormControl, IconButton,
  OutlinedInput, InputLabel, InputAdornment, Input
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Register.css'


export const Profile = () => {
  const goTo = useNavigate();

  const [userFields, setUserFields] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    picture: '',
    bio: '',

  })
  const [editing, setEditing] = useState(false);

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
        password: userFields.password,
        profile_picture: userFields.picture,
        bio: userFields.bio,
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

  const editar = () => {

  }
  return (
    <div className='register-container'>
      <Card className='register-card'>
        <CardContent>
          <form className="register-form" onSubmit={submit} >
            <Typography variant="h4" className='register-title register-sub'>Información personal</Typography >
            <Typography className='register-title register-sub'>Regístrate gratis y empieza a utilizar SpaceApp</Typography >
            <Button variant="text" size='small' onClick={() => setEditing(!editing)}>{editing ? "Cancelar" : "Editar"}</Button>
            <div>
              {editing ?
                <TextField
                  className="register-field register-text"
                  label="Nombre"
                  onInput={(e) => setUserField("name", e.target.value)}
                  value={userFields.name}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Nombre
                  </Typography>
                  <Typography variant='body1'>
                    Cintia
                  </Typography>
                </div>
              }
            </div>
            <div>
              {editing ?
                <TextField
                  className="register-field register-text"
                  label="Apellido"
                  value={userFields.lastName}
                  onInput={(e) => setUserField("lastName", e.target.value)}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Apellido
                  </Typography>
                  <Typography variant='body1'>
                    Mura
                  </Typography>
                </div>
              }
            </div>
            <div>
              {editing ?
                <TextField
                  className="register-field register-text"
                  label="Email"
                  value={userFields.email}
                  onInput={(e) => setUserField("email", e.target.value)}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Email
                  </Typography>
                  <Typography variant='body1'>
                    cintiamurashima@
                  </Typography>
                </div>
              }
            </div>
            <div>
              {editing ?
                <TextField
                  className="register-field register-text"
                  label="Teléfono"
                  value={userFields.phone}
                  onInput={(e) => setUserField("phone", e.target.value)}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Teléfono
                  </Typography>
                  <Typography variant='body1'>
                    547407686
                  </Typography>
                </div>
              }
            </div>
            <div>
              {editing ?
                <TextField
                  className="register-field register-text"
                  label="bio"
                  value={userFields.bio}
                  onInput={(e) => setUserField("bio", e.target.value)}
                  size="small"
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Bio
                  </Typography>
                  <Typography variant='body1'>
                    allalalalallallala
                  </Typography>
                </div>
              }
            </div>
            <hr />

          </form>
        </CardContent>
      </Card>
    </div>

  )
}

export default Profile