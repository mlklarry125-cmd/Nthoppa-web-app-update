export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return {
      status: error.statusCode,
      body: { error: error.message, details: error.details },
    };
  }
  
  console.error('Unhandled API error:', error);
  return {
    status: 500,
    body: { error: 'Internal server error' },
  };
}