import crypto from 'crypto';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../4-models/errors-model';
import Role from '../4-models/role-model';
import UserModel from '../4-models/user-model';

const secret = 'sodgarua';
const salt = 'badsalt';

function getNewToken(user: UserModel): string {
  // Object to stash inside the token:
  const payload = { user };

  // Generate new token:
  const token = jwt.sign(payload, secret, { expiresIn: '3h' }); // expire in 3 hours

  // Return token:
  return token;
}

function verifyToken(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    // Extract token header (authorization: Bearer the-token):
    const header = request.headers.authorization;

    // If no such header sent:
    if (!header) {
      reject(new UnauthorizedError('No token sent at all'));
      return;
    }

    // Extract the token:
    // "Bearer the-token"
    //         ^
    //  01234567
    const token = header.substring(7);

    // If no token sent:
    if (!token) {
      reject(new UnauthorizedError('No token sent'));
      return;
    }

    // Here we have some token
    jwt.verify(token, secret, (err, payload) => {
      // If token invalid or expired:
      if (err) {
        reject(new UnauthorizedError('Invalid or expired token'));
        return;
      }

      resolve(true);
    });
  });
}

function getTokenRole(req: Request): Role {
  // Extract token header (authorization: Bearer the-token):
  const header = req.headers.authorization;

  // Extract the token:
  const token = header.substring(7);

  // Extract payload:
  const payload = jwt.decode(token);

  // Extract user:
  const user = (payload as any).user;

  // return role:

  return user.role;
}

function hashPassword(plainText: string): string {
  const hashText = crypto.createHmac('sha512', salt).update(plainText).digest('hex');

  return hashText;
}

export default {
  getNewToken,
  verifyToken,
  getTokenRole,
  hashPassword,
};
