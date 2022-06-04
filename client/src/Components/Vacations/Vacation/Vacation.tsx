import React, { useEffect } from 'react';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import './Vacation.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface VacationProps {
  vacation: VacationModel;
}
export default function Vacation(props: VacationProps): JSX.Element {
  const { id, description, destination, startingDate, endingDate, price, followers } = props.vacation;
  const dates = `${startingDate} until ${endingDate}`;
  useEffect(
    //save to local state or redux
    () => {
      vacationService
        .getOneVacation(id)
        .then((vacation) => {
          console.log(vacation);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    []
  );
  return (
    <div className="Vacation">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
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
          title={destination}
          subheader={dates}
        />
        <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Destination's image" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
