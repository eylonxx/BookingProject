import mysql from 'mysql';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booking',
});

function execute(sql: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export default { execute };
