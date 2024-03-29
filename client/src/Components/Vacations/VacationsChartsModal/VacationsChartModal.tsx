import { Modal, Paper } from '@mui/material';
import VacationModel from '../../../Models/vacationModel';
import VacationsChart from '../VacationsChart/VacationsChart';

//modal styling
const style = {
  maxWidth: 960,
  maxHeigth: 540,
  padding: 1,
  borderRadius: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  bgcolor: 'background.paper',
};

//interface for modal props to be passed down from vacationsList
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
        <Paper elevation={5} sx={style}>
          {<VacationsChart vacations={props.vacations} />}
        </Paper>
      </Modal>
    </div>
  );
}
