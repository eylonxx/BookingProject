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

  // Add to users collection:
  const sql = `
    INSERT INTO users
    (firstName, lastName, username, password, role)
    VALUES('${firstName}', '${lastName}', '${username}', '${password}', '${user.role}')
`;
  const addedUser = await dal.execute(sql);

  // Generate token:
  const token = cyber.getNewToken(addedUser);

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
  console.log(user);

  // If user not exist:
  if (user.length < 1) {
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
