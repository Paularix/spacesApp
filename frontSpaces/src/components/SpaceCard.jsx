import "./SpaceCard.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const SpaceCard = ({ name, image }) => {
  const shareViaWhatsApp = () => {
    const whatsappMessage = encodeURIComponent(`Hey! Check out this awesome space: ${window.location.href}`);
    window.location.href = `https://wa.me/?text=${whatsappMessage}`;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Space location
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price/day
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={shareViaWhatsApp}>Share via WhatsApp</Button>
        <Link to="/spaceInfo">
          <Button size="small">Info</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SpaceCard;
