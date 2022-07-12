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
  public sqlUser = 'b1784a4ac0446a';
  public sqlPassword = '68d3d83f';
  public sqlDatabase = 'heroku_a50491fa91e7abc';
}

// Connection String
// mysql://b1784a4ac0446a:68d3d83f@eu-cdbr-west-03.cleardb.net/heroku_a50491fa91e7abc?reconnect=true

mysql: const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();

export default config;
