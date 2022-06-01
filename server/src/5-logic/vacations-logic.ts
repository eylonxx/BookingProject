import dal from '../2-utils/dal';
import { ResourceNotFound, ValidationError } from '../4-models/errors-model';
import VacationModel from '../4-models/vacation-model';

async function getAllVacations(): Promise<VacationModel[]> {
  const sql = `
    SELECT
    id,
    description,
    destination,
    imageName,
    startingDate,
    endingDate,
    price,
    followers
    FROM vacations
    `;
  const vacations = await dal.execute(sql);
  return vacations;
}

async function getOneVacation(id): Promise<VacationModel> {
  const sql = `
    SELECT
    id,
    description,
    destination,
    imageName,
    startingDate,
    endingDate,
    price,
    followers
    FROM vacations
    WHERE id = ${id}
    `;
  const vacation = await dal.execute(sql);
  return vacation;
}

async function createVacation(vacation): Promise<VacationModel> {
  const { description, destination, imageName, startingDate, endingDate, price, followers } = vacation;
  const sql = `
    INSERT INTO
    vacations (description, destination, startingDate, endingDate, price)
    VALUES('${description}', '${destination}', ${startingDate}, ${endingDate}, ${price})
    `;
  const addedVacation = await dal.execute(sql);
  return addedVacation;
}

async function updateVacation(vacation): Promise<VacationModel> {
  const { id, description, destination, imageName, startingDate, endingDate, price, followers } = vacation;
  const sql = `
    UPDATE vacations
    SET
    description = '${description}', 
    destination = '${destination}', 
    startingDate = ${startingDate}, 
    endingDate = ${endingDate}, 
    price = ${price}
    WHERE id = ${id}
    `;
  const addedVacation = await dal.execute(sql);
  return addedVacation;
}

async function deleteVacation(id): Promise<VacationModel> {
  const sql = `
    DELETE FROM vacations
    WHERE id = ${id} 
    `;
  const deletedVacation = await dal.execute(sql);
  return deletedVacation;
}
export { getAllVacations, getOneVacation, createVacation, updateVacation, deleteVacation };
