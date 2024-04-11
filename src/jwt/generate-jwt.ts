import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { env } from '../env';
import { logger } from '../logger';

config();

/**
 * @param id
 * @returns token
 * @throws error
 */

export const generateJwt = async (id: mongoose.Types.ObjectId | undefined) => {
  try {
    const token = jwt.sign(
      { id },
      env.SECRET_JWT || '075bc8899ea9f527b763ab37fceeff5f',
      {
        expiresIn: '1d',
      },
    );

    /*
        This token will be used to log the user into the system,
        without it, the user will not have access to resources
    */
    return token;
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Some error ocurred trying generate token',
    });
    throw error;
  }
};
