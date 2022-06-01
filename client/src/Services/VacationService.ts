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
  public async getOneVacation() {}
  // Add new vacation:
  public async createVacation() {}
  // Update existing vacation:
  public async updateVacation() {}
  // Delete existing vacation by id:
  public async deleteVacation() {}
}
const vacationService = new VacationService();

export default vacationService;
