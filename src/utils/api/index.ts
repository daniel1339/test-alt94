import { NextResponse } from 'next/server';

/**
 * Standardized success response
 */
export function successResponse(
  data: unknown, 
  message?: string, 
  additionalFields?: Record<string, unknown>
) {
  return NextResponse.json({
    success: true,
    data,
    message: message || 'Success',
    timestamp: new Date().toISOString(),
    ...additionalFields
  });
}

/**
 * Standardized error response
 */
export function errorResponse(
  message: string, 
  status: number = 500,
  additionalFields?: Record<string, unknown>
) {
  return NextResponse.json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    ...additionalFields
  }, { status });
}

/**
 * Common error responses
 */
export const ApiErrors = {
  badRequest: (message: string) => errorResponse(message, 400),
  notFound: (message: string) => errorResponse(message, 404),
  internalError: (message: string = 'Internal server error') => errorResponse(message, 500),
  invalidId: (entity: string = 'ID') => errorResponse(`Invalid ${entity}. Must be a number.`, 400),
  notFoundById: (entity: string, id: number) => errorResponse(`${entity} with ID ${id} not found`, 404)
}; 