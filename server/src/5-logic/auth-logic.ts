import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../4-models/credentials-model';
import { UnauthorizedError, ValidationError } from '../4-models/errors-model';
import Role from '../4-models/role-model';
import UserModel from '../4-models/user-model';

async function checkUsername(username: string): Promise<boolean> {
  const sql = `
  SELECT username
  FROM users
  WHERE username = ?
  `;
  const users = await dal.execute(sql, [username]);
  return users.length > 0;
}

async function register(user: UserModel): Promise<string> {
  const errors = user.validatePost();
  if (errors) {
    throw new ValidationError(errors);
  }

  if (await checkUsername(user.username)) {
    throw new ValidationError(`${user.username}' already exists`);
  }
  const { firstName, lastName, username, password } = user;
  user.role = Role.User;
  user.password = cyber.hashPassword(password);
  let sql = `
    INSERT INTO users
    (firstName, lastName, username, password, role)
    VALUES(?, ?, ?, ?, ?) 
    `;

  await dal.execute(sql, [firstName, lastName, username, user.password, user.role]);
  sql = `
  SELECT * FROM users
  WHERE id = LAST_INSERT_ID()`;
  const addedUsers = await dal.execute(sql);
  const addedUser = addedUsers[0];

  // Generate token:
  const token = cyber.getNewToken(addedUser);

  // Return the token:
  return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
  const { username, password } = credentials;

  credentials.password = cyber.hashPassword(credentials.password);

  // Check credentials:
  const sql = `
    SELECT * FROM users 
    WHERE username = ? AND password = ?;
`;

  const users = await dal.execute(sql, [username, credentials.password]);

  // If user not exist:
  if (users.length === 0) {
    throw new UnauthorizedError('Incorrect username or password');
  }
  const user = users[0];

  // Generate token:
  const token = cyber.getNewToken(user);

  // Return the token:
  return token;
}

export default {
  register,
  login,
};
