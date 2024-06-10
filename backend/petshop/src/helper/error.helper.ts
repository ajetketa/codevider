import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const errorWrapper = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException();
  }
};
