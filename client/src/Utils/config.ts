class Config {
  public vacationsUrl = '';
  public loginUrl = '';
  public registerUrl = '';
  public followUrl = '';
  public unfollowUrl = '';
  public getAllFollowedVacs = '';
}

class DevelopmentConfig extends Config {
  public vacationsUrl = 'http://localhost:3001/api/vacations/';
  public loginUrl = 'http://localhost:3001/auth/login';
  public registerUrl = 'http://localhost:3001/auth/register';
  public followUrl = 'http://localhost:3001/api/follow';
  public unfollowUrl = 'http://localhost:3001/api/unfollow';
  public getAllFollowedVacs = 'http://localhost:3001/api/follow';
}

class ProductionConfig extends Config {
  public vacationsUrl = 'https://eylon-booking.herokuapp.com/api/vacations/';
  public loginUrl = 'https://eylon-booking.herokuapp.com/auth/login';
  public registerUrl = 'https://eylon-booking.herokuapp.com/auth/register';
  public followUrl = 'https://eylon-booking.herokuapp.com/api/follow';
  public unfollowUrl = 'https://eylon-booking.herokuapp.com/api/unfollow';
  public getAllFollowedVacs = 'https://eylon-booking.herokuapp.com/api/follow';
}
const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();

export default config;
