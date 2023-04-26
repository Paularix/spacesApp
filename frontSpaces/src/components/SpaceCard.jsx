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
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import './SpaceCard.css'

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

export default function SpaceCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Card sx={{ maxWidth: 300 }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <CardMedia
        className='spacecard-img'
        component="img"
        height="194"
        image="https://www.lamp.es/images/487081/small_slider_image.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <div>
          <Typography mt={2} className='spacecard-typo-title'>
            Loft con Luz natural estilo Nórdico
          </Typography>
          <Typography className='spacecard-typo'>
            Poblenou
          </Typography>
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <div className='spacecard-icon-person'>
          <IconButton aria-label="share">
            <PersonOutlineRoundedIcon />
          </IconButton>
          <Typography>
            30
          </Typography>
        </div>
        <div className="add-to-favorites">
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </div>
       

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