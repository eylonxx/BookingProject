import React, { useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import './Vacation.css';
import monke from '../../../Assets/Images/monke.jpg';
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
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';

interface VacationProps {
  vacation: VacationModel;
}
export default function Vacation(props: VacationProps): JSX.Element {
  const { id, description, destination, startingDate, endingDate, price, followers } = props.vacation;
  //get all vacations that current user follows

  const [follow, setFollow] = useState(false);

  const userId: number = store.getState().authState.user?.id;
  const dates = `${startingDate} until ${endingDate}`;
  const navigate = useNavigate();

  const handleDelete = async () => {
    await vacationService.deleteVacation(id);
    alert('Vacation has been deleted.');
    navigate('/vacations');
  };

  const handleEdit = () => {
    navigate(`edit/${id}`);
  };

  const handleFollow = async (vacationId: number, userId: number) => {
    follow ? await followersService.unfollow(vacationId, userId) : await followersService.follow(vacationId, userId);
    setFollow(!follow);
    console.log(follow);
  };

  return (
    <div className="Vacation">
      <Card sx={{ width: '450px', height: '500px' }}>
        <CardHeader
          action={
            <ButtonGroup aria-label="outlined primary button group">
              <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </ButtonGroup>
          }
          title={destination}
          subheader={dates}
        />
        <CardMedia component="img" height="280" image={monke} alt="Destination's image" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
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
            <FavoriteIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
