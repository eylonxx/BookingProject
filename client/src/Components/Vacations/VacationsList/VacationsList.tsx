import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';
import vacationService from '../../../Services/VacationService';

import Vacation from '../Vacation/Vacation';
import VacationsChartModal from '../VacationsChartsModal/VacationsChartModal';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    vacationService.getAllVacations();

    //subscribing for changes in vacations and who is logged in and wether he is an admin or not
    const unsubscribe = store.subscribe(() => {
      setVacations(store.getState().vacationState.vacations);
      setUserId(store.getState().authState.user?.id);
      const loggedIn = store.getState().authState.isLoggedIn;
      const user = store.getState().authState.user;
      if (loggedIn && user) setIsAdmin(user.role === 'Admin');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //getting followed vacations for a user
    if (userId) followersService.getAllFollowedVacationsByUserId(userId);
  }, [userId]);

  const compareVacations = (vacation1: VacationModel, vacation2: VacationModel) => {
    //comparing vacations to sort in renderVacation.
    if (vacation1.isFollowed === vacation2.isFollowed) {
      return vacation2.followers - vacation1.followers;
    } else {
      //return as first or as second between the two
      return vacation1.isFollowed ? -1 : 1;
    }
  };

  const renderVacations = () => {
    let temp = [...vacations];
    let sortedTemp = temp.sort(compareVacations);
    //sorting by followed and number of followers => unfollowed by number of followers
    return sortedTemp.map((vacation) => {
      return <Vacation followed={vacation.isFollowed} canEdit={isAdmin} key={vacation.id} vacation={vacation} />;
    });
  };

  return (
    <div className="VacationsList">
      <div className="VacationsList-links">
        {/* modal for admins */}
        {isAdmin && (
          <Button color="info" variant="contained" onClick={handleOpen}>
            Reports
          </Button>
        )}
        {/* create form for admins */}
        {isAdmin && (
          <Button component={Link} to="/vacations/new" color="info" variant="contained">
            Add a vacation
          </Button>
        )}
      </div>

      <div className="VacationsList-vacations">{renderVacations()}</div>

      <div className="VacationsList-modal">
        {/* rendering modal */}
        <VacationsChartModal open={open} handleOpen={handleOpen} handleClose={handleClose} vacations={vacations} />
      </div>
    </div>
  );
}
