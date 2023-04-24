import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../apiconfig';
import { TextField, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './Profile.css'
import avatar from './images/avatar.png'


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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getUser = async () => {
    const opcions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const result = await fetch(API_URL + "users/3", opcions)
    const user = await result.json();

    const userFields = {
      name: user.data.first_name,
      lastName: user.data.last_names,
      email: user.data.email,
      phone: user.data.phone_number,
      picture: user.data.profile_picture,
      bio: user.data.bio,
    }
    setUserFields(userFields)

  }


  async function submit () {
    const opcions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: userFields.name,
        last_names: userFields.lastName,
        email: userFields.email,
        phone_number: userFields.phone,
        profile_picture: userFields.picture,
        bio: userFields.bio,
      })
    };
      
    setLoading(true);
    await fetch(API_URL + "users/3", opcions);
    setLoading(false);
    setEditing(false)

  }

  const setUserField = (field, value) => {
    setUserFields({
      ...userFields,
      [field]: value
    })
  }

  const saveUser= (e) => {
    e.preventDefault();
    if(editing){
      submit();
    } else {
      setEditing(true)
    }
    
  }


async function sendPhoto(e){
    const image = e.target.files[0]
    const data = new FormData() 
    data.append('file', image);
    const options = {
      method: 'PUT',
      body: data
    };
    await fetch(API_URL + "users/photo/3", options)
    console.log(API_URL + "users/photo/3");
    getUser();
}


  return (
    <div className='profile-container'>
      <div className='profile-image-container'>
        <div className='profile-image-complete'>
          <img
            className='profile-image' 
            src={ userFields.picture ? 
              API_URL + 'photos/users/'+ userFields.picture :  avatar} 
            alt="" 
            />
          <Button className='profile-image-button img-button' size="small"><AddAPhotoIcon/>&nbsp;Subir foto</Button>
          <input className="profile-image-input" type="file" name="file" onChange={sendPhoto}/> 
        </div>
      </div>
      <div className='profile-form-container'>
        <form className="profile-form" onSubmit={saveUser} >
          <Typography variant="h4" className='profile-title profile-sub'>Tu perfil
            <IconButton disabled={loading} type='submit' aria-label="edit">
              {!editing ? <EditIcon /> : <SaveIcon/>}
            </IconButton>
          </Typography >
          <Typography className='profile-title profile-sub'>La información que nos facilites se utilizará en toda la aplicación para 
          que otros usuarios sepan quién eres.</Typography >
          <div className='profile-inputs-container'>
            <div>
              {editing ?
                <TextField
                  className="profile-field profile-text"
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
                    {userFields.name}
                  </Typography>
                </div>
              }
            </div>
            {!editing && <hr className='profile-divider' />}
            <div>
              {editing ?
                <TextField
                  className="profile-field profile-text"
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
                    {userFields.lastName}
                  </Typography>
                </div>
              }
            </div>
            {!editing && <hr className='profile-divider' />}
            <div>
              {editing ?
                <TextField
                  className="profile-field profile-text"
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
                    {userFields.email}
                  </Typography>
                </div>
              }
            </div>
            {!editing && <hr className='profile-divider' />}
            <div>
              {editing ?
                <TextField
                  className="profile-field profile-text"
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
                    {userFields.phone}
                  </Typography>
                </div>
              }
            </div>
            {!editing && <hr className='profile-divider' />}
            <div>
              {editing ?
                <TextField
                  className="profile-field profile-text"
                  label="Sobre mí"
                  value={userFields.bio}
                  onInput={(e) => setUserField("bio", e.target.value)}
                  size="small"
                  multiline
                  maxRows={4}
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Sobre mí
                  </Typography>
                  <Typography variant='body1'>
                    {userFields.bio}
                  </Typography>
                </div>
              }
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Profile