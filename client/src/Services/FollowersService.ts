import config from '../Utils/config';
import axios from 'axios';
import store from '../Redux/Store';
import { updateFollowingAction } from '../Redux/VacationsState';

class FollowersService {
  public async follow(vacationId: number, userId: number) {
    await axios.post(config.followUrl, { vacationId, userId });
  }
  public async unfollow(vacationId: number, userId: number) {
    await axios.post(config.unfollowUrl, { vacationId, userId });
  }
  public async getAllFollowedVacationsByUserId(userId: number) {
    const vacs: string[] = await axios.get(config.getAllFollowedVacs + `/${userId}`);
    store.dispatch(updateFollowingAction(vacs));
    //update redux
  }
}
const followersService = new FollowersService();
export default followersService;
