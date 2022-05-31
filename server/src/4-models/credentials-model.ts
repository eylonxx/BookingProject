class CredentialsModel {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.firstName = credentials.firstName;
    this.lastName = credentials.lastName;
    this.email = credentials.email;
    this.password = credentials.password;
  }
}

export default CredentialsModel;
