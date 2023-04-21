import * as React from 'react';
import { useContext } from 'react';
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
import GlobalContext from "../context/GlobalContext"


const pages = [];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {

    const { user, setUser, logout } = useContext(GlobalContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()

    const authButton = {
        boxShadow: 'none',
        background: '#7879F1',
        marginRight: '18px'
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
                            mr: 2,
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
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        <span className='colored'>S</span> pace  <span className='colored'>A</span>pp
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        {
                            user.token
                                ? (
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" />
                                        </IconButton>
                                    </Tooltip>
                                )
                                : (
                                    <>
                                        <Link to="/login" style={{ textDecoration: 'none' }}>
                                        </Link>
                                        <Link to="/register" style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" style={authButton}>Register</Button>
                                        </Link>
                                    </>
                                )
                        }

                        <Menu
                            sx={{ mt: '45px' }}
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
                            onClose={handleCloseUserMenu}
                        >
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={logout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;