import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../4-models/credentials-model';
import { UnauthorizedError } from '../4-models/errors-model';
import Role from '../4-models/role-model';
import UserModel from '../4-models/user-model';

async function register(user: UserModel): Promise<string> {
  const { firstName, lastName, username, password } = user;
  // Returns back token (JWT)

  // Set role:
  // user.role = Role.User;

  // Add to users collection:
  const sql = `
    INSERT INTO users
    (firstName, lastName, username, password)
    VALUES('${firstName}', '${lastName}', '${username}', '${password}')
`;
  const addedUser = await dal.execute(sql);

  // Generate token:
  const token = cyber.getNewToken(user);

  // Return the token:
  return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
  const { username, password } = credentials;
  // Check credentials:
  const sql = `
    SELECT * FROM users
    WHERE username = '${username}' AND password = '${password}';
`;
  const user = await dal.execute(sql);
  // If user not exist:
  if (!user) {
    throw new UnauthorizedError('Incorrect username or password');
  }

  // Generate token:
  const token = cyber.getNewToken(user);

  // Return the token:
  return token;
}

export default {
  register,
  login,
};
