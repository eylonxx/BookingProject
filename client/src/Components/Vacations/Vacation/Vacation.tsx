import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import { updateFollowVacationAction } from '../../../Redux/VacationsState';
import followersService from '../../../Services/FollowersService';
import vacationService from '../../../Services/VacationService';
import './Vacation.css';

interface VacationProps {
  vacation: VacationModel;
  canEdit: boolean;
  followed: boolean;
}
export default function Vacation(props: VacationProps): JSX.Element {
  const { id, description, destination, startingDate, endingDate, price, followers, imageName } = props.vacation;

  //get all vacations that current user follows

  const userId: number = store.getState().authState.user?.id;
  const image = 'http://localhost:3001/images/' + imageName;
  const dates = `${startingDate} until ${endingDate}`;
  const navigate = useNavigate();

  const handleDelete = async () => {
    await vacationService.deleteVacation(id);
  };

  const handleEdit = () => {
    navigate(`edit/${id}`);
  };

  const handleFollow = async (vacationId: number, userId: number) => {
    if (props.followed) {
      followersService.unfollow(vacationId, userId);
    } else {
      followersService.follow(vacationId, userId);
    }

    store.dispatch(updateFollowVacationAction(vacationId));
  };

  return (
    <div className="Vacation">
      <Card sx={{ width: '450px', height: '500px' }}>
        <CardHeader
          action={
            props.canEdit && (
              <ButtonGroup aria-label="outlined primary button group">
                <IconButton onClick={handleDelete} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </ButtonGroup>
            )
          }
          title={destination}
          subheader={dates}
        />
        <CardMedia component="img" height="280" image={image} alt="Destination's image" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            color={props.followed ? 'error' : 'default'}
            // change color when active
            onClick={() => {
              handleFollow(id, userId);
            }}
            aria-label="add to favorites"
          >
            <FavoriteIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            Followers: {followers}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}
