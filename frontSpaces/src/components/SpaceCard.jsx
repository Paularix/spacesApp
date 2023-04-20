import * as React from 'react'
import "./SpaceCard.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const SpaceCard = () => {



    return (<>
    
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/public/vite.svg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Space title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Space location
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price/day
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Info</Button>
      </CardActions>
    </Card>

        

    </>)
}

export default SpaceCard




  