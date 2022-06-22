import axios from 'axios';
import VacationModel from '../Models/vacationModel';
import {
  addVacationAction,
  deleteVacationAction,
  fetchVacationsAction,
  updateVacationAction,
} from '../Redux/VacationsState';
import config from '../Utils/config';

import store from '../Redux/Store';

class VacationService {
  // Get all vacations:
  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations: VacationModel[] = [];
    let sessionToken = window.sessionStorage.getItem('token');
    await axios
      .get<VacationModel[]>(config.vacationsUrl, {
        headers: {
          Authorization: 'Bearer ' + sessionToken,
        },
      })
      .then((response) => {
        vacations = response.data;
        vacations = vacations.map((vac) => {
          return {
            ...vac,
            startingDate: vac.startingDate.substring(0, 10),
            endingDate: vac.endingDate.substring(0, 10),
            isFollowed: false,
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
    let sessionToken = window.sessionStorage.getItem('token');

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
      headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + sessionToken },
    });

    const addedVacation = response.data;
    store.dispatch(addVacationAction(addedVacation));
    return addedVacation;
  }

  // Update an existing vacation:
  public async updateVacation(vacationToUpdate: VacationModel) {
    let sessionToken = window.sessionStorage.getItem('token');

    const { id } = vacationToUpdate;
    console.log(vacationToUpdate.image);

    const bodyFormData = new FormData();
    bodyFormData.append('id', vacationToUpdate.id.toString());
    bodyFormData.append('description', vacationToUpdate.description);
    bodyFormData.append('destination', vacationToUpdate.destination);
    bodyFormData.append('startingDate', vacationToUpdate.startingDate.substring(0, 10));
    bodyFormData.append('endingDate', vacationToUpdate.endingDate.substring(0, 10));
    bodyFormData.append('price', vacationToUpdate.price.toString());

    if (vacationToUpdate.image) {
      bodyFormData.append('image', vacationToUpdate.image, vacationToUpdate.image.name);
    }

    const response = await axios({
      method: 'PUT',
      data: bodyFormData,
      url: config.vacationsUrl + id,
      headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + sessionToken },
    });

    const updatedVacation = response.data;

    store.dispatch(updateVacationAction(updatedVacation));
    return updatedVacation;
  }

  // Delete an existing vacation by id:
  public async deleteVacation(id: number) {
    let deletedVacation: any = {};
    let sessionToken = window.sessionStorage.getItem('token');
    await axios
      .delete<VacationModel>(config.vacationsUrl + id, {
        headers: {
          Authorization: 'Bearer ' + sessionToken,
        },
      })
      .then((res) => {
        deletedVacation = res.data;
      })
      .catch((e) => {
        console.log(e);
      });

    store.dispatch(deleteVacationAction(deletedVacation));
    return deletedVacation;
  }
}
const vacationService = new VacationService();

export default vacationService;
