import { BaseError } from '../../../utils/baseError';
import jwt from 'jsonwebtoken';

export default function validateJwtToken(accessToken:string) {
  const secretKey = process.env.JWT_SECRETE_KEY;
  try {
    const decoded = jwt.verify(accessToken, secretKey!);
    return decoded;
  } catch (error) {
    throw new BaseError('Unauthorized', 403);
  }
}
