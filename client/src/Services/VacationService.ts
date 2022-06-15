import axios from 'axios';
import config from '../Utils/config';
import VacationModel from '../Models/vacationModel';
import {
  fetchVacationsAction,
  addVacationAction,
  updateVacationAction,
  deleteVacationAction,
} from '../Redux/VacationsState';

import store from '../Redux/Store';

class VacationService {
  // Get all vacations:
  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations: VacationModel[] = store.getState().vacationState.vacations;
    await axios
      .get<VacationModel[]>(config.vacationsUrl, {
        headers: {
          Authorization: 'Bearer ' + store.getState().authState.token,
        },
      })
      .then((response) => {
        vacations = response.data;
        vacations = vacations.map((vac) => {
          return {
            ...vac,
            startingDate: vac.startingDate.substring(0, 10),
            endingDate: vac.endingDate.substring(0, 10),
          };
        });
      })
      .catch((e) => console.log(e));
    store.dispatch(fetchVacationsAction(vacations));
    return vacations;
  }
  // Get one vacation by id:
  public async getOneVacation(id: number): Promise<VacationModel> {
    const vacations = await this.getAllVacations();
    const vacation = vacations.find((vac): boolean => {
      return vac.id === id;
    });
    return vacation;
  }
  // Add a new vacation:
  public async createVacation(newVacation: VacationModel): Promise<VacationModel> {
    const bodyFormData = new FormData();
    bodyFormData.append('description', newVacation.description);
    bodyFormData.append('destination', newVacation.destination);
    bodyFormData.append('startingDate', newVacation.startingDate);
    bodyFormData.append('endingDate', newVacation.endingDate);
    bodyFormData.append('price', newVacation.price.toString());
    bodyFormData.append('image', newVacation.image, newVacation.image.name);

    const response = await axios({
      method: 'POST',
      data: bodyFormData,
      url: config.vacationsUrl,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const addedVacation = response.data;
    store.dispatch(addVacationAction(addedVacation));
    return addedVacation;
  }
  // Update an existing vacation:
  public async updateVacation(vacationToUpdate: VacationModel) {
    const { id } = vacationToUpdate;
    const response = await axios.put(config.vacationsUrl + id, vacationToUpdate);
    const updatedVacation = response.data;
    store.dispatch(updateVacationAction(updatedVacation));
    return updatedVacation;
  }
  // Delete an existing vacation by id:
  public async deleteVacation(id: number) {
    const response = await axios.delete(config.vacationsUrl + id);
    const deletedVacation = response.data;
    store.dispatch(deleteVacationAction(deletedVacation));

    return deletedVacation;
  }
}
const vacationService = new VacationService();

export default vacationService;
