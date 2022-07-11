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
  public sqlUser = 'b99fdda40283ce';
  public sqlPassword = 'd5969333';
  public sqlDatabase = 'heroku_c751b26191864f0';
}

// Connection String
// mysql://b99fdda40283ce:d5969333@eu-cdbr-west-03.cleardb.net/heroku_c751b26191864f0?reconnect=true

mysql: const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();

export default config;
