import "./SpaceCard.css";
import React, {useContext} from 'react';
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
import noImage from '../images/no_image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import GlobalContext from "../../context/GlobalContext";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";


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
  const {fetchSpaceId, setFetchSpaceId} = useContext(GlobalContext)
  const goTo = useNavigate()
  const shareViaWhatsApp = () => {
    const whatsappMessage = encodeURIComponent(`Hey! Check out this awesome space: ${window.location.href}`);
    window.location.href = `https://wa.me/?text=${whatsappMessage}`;
  };

  const handleEditSpace = (e, id) => {
    e.preventDefault()
    console.log(id)
    setFetchSpaceId(id)
    goTo("/editSpace")
  }

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300 }}>
      <CardMedia
        className='spacecard-img'
        component="img"
        height="194"
        image={space.space_picture ?
          ("http://localhost:3080/api/photos/spaces/" + space.space_picture) : (noImage)}
        alt="space picture"
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
        <div> <Button size="small"
          variant="outlined"
          onClick={shareViaWhatsApp}
          sx={{
            color: '#7879F1',
            borderColor: '#7879F1',
            marginLeft: 1.78,
            marginTop: 1,
            marginRight: 1.78,
            boxShadow: 'none',
            justifyItems: 'center',
            '&:hover': {
              color: '#7879F1',
              borderColor: '#7879F1',
              boxShadow: 'none',
            }
          }}>
          Share via WhatsApp</Button>
          <Link to="/spaceInfo" size="small">Info</Link>
        </div>
          <Button size="small"
            onClick={(e) => handleEditSpace(e, space.id)}
            variant="outlined"
            sx={{
              color: '#7879F1',
              borderColor: '#7879F1',
              marginLeft: 1.78,
              marginTop: 1,
              marginRight: 1.78,
              boxShadow: 'none',
              justifyItems: 'center',
              '&:hover': {
                color: '#7879F1',
                borderColor: '#7879F1',
                boxShadow: 'none',
              }
            }}>
            <EditIcon></EditIcon>
          </Button>
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

