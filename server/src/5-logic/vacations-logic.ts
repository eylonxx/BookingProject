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
  console.log(vacations);
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
  console.log(vacation);
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
  console.log(addedVacation);
  return addedVacation;
}

export { getAllVacations, getOneVacation, createVacation };
