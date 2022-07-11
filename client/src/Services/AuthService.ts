import axios from 'axios';
import config from '../Utils/config';
import UserModel from '../Models/userModel';
import CredentialsModel from '../Models/credentialsModel';
import store from '../Redux/Store';
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import jwtDecode from 'jwt-decode';

class AuthService {
  //register
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(config.registerUrl, user);
    const token = response.data;
    window.sessionStorage.setItem('token', token);
    store.dispatch(registerAction(token));
    //save token to redux
  }
  //login
  public async login(credentials: CredentialsModel): Promise<UserModel> {
    const response = await axios.post(config.loginUrl, credentials);
    const token = response.data;
    const user = (jwtDecode(token) as any).user;
    window.sessionStorage.setItem('token', token);
    store.dispatch(loginAction(token));
    return user;
    //save token to redux, return user
  }
  //logout
  public async logout() {
    window.sessionStorage.removeItem('token');
    store.dispatch(logoutAction());
    //get token, find user, remove token from redux
  }

  //isloggedin
  public isLoggedIn(): boolean {
    return store.getState().authState.user !== null;
    //if user logged in or not
  }
}
const authService = new AuthService();
export default authService;
