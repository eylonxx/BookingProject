import axios from 'axios';
import UserModel from '../Models/userModel';
import CredentialsModel from '../Models/credentialsModel';

class AuthService {
  //register
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>('http://localhost:3001/register', user);
    const token = response.data;
  }
  //login
  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>('http://localhost:3001/login', credentials);
    const token = response.data;
  }
  //logout
  //isloggedin
}
const authService = new AuthService();
export default authService;
