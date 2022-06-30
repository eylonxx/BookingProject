import VacationModel from '../Models/vacationModel';

// 1. Vacations State - The global state relate to Vacations:
export class VacationsState {
  public vacations: VacationModel[] = [];
}

// 2. Vacations Action Type - list of actions we can do on the above VacationsState:
export enum VacationsActionType {
  FetchVacations = 'FetchVacations',
  AddVacation = 'AddVacation',
  UpdateVacation = 'UpdateVacation',
  DeleteVacation = 'DeleteVacation',
  UpdateFollowing = 'UpdateFollowing',
  UpdateFollowVacation = 'UpdateFollowVacation',
  // AddVacationToCart = "AddVacationToCart"
}

// 3. Vacation Action - interface for building a single action from the above VacationsActionType
export interface VacationsAction {
  type: VacationsActionType; // The type of the acton to perform.
  payload: any; // The data we need to do that action
}

// 4. Action Creators - Functions for creating suitable Action objects:
export function fetchVacationsAction(Vacations: VacationModel[]): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: Vacations };
  return action;
}
export function addVacationAction(Vacation: VacationModel): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.AddVacation, payload: Vacation };
  return action;
}
export function updateVacationAction(Vacation: VacationModel): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: Vacation };
  return action;
}
export function deleteVacationAction(id: number): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: id };
  return action;
}
export function updateFollowingAction(ids: string[]): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.UpdateFollowing, payload: ids };
  return action;
}
export function updateFollowVacationAction(id: number): VacationsAction {
  const action: VacationsAction = { type: VacationsActionType.UpdateFollowVacation, payload: id };
  return action;
}
// 5. Vacations Reducer - Do any of the above actions:
export function VacationsReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.FetchVacations:
      newState.vacations = action.payload; // <-- here payload is all Vacations
      break;

    case VacationsActionType.AddVacation:
      newState.vacations.push(action.payload); // <-- here payload is the Vacation to add.
      break;

    case VacationsActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex((vac) => vac.id === action.payload.id); // <-- here payload is the Vacation to update.
      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = action.payload;
      }
      break;

    case VacationsActionType.DeleteVacation:
      newState.vacations = newState.vacations.filter((vac) => vac.id !== action.payload.id);
      break;

    case VacationsActionType.UpdateFollowing:
      const ids = action.payload.data.flatMap((obj: any) => obj.vacationId);

      newState.vacations = newState.vacations.map((vac) => {
        if (ids.includes(vac.id)) vac.isFollowed = true;
        return vac;
      });
      break;

    case VacationsActionType.UpdateFollowVacation:
      newState.vacations = newState.vacations.map((vac) => {
        if (vac.id === action.payload) {
          vac.isFollowed = !vac.isFollowed;
          vac.followers = vac.isFollowed === true ? vac.followers + 1 : vac.followers - 1;
        }
        return vac;
      });
      break;
  }
  return newState;
}
