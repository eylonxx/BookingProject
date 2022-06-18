import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../4-models/credentials-model';
import { UnauthorizedError, ValidationError } from '../4-models/errors-model';
import Role from '../4-models/role-model';
import UserModel from '../4-models/user-model';

async function register(user: UserModel): Promise<string> {
  const errors = user.validatePost();
  if (errors) {
    throw new ValidationError(errors);
  }
  const { firstName, lastName, username, password } = user;
  // Returns back token (JWT)

  // Set role:
  user.role = Role.User;

  //hash and salt
  user.password = cyber.hashPassword(password);

  // Add to users collection:
  let sql = `
    INSERT INTO users
    (firstName, lastName, username, password, role)
    VALUES('${firstName}', '${lastName}', '${username}', '${user.password}', '${user.role}') 
    `;

  await dal.execute(sql);
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
    WHERE username = '${username}' AND password = '${credentials.password}';
`;

  const users = await dal.execute(sql);

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
