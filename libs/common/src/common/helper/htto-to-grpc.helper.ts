// statusConverter.ts (or wherever you want to put your helper)

/**
 * Maps a standard HTTP status code to its corresponding gRPC status code.
 *
 * @param httpStatus The HTTP status code (e.g., 404).
 * @returns The gRPC status code (e.g., 5 for NOT_FOUND), defaulting to 2 (UNKNOWN) if no direct mapping exists.
 */
export function httpToGrpcStatus(httpStatus: number): number {
  const statusMap: Record<number, number> = {
    // 2xx Success -> gRPC OK (0)
    200: 0,
    201: 0,

    // 4xx Client Errors -> Various gRPC errors
    400: 3, // INVALID_ARGUMENT
    401: 16, // UNAUTHENTICATED
    403: 7, // PERMISSION_DENIED
    404: 5, // NOT_FOUND
    408: 4, // DEADLINE_EXCEEDED
    409: 6, // ALREADY_EXISTS
    429: 8, // RESOURCE_EXHAUSTED

    // 5xx Server Errors -> Various gRPC errors
    500: 13, // INTERNAL
    501: 12, // UNIMPLEMENTED
    503: 14, // UNAVAILABLE
  };

  // The ?? operator returns the right-hand operand when the left-hand operand is null or undefined.
  // This correctly defaults to gRPC UNKNOWN (2) if the status is not in the map.
  return statusMap[httpStatus] ?? 2; // Default to UNKNOWN (2)
}
