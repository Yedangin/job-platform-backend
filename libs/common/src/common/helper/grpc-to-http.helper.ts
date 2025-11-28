import { HttpStatus } from '@nestjs/common';

/**
 * Maps gRPC status codes to HTTP status codes
 * @param grpcCode - The gRPC status code
 * @returns The corresponding HTTP status code
 */
export const grpcToHttpStatus = (grpcCode: number): number => {
  const statusMap: Record<number, number> = {
    0: HttpStatus.OK, // OK
    1: HttpStatus.INTERNAL_SERVER_ERROR, // CANCELLED
    2: HttpStatus.INTERNAL_SERVER_ERROR, // UNKNOWN
    3: HttpStatus.BAD_REQUEST, // INVALID_ARGUMENT
    4: HttpStatus.GATEWAY_TIMEOUT, // DEADLINE_EXCEEDED
    5: HttpStatus.NOT_FOUND, // NOT_FOUND
    6: HttpStatus.CONFLICT, // ALREADY_EXISTS
    7: HttpStatus.FORBIDDEN, // PERMISSION_DENIED
    8: HttpStatus.TOO_MANY_REQUESTS, // RESOURCE_EXHAUSTED
    9: HttpStatus.BAD_REQUEST, // FAILED_PRECONDITION
    10: HttpStatus.CONFLICT, // ABORTED
    11: HttpStatus.BAD_REQUEST, // OUT_OF_RANGE
    12: HttpStatus.NOT_IMPLEMENTED, // UNIMPLEMENTED
    13: HttpStatus.INTERNAL_SERVER_ERROR, // INTERNAL
    14: HttpStatus.SERVICE_UNAVAILABLE, // UNAVAILABLE
    15: HttpStatus.INTERNAL_SERVER_ERROR, // DATA_LOSS
    16: HttpStatus.UNAUTHORIZED, // UNAUTHENTICATED
  };
  return statusMap[grpcCode] ?? HttpStatus.INTERNAL_SERVER_ERROR;
};
