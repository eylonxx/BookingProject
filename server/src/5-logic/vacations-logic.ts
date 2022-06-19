import dal from '../2-utils/dal';
import { OkPacket } from 'mysql';
import { ResourceNotFound, ValidationError } from '../4-models/errors-model';
import VacationModel from '../4-models/vacation-model';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';

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
  //joi validation
  const errors = vacation.validatePost();
  if (errors) {
    throw new ValidationError(errors);
  }
  if (vacation.image) {
    const dotIndex = vacation.image.name.lastIndexOf('.');
    const imageExtension = vacation.image.name.substring(dotIndex);
    vacation.imageName = uuid() + imageExtension;
    await vacation.image.mv('./src/1-assets/images/' + vacation.imageName);

    //dont want to return the image
    delete vacation.image;
  }

  const { description, destination, startingDate, endingDate, price } = vacation;
  const sql = `
    INSERT INTO
    vacations (description, destination, imageName, startingDate, endingDate, price)
    VALUES('${description}', '${destination}', '${vacation.imageName}', '${startingDate}', '${endingDate}', ${price})
    `;
  const result: OkPacket = await dal.execute(sql);
  vacation.id = result.insertId;
  return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  console.log(vacation);

  const errors = vacation.validatePut();
  if (errors) {
    throw new ValidationError(errors);
  }

  const { id, description, destination, startingDate, endingDate, price } = vacation;

  if (vacation.image) {
    //delete old image from images folders
    const dotIndex = vacation.image.name.lastIndexOf('.');
    const imageExtension = vacation.image.name.substring(dotIndex);
    vacation.imageName = uuid() + imageExtension;
    await vacation.image.mv('./src/1-assets/images/' + vacation.imageName);

    //dont want to return the image
    delete vacation.image;
  }

  const sql = `
    UPDATE vacations
    SET 
    description = '${description}', 
    destination = '${destination}', 
    imageName = '${vacation.image}',
    startingDate = ${startingDate}, 
    endingDate = ${endingDate}, 
    price = ${price}
    WHERE id = ${id}
    `;
  const updatedVacation = await dal.execute(sql);

  return updatedVacation;
}

async function deleteVacation(id): Promise<VacationModel> {
  let sql = `
    DELETE FROM vacations
    WHERE id = ${id} 
    RETURNING *
    `;
  const deletedVacation = await dal.execute(sql);

  return deletedVacation[0];
}
export default { getAllVacations, getOneVacation, createVacation, updateVacation, deleteVacation };
