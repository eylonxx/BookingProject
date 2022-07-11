import Role from './role-model';
import Joi from 'joi';

class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public role: Role;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }
  // JOI VALIDATION
  public static postValidationSchema = Joi.object({
    id: Joi.forbidden(),
    firstName: Joi.string().required().min(2).max(16),
    lastName: Joi.string().required().min(2).max(16),
    username: Joi.string().required().min(4).max(16),
    password: Joi.string().required().min(4).max(16),
    role: Joi.string(),
  });

  public validatePost(): string {
    const result = UserModel.postValidationSchema.validate(this);
    return result.error?.message;
  }
}
export default UserModel;
