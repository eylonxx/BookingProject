import jwtDecode from 'jwt-decode';
import UserModel from '../Models/userModel';

// Auth State - The global state related to Auth:
export class AuthState {
  public user: UserModel = null;
  public token: string = null;
  public isLoggedIn: boolean = false;
}

// Auth Action Type - list of actions we can do on the above AuthState:
export enum AuthActionType {
  Register = 'Register',
  Login = 'Login',
  Logout = 'Logout',
  Relog = 'Relog',
}

// Product Action - interface for building a single action from the above AuthActionType
export interface AuthAction {
  type: AuthActionType; // The type of the acton to perform.
  payload?: any; // The data we need to do that action
}

// Action Creators - Functions for creating suitable Action objects:
export function registerAction(token: string): AuthAction {
  const action: AuthAction = { type: AuthActionType.Register, payload: token };
  return action;
}
export function loginAction(token: string): AuthAction {
  const action: AuthAction = { type: AuthActionType.Login, payload: token };
  return action;
}
export function logoutAction(): AuthAction {
  const action: AuthAction = { type: AuthActionType.Logout };
  return action;
}
export function RelogAction(user: UserModel, token: string): AuthAction {
  const action: AuthAction = { type: AuthActionType.Relog, payload: { user, token } };
  return action;
}

// Auth Reducer - Do any of the above actions:
export function AuthReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login:
      const token = action.payload;
      newState.token = token;
      newState.user = (jwtDecode(token) as any).user;
      newState.isLoggedIn = true;
      break;
    case AuthActionType.Relog:
      // relogging on refresh action
      newState.user = action.payload.user;
      newState.token = action.payload.token;
      newState.isLoggedIn = true;
      break;
    case AuthActionType.Logout:
      newState.user = null;
      newState.token = null;
      newState.isLoggedIn = false;
      break;
  }
  return newState;
}
