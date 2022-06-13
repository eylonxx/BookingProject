import Joi from 'joi';
import { UploadedFile } from 'express-fileupload';

class VacationModel {
  public id: number;
  public description: string;
  public destination: string;
  public imageName: string;
  public image: UploadedFile;
  public startingDate: string;
  public endingDate: string;
  public price: number;
  public followers: number;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.description = vacation.description;
    this.destination = vacation.destination;
    this.imageName = vacation.imageName;
    this.image = vacation.image;
    this.startingDate = vacation.startingDate;
    this.endingDate = vacation.endingDate;
    this.price = vacation.price;
    this.followers = vacation.followers;
  }

  public static postValidationSchema = Joi.object({
    id: Joi.forbidden(),
    description: Joi.string().required(),
    destination: Joi.string().required(),
    imageName: Joi.string().optional().min(10).max(50),
    image: Joi.object().optional(),
    startingDate: Joi.string().required(),
    endingDate: Joi.string().required(),
    price: Joi.number().required().positive().min(0).max(100000),
    followers: Joi.number().optional().positive(),
  });
  //put validate schema

  public static putValidationSchema = Joi.object({
    id: Joi.forbidden(),
    description: Joi.string().required(),
    destination: Joi.string().required(),
    imageName: Joi.string().optional().min(10).max(50),
    image: Joi.object().optional(),
    startingDate: Joi.string().required(),
    endingDate: Joi.string().required(),
    price: Joi.number().required().positive().min(0).max(100000),
    followers: Joi.number().optional().positive(),
  });

  public validatePost(): string {
    const result = VacationModel.postValidationSchema.validate(this);
    return result.error?.message;
  }

  public validatePut(): string {
    const result = VacationModel.putValidationSchema.validate(this);
    return result.error?.message;
  }
}
//add joi
export default VacationModel;
