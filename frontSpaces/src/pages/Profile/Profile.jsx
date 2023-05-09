import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../apiconfig';
import { TextField, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './Profile.css'
import avatar from '../images/avatar.png'
import GlobalContext from "../../context/GlobalContext"



export const Profile = () => {
  const goTo = useNavigate();

  const { user, setUser, error, setError } = useContext(GlobalContext)
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.token) {
      getUser()
    } else {
      setError("Not authentified.")
      goTo("/error")
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getUser = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      }
    };

    fetch(API_URL + "users/auth/profile", options)
      .then(res => res.json())
      .then(res => {
        if (res.ok === true) {
          setUser({
            ...user,
            first_name: res.data.first_name,
            last_names: res.data.last_names,
            email: res.data.email,
            phone_number: res.data.phone_number,
            profile_picture: res.data.profile_picture,
            bio: res.data.bio,
          })
        } else {
          setError(res.error)
          goTo("/error")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  const saveUserProfile = () => {
    console.log("updating")
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_names: user.last_names,
        email: user.email,
        phone_number: user.phone_number,
        profile_picture: user.picture,
        bio: user.bio,
      })
    };
    setLoading(false)
    fetch(API_URL + "users/auth/profile", options)
      .then(res => res.json())
      .then(res => {
        if (res.ok == true) {
          setUser({
            ...user,
            first_name: res.data.first_name,
            last_names: res.data.last_names,
            email: res.data.email,
            phone_number: res.data.phone_number,
            bio: res.data.bio,
          })
        }
      })
      .then(res => {
        setLoading(false)
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
      })


  }

  const setUserField = (field, value) => {
    setUser({
      ...user,
      [field]: value
    })
  }

  const saveUser = (e) => {
    e.preventDefault();
    if (editing) {
      saveUserProfile();
    } else {
      setEditing(!editing)
    }
  }


  const sendPhoto = (e) => {
    console.log("heu")
    const image = e.target.files[0]
    const data = new FormData()
    data.append('file', image);
    const options = {
      method: 'PUT',
      headers: {
        'authorization': user.token
      },
      body: data
    };
    fetch(API_URL + "users/auth/profilepicture", options)
    .then(res => {
      res.json()
    })
    .then(res => {
      console.log(res)
      if (res.ok == true) {
        setUser({
          ...user,
          picture: res.data.profile_picture,    
        })
      }
    })
    .catch(err => console.log(err))
    
    getUser();
  }


  return (
    <div className='profile-container'>
      <div className='profile-image-container'>
        <div className='profile-image-complete'>
          <img
            className='profile-image'
            src={user.profile_picture ?
              ("http://localhost:3080/" + user.profile_picture) : (avatar)}
            alt=""
          />
          <Button className='profile-image-button img-button' size="small"><AddAPhotoIcon />&nbsp;Subir foto</Button>
          <input 
            className="profile-image-input" 
            type="file" 
            name="file" 
            onChange={(e) => sendPhoto(e)} 
          />
        </div>
      </div>
      <div className='profile-form-container'>
        <form className="profile-form" onSubmit={saveUser} >
          <Typography variant="h4" className='profile-title profile-sub'>Tu perfil
            <IconButton disabled={loading} type='submit' aria-label="edit">
              {!editing ? <EditIcon /> : <SaveIcon />}
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
                  onInput={(e) => setUserField("first_name", e.target.value)}
                  value={user.first_name}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Nombre
                  </Typography>
                  <Typography variant='body1'>
                    {user.first_name}
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
                  value={user.last_names}
                  onInput={(e) => setUserField("last_names", e.target.value)}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Apellido
                  </Typography>
                  <Typography variant='body1'>
                    {user.last_names}
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
                  value={user.email}
                  onInput={(e) => setUserField("email", e.target.value)}
                  size="small"
                  required
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Email
                  </Typography>
                  <Typography variant='body1'>
                    {user.email}
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
                  value={user.phone_number}
                  onInput={(e) => setUserField("phone_number", e.target.value)}
                  size="small"
                /> :
                <div>
                  <Typography variant='subtitle2'>
                    Teléfono
                  </Typography>
                  <Typography variant='body1'>
                    {user.phone_number}
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
                  value={user.bio}
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
                    {user.bio}
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