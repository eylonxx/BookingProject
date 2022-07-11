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
  public sqlUser = 'bf98c8d69dba80';
  public sqlPassword = '84dfb53f';
  public sqlDatabase = 'heroku_2d9cbe8338d257c';
}

// Connection String
//bf98c8d69dba80:84dfb53f@eu-cdbr-west-03.cleardb.net/heroku_2d9cbe8338d257c?reconnect=true

mysql: const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();

export default config;
