import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
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
import socketService from '../../../Services/SocketService';
import vacationService from '../../../Services/VacationService';
import notyfConfig from '../../../Utils/notyf';
import './Vacation.css';

interface VacationProps {
  vacation: VacationModel;
  canEdit: boolean;
  followed: boolean;
}
export default function Vacation(props: VacationProps): JSX.Element {
  const { id, description, destination, startingDate, endingDate, price, followers, imageName } = props.vacation;
  //certain functions available only for admins
  const userId: number = store.getState().authState.user?.id;
  const image = 'https://eylon-booking.herokuapp.com/images/' + imageName;
  const dates = `${startingDate} until ${endingDate}`;
  const navigate = useNavigate();

  const handleDelete = async () => {
    await vacationService.deleteVacation(id);
    socketService.notifyServer();
    notyfConfig.error('Deleted a vacation!');
  };

  const handleEdit = () => {
    navigate(`edit/${id}`);
  };

  const handleFollow = async (vacationId: number, userId: number) => {
    //update follows
    if (props.followed) {
      followersService.unfollow(vacationId, userId);
      socketService.notifyServer();
    } else {
      followersService.follow(vacationId, userId);
      socketService.notifyServer();
    }

    store.dispatch(updateFollowVacationAction(vacationId));
  };

  return (
    <div className="Vacation">
      <Card sx={{ width: '450px', height: '500px', borderRadius: '15px' }}>
        <CardHeader
          sx={{
            p: 1,
          }}
          action={
            <ButtonGroup aria-label="outlined primary button group">
              {/* only for admins */}
              {props.canEdit && (
                <IconButton onClick={handleDelete} aria-label="delete">
                  <DeleteIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              )}
              {/* only for admins */}
              {props.canEdit && (
                <IconButton onClick={handleEdit}>
                  <EditIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              )}
              {/* only for users */}
              {!props.canEdit && (
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
              )}
            </ButtonGroup>
          }
          title={destination}
          subheader={dates}
        />
        <CardMedia component="img" height="280" image={image} alt="Destination's image" />
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '28%',
            paddingTop: '4px',
            padding: '0px',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflowWrap: 'anywhere',
              p: 1,
              textAlign: 'center',
              flexGrow: 1,
              maxHeight: '90px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center', flexGrow: 0 }}>
            {price}$
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', flexGrow: 0 }}>
            Followers: {followers}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
