import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';
import socketService from '../../../Services/SocketService';
import vacationService from '../../../Services/VacationService';

import Vacation from '../Vacation/Vacation';
import VacationsChart from '../VacationsChart/VacationsChart';
import './VacationsList.css';
const style = {
  maxWidth: 960,
  maxHeigth: 540,
  borderRadius: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',

  bgcolor: 'background.paper',
};
export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    vacationService.getAllVacations();
    socketService.connect();

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
    if (userId) followersService.getAllFollowedVacationsByUserId(userId);
  }, [userId]);

  function connect(): void {
    socketService.connect();
  }

  function send(): void {
    socketService.send();
  }

  return (
    <div className="VacationsList">
      {/* <button onClick={connect}>coonect</button>
      <button onClick={send}>send</button> */}
      <div className="VacationsList-links">
        {isAdmin && <Button onClick={handleOpen}>Reports</Button>}

        <Button component={Link} to="/vacations/new" color="info" variant="contained">
          Add a vacation
        </Button>
      </div>

      <div className="VacationsList-vacations">
        {vacations.map((vacation) => (
          <Vacation followed={vacation.isFollowed} canEdit={isAdmin} key={vacation.id} vacation={vacation} />
        ))}
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ p: 2 }}>
              {<VacationsChart vacations={vacations} />}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
