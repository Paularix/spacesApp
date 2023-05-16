
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import './Confirmation.css'; 


const Confirmation = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='confirmation-container'>
            <div>
            <Typography align="center" variant="h6" className='confirmation-title'>¡Solicitud enviada!</Typography>
            <Typography align="center" className='confirmation-subtitle' m={2}variant="body2" color="text.secondary">
                Hemos enviado tu consulta. 
                Muy pronto tendrás noticias del anfitrión del espacio
            </Typography>
            <Card className='confirmation-card' sx={{ maxWidth: 345 }}>
                <CardContent>
                    {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> */}
                    <Typography  mt={2}variant="body2" color="text.secondary">
                       <AssignmentIcon/> El anfitrión está revisando tu propuesta. 
                    </Typography>
                    <Typography  mt={2}variant="body2" color="text.secondary">
                       <SecurityUpdateGoodIcon/> Una vez aceptada, podrás pagar la reserva.
                    </Typography>
                    <Typography  mt={2}variant="body2" color="text.secondary">
                       <PermDeviceInformationIcon/>Te enviaremos toda la información necesaria antes del evento.
                    </Typography>
                    <Typography align="center" mt={2}variant="body2" color="text.secondary">
                        <strong>¡Gracias por confiar en nosotros!</strong>
                    </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions> */}
            </Card>

            </div>
           
        </div>
    );
};

export default Confirmation;
