class CredentialsModel {
  public username: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.username = credentials.username;
    this.password = credentials.password;
  }
}
//not sure if joi needed
export default CredentialsModel;
