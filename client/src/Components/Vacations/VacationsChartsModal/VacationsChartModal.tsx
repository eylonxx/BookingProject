import { Box, Modal, Typography } from '@mui/material';
import VacationModel from '../../../Models/vacationModel';
import VacationsChart from '../VacationsChart/VacationsChart';

const style = {
  maxWidth: 960,
  maxHeigth: 540,
  borderRadius: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',

  bgcolor: 'background.paper',
};

interface ModalProps {
  vacations: VacationModel[];
  open: boolean;
  handleClose: Function;
  handleOpen: Function;
}

export default function VacationsChartModal(props: ModalProps) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {
          props.handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ p: 2 }}>
            {<VacationsChart vacations={props.vacations} />}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
