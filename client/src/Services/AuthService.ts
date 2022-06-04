import axios from 'axios';
import UserModel from '../Models/userModel';

class AuthService {
  //register
  public async Register(user: UserModel): Promise<void> {
    const response = await axios.post<string>('http://localhost:3001/register', user);
    const token = response.data;
  }
  //login
  //logout
  //isloggedin
}
const authService = new AuthService();
export default authService;
