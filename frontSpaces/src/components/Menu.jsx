import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'


import Avatar from '@mui/material/Avatar'
import BalconyIcon from '@mui/icons-material/Balcony'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Navigation = () => {

    return (
        <div className="nav">
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Link to="/">
                    <IconButton
                        size="large"
                        sx={{ ml: 0 }}
                    >
                        <BalconyIcon sx={{ width: 32, height: 32 }}></BalconyIcon>
                    </IconButton>

                </Link>

                <Link to="/spaces" className="nav-link">
                    <Typography sx={{ minWidth: 100 }}>Spaces</Typography>
                </Link>

                <Link to="/login" className="nav-link">
                    <Typography sx={{ minWidth: 100 }}>Login</Typography>
                </Link>

                <Link to="/register" className="nav-link">
                    <Typography sx={{ minWidth: 100 }}>Register</Typography>
                </Link>


                <Link to="/profile">
                    <IconButton
                        size="small"
                        sx={{ ml: 2 }}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                </Link>

            </Box>
        </div>
    );
}

export default Navigation