import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma?.PrismaClientKnownRequestError, Prisma?.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const json = {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      data: 'Unprocessable Entity: Make sure that all params are correct (e.g. postId, userId, type)',
      timestamp: new Date().toISOString(),
    }

    console.debug(exception);
    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(json);
  }
}