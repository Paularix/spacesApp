import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BalconyIcon from '@mui/icons-material/Balcony';
import { Link, useNavigate } from 'react-router-dom';
import GlobalContext from "../../context/GlobalContext"
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import jwt_decode from 'jwt-decode'
import ApartmentIcon from '@mui/icons-material/Apartment';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import LoupeIcon from '@mui/icons-material/Loupe';

const pages = [];

function ResponsiveAppBar() {

    const { user, setUser, logout } = useContext(GlobalContext)
    const [anchorElUser, setAnchorElUser] = useState(false);

    //levanta la sesion del token
    useEffect(() => {
        const token = localStorage.token;
        if (token) {
            const decoded = jwt_decode(token)
            const { expiredAt, email, id } = decoded
            if (Number(expiredAt) > new Date().getTime()) {
                setUser({
                    email,
                    id,
                    token
                })
            }
        }
    }, [])

    const menuProfileImage = {
        width: '40px',
        borderRadius:'20px'
    }

    const openUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const toggleUserMenu = () => {
        setAnchorElUser(!anchorElUser);
    };

    const navigate = useNavigate()

    const authButton = {
        boxShadow: 'none',
        background: '#7879F1',
        marginRight: '18px'
    }

    const menuItem = {
        width: '240px'
    }

    const goLanding = () => {
        navigate("/")
    }
    return (
        <AppBar position="static" elevation={0} style={{ backgroundColor: '#ffffff' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        onClick={() => goLanding()}
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            letterSpacing: '.3rem',
                            color: 'black',
                            fontSize: '32px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <span className='colored'>S</span> pace  <span className='colored'>A</span>pp
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                    </Box>
                    <Typography
                        onClick={() => goLanding()}
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            letterSpacing: '.3rem',
                            fontSize: '32px',
                            color: 'black',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <span className='colored'>S</span> pace  <span className='colored'>A</span>pp
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        {
                            user.token
                                ? (
                                    <>

                                        <Tooltip title="Open settings">
                                            <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                                               { 
                                               user.profile_picture 
                                               ? (<img
                                                    style={menuProfileImage}
                                                    src={("http://localhost:3080/" + user.profile_picture)}
                                                    alt=""
                                                />) 
                                                :(
                                                    <Avatar style={menuProfileImage}></Avatar>
                                                )
                                                }
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{
                                                mt: '45px',
                                            }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClick={toggleUserMenu}
                                        >
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}
                                                to="/profile"
                                            >
                                                <MenuItem style={menuItem} onClick={toggleUserMenu}>
                                                    <AccountCircleIcon />
                                                    <Typography style={{ margin: "5px 10px 5px 10px" }} textAlign="center">Perfil</Typography>
                                                </MenuItem>
                                            </Link>
                                            <Divider />
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}
                                                to="/mySpaces"
                                            >
                                                <MenuItem style={menuItem} onClick={toggleUserMenu}>
                                                    <ApartmentIcon />
                                                    <Typography style={{ margin: "5px 10px 5px 10px" }} textAlign="center">Mis Espacios</Typography>
                                                </MenuItem>
                                            </Link>
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}
                                                to="/AddSpace"
                                            >
                                                <MenuItem style={menuItem} onClick={toggleUserMenu}>
                                                    <DomainAddIcon />
                                                    <Typography style={{ margin: "5px 10px 5px 10px" }} textAlign="center">Subir un espacio</Typography>
                                                </MenuItem>
                                            </Link>
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}
                                                to="/bookingMGMT"
                                            >
                                                <MenuItem style={menuItem} onClick={toggleUserMenu}>
                                                    <LoupeIcon />
                                                    <Typography style={{ margin: "5px 10px 5px 10px" }} textAlign="center">Gestionar mis reservas</Typography>
                                                </MenuItem>
                                            </Link>
                                            <Divider />
                                            <MenuItem style={menuItem} onClick={logout}>
                                                <LogoutIcon />
                                                <Typography style={{ margin: "5px 10px 5px 10px" }} textAlign="center">Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )
                                : (
                                    <>
                                        <Link to="/login" style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" style={authButton}>Login</Button>
                                        </Link>

                                        <Link to="/register" style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" style={authButton}>Register</Button>
                                        </Link>
                                    </>
                                )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;