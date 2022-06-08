import Role from './role-model';

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
}
//add joi
export default UserModel;
