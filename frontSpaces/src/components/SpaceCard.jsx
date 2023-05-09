import "./SpaceCard.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import Button from '@mui/material/Button';
import './SpaceCard.css'
import noImage from './no_image.jpg'
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const SpaceCard = ({ space }) => {
  const shareViaWhatsApp = () => {
    const whatsappMessage = encodeURIComponent(`Hey! Check out this awesome space: ${window.location.href}`);
    window.location.href = `https://wa.me/?text=${whatsappMessage}`;
  };

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300 }}>
      <CardMedia
        className='spacecard-img'
        component="img"
        height="194"
         image={space.space_picture ?
           ("http://localhost:3080/api/photos/spaces/" + space.space_picture) : (noImage)}
        alt="Paella dish"
      />
      <CardContent>
        <div>
          <Typography variant="h6" className='spacecard-typo-title'>
            {space.name}
          </Typography>
          <Typography variant="subtitle2" className='spacecard-typo'>
            {space.address}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="spacecard-icons">
        <div className='spacecard-icon-person'>
          <PersonOutlineRoundedIcon />
          <Typography>
            {space.capacity}
          </Typography>
        </div>
        <div className='spacecard-icon-price'>
          <Typography variant="subtitle2">
            <b>{space.price} €</b> / dia
          </Typography>
        </div>
        <div> <Button size="small" onClick={shareViaWhatsApp}>Share via WhatsApp</Button>
          <Link to="/spaceInfo" size="small">Info</Link>
        </div>
        {/* <div className="add-to-favorites">
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </div> */}
      </CardActions>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

export default SpaceCard;

