import axios from 'axios';
import VacationModel from '../Models/vacationModel';

class VacationService {
  // Get all vacations:
  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations: VacationModel[] = [];
    await axios
      .get<VacationModel[]>('http://localhost:3001/vacations')
      .then((response) => {
        vacations = response.data;
      })
      .catch((e) => console.log(e));
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
  public async createVacation(newVaction: VacationModel): Promise<VacationModel> {
    const response = await axios.post('http://localhost:3001/vacations', newVaction);
    const addedVacation = response.data;
    return addedVacation;
  }
  // Update an existing vacation:
  public async updateVacation(vacationToUpdate: VacationModel) {
    const { id } = vacationToUpdate;
    const response = await axios.put(`http://localhost:3001/vacations/${id}`, vacationToUpdate);
    const updatedVaction = response.data;
    return updatedVaction;
  }
  // Delete an existing vacation by id:
  public async deleteVacation(id: number) {
    const response = await axios.delete(`http://localhost:3001/vacations/${id}`);
    const deletedVacation = response.data;
    return deletedVacation;
  }
}
const vacationService = new VacationService();

export default vacationService;
