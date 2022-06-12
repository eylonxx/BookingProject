import config from '../Utils/config';
import axios from 'axios';

class FollowersService {
  public async follow(vacationId: number, userId: number) {
    await axios.post(config.followUrl, { vacationId, userId });
  }
  public async unfollow(vacationId: number, userId: number) {
    await axios.post(config.unfollowUrl, { vacationId, userId });
  }
}
const followersService = new FollowersService();
export default followersService;
