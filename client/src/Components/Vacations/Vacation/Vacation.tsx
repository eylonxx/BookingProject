import React, { useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import './Vacation.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';

interface VacationProps {
  vacation: VacationModel;
}
export default function Vacation(props: VacationProps): JSX.Element {
  const { id, description, destination, startingDate, endingDate, price, followers } = props.vacation;
  const [follow, setFollow] = useState(false);
  const userId: number = store.getState().authState.user?.id;
  const dates = `${startingDate} until ${endingDate}`;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(store.getState().authState.user);
  }, []);

  const handleDelete = async () => {
    await vacationService.deleteVacation(id);
    alert('Product has been deleted.');
    navigate('/products');
  };

  const handleFollow = async (vacationId: number, userId: number) => {
    setFollow(!follow);
    follow ? await followersService.unfollow(vacationId, userId) : await followersService.follow(vacationId, userId);
  };

  useEffect(
    //save to local state or redux
    () => {
      vacationService
        .getOneVacation(id)
        .then((vacation) => {})
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
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteIcon />
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
          <IconButton
            // change color when active
            onClick={() => {
              handleFollow(id, userId);
            }}
            aria-label="add to favorites"
          >
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
