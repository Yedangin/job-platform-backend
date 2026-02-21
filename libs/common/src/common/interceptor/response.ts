// import { FastifyReply } from 'fastify';

type SuccessResponse = {
  error: boolean;
  authorized: boolean;
  message: string | string[] | null | undefined;
  data?: {} | [];
  meta?: {};
};

type SuccessResponseOptions = {
  res?: any;
  message?: string | string[] | null | undefined;
  data?: {} | [];
  extra?: {};
};

export const successResponse = (
  options: SuccessResponseOptions,
): SuccessResponse | undefined => {
  const response = {
    error: false,
    authorized: true,
    message: options.message,
  };

  if (options.data != null) {
    response['data'] = options.data;
  }

  if (options.extra != null) {
    response['meta'] = options.extra;
  }

  if (options.res == null) {
    return response;
  } else {
    options.res.send(response);
  }
};

type ErrorResponseOptions = {
  statusCode: number;
  message: string | string[] | null | undefined;
  res?: any;
  authorized?: boolean;
  data?: {};
};

type ErrorResponse = {
  authorized: boolean;
  error: boolean;
  message: string | string[] | null | undefined;
  data?: {};
};

// export const errorResponse = (
//   options: ErrorResponseOptions,
// ): ErrorResponse | undefined => {
//   const response = {
//     error: true,
//     authorized: options.authorized ?? true,
//     message: options.message,
//   };
//   if (options.res == null) {
//     return response;
//   } else {
//     options.res.send(response);
//   }
// };

export const errorResponse = (
  options: ErrorResponseOptions,
): void | ErrorResponse => {
  const response = {
    error: true,
    authorized: options.authorized ?? true,
    message: options.message,
  };

  if (!options.res) {
    // If no response object is provided, return the error object
    return response;
  } else {
    const statusCode = options.statusCode ?? 400; // Default to HTTP 400 Bad Request
    // Send the response using FastifyReply
    options.res.status(statusCode).send(response);
  }
};
