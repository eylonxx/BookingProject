import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../4-models/credentials-model';
import { UnauthorizedError } from '../4-models/errors-model';
import Role from '../4-models/role-model';
import UserModel from '../4-models/user-model';

async function register(user: UserModel): Promise<string> {
  // Returns back token (JWT)

  // Get all users:
  //some sql code

  // Generate id and role:
  //some sql code

  // Add to users collection:
  //some sql code

  // Save back to file:
  //some sql code

  // Generate token:
  const token = cyber.getNewToken(user);

  // Return the token:
  return token;
}

// async function login(credentials: CredentialsModel): Promise<string> {
//   //   credentials.email = credentials.email.toLowerCase();
//   // Joi Validation - השלימו בזמנכם הפנוי
//   // Get all users:
//   // server.use('/api', authController);
//   // Check credentials:
//   // server.use('/api', authController);
//   // If user not exist:
//   //   if (!user) {
//   //     throw new UnauthorizedError('Incorrect username or password');
//   //   }
//   // Generate token:
//   //   const token = cyber.getNewToken(user);
//   // Return the token:
//   //   return token;
// }

export default {
  register,
  //   login,
};
