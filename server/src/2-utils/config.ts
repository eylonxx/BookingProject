class Config {
  public isDevelopment = process.env.NODE_ENV === 'development';
  public isProduction = process.env.NODE_ENV === 'production';
  public port = 0;
  public sqlHost = '';
  public sqlUser = '';
  public sqlPassword = '';
  public sqlDatabase = '';
}

class DevelopmentConfig extends Config {
  public port = 3001;
  public sqlHost = 'localhost';
  public sqlUser = 'root';
  public sqlPassword = '';
  public sqlDatabase = 'booking';
}

class ProductionConfig extends Config {
  public port = +process.env.PORT; // Will be set by the cloud
  public sqlHost = 'eu-cdbr-west-03.cleardb.net';
  public sqlUser = 'bf4dde671cdab9';
  public sqlPassword = '4dbc3b0d';
  public sqlDatabase = 'heroku_fa919691a77cc5c';
}

// Connection String
//mysql://bf4dde671cdab9:4dbc3b0d@eu-cdbr-west-03.cleardb.net/heroku_fa919691a77cc5c?reconnect=true

mysql: const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();

export default config;
