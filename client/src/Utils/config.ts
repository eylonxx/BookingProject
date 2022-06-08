class Config {
  public vacationsUrl = '';
  public loginUrl = '';
  public registerUrl = '';
}

class DevelopmentConfig extends Config {
  public vacationsUrl = 'http://localhost:3001/api/vacations/';
  public loginUrl = 'http://localhost:3001/auth/login';
  public registerUrl = 'http://localhost:3001/auth/register';
}

class ProductionConfig extends Config {
  public vacationsUrl = 'http://localhost:3001/api/vacations/';
  public loginUrl = 'http://localhost:3001/auth/login';
  public registerUrl = 'http://localhost:3001/auth/register';
}
const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();

export default config;
