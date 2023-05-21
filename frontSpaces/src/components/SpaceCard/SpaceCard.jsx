import "./SpaceCard.css";
import React, { useContext } from 'react';
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
import { Box } from "@mui/system";

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


const SpaceCard = ({ space, from }) => {

  const { fetchSpaceId, setFetchSpaceId } = useContext(GlobalContext)
  const goTo = useNavigate()
  const shareViaWhatsApp = (e) => {
    e.preventDefault()
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
    <Link to={`/spaceInfo/${space.id}`} style={{ textDecoration: 'none', padding: "16px" }}>
      <Card sx={{ maxWidth: 300, minWidth: 300, minHeight: 375 }}>
        <CardMedia
          className='spacecard-img'
          component="img"
          height="194"
          image={space.space_picture ?
            ("http://localhost:3080/api/photos/spaces/" + space.space_picture) : (noImage)}
          alt="Picture"
        />
        <CardContent sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div>
            <Typography variant="h6" className='spacecard-typo-title' sx={{ textDecoration: 'none', width: 210,}}>
              {space.name}
            </Typography>
            <Typography variant="subtitle2" className='spacecard-typo' sx={{ textDecoration: 'none', width: 210,}}>
              {space.address}
            </Typography>
          </div>
          
          {
            from == "myspaces"  &&  (<Button size="small"
            onClick={(e) => handleEditSpace(e, space.id)}
            variant="outlined"
            sx={{
              color: '#7879F1',
              border: 'none',
              marginTop: 1,
              height: 25,
              boxShadow: 'none',
              justifyItems: 'center',
              '&:hover': {
                border: 'none',
                color: '#7879F1',
                borderColor: '#7879F1',
                boxShadow: 'none',
              }
            }}>
            <EditIcon></EditIcon>
          </Button>)
          }
            


        </CardContent>
        <CardActions className="spacecard-icons">
          <div className='spacecard-icon-person'>
            <PersonOutlineRoundedIcon />
            <Typography>
              {space.capacity}
            </Typography>
          </div>
          <div className='spacecard-icon-price'>
            <Typography variant="subtitle2" style={{ textDecoration: 'none' }}>
              <b>{space.price} €</b> / dia
            </Typography>
          </div>
          <div>
            <Button size="small" onClick={shareViaWhatsApp} sx={{
                color: '#7879F1',
                border: 'none',
                marginTop: 1,
                height: 25,
                boxShadow: 'none',
                justifyItems: 'center',
                '&:hover': {
                  border: 'none',
                  color: '#7879F1',
                  borderColor: '#7879F1',
                  boxShadow: 'none',
                }
              }}>Share</Button>
          </div>
        </CardActions>
      </Card>
    </Link>
  );

};
export default SpaceCard;
