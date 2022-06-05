import axios from 'axios';
import UserModel from '../Models/userModel';
import CredentialsModel from '../Models/credentialsModel';
import store from '../Redux/Store';
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';

class AuthService {
  //register
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>('http://localhost:3001/register', user);
    const token = response.data;
    store.dispatch(registerAction(token));
    //save token to redux, login right after registration
  }
  //login
  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>('http://localhost:3001/login', credentials);
    const token = response.data;
    store.dispatch(loginAction(token));
    //save token to redux
  }
  //logout
  public async logout() {
    store.dispatch(logoutAction());
  }
  //get token, find user, remove token from redux

  //isloggedin
  public isLoggedIn(): boolean {
    return store.getState().authState.user !== null;
  }
  //get token, verify token, used for redux
}
const authService = new AuthService();
export default authService;
