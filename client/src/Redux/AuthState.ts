import jwtDecode from 'jwt-decode';
import UserModel from '../Models/userModel';

// 1. Auth State - The global state relate to Auth:
export class AuthState {
  public user: UserModel = null;
  public token: string = null;
}

// 2. Auth Action Type - list of actions we can do on the above AuthState:
export enum AuthActionType {
  Register = 'Register',
  Login = 'Login',
  Logout = 'Logout',
}

// 3. Product Action - interface for building a single action from the above AuthActionType
export interface AuthAction {
  type: AuthActionType; // The type of the acton to perform.
  payload?: string; // The data we need to do that action
}

// 4. Action Creators - Functions for creating suitable Action objects:
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

// 5. Auth Reducer - Do any of the above actions:
export function AuthReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login:
      const token = action.payload;
      newState.token = token;
      newState.user = (jwtDecode(token) as any).user[0];

      break;
    case AuthActionType.Logout:
      newState.user = null;
      newState.token = null;
      break;
  }
  return newState;
}
