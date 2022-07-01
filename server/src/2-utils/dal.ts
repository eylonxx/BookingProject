import mysql from 'mysql';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booking',
});

function execute(sql: string, values?: any) {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);

        return reject(err);
      }
      resolve(result);
    });
  });
}

export default { execute };
