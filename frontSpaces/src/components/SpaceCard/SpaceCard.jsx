import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import './SpaceCard.css'
import noImage from '../images/no_image.jpg'

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

export default function SpaceCard({ space }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
}