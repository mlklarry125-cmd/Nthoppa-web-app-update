import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest): Promise<{ data: T; error: NextResponse | null }> => {
    try {
      const body = await request.json();
      const validated = schema.parse(body);
      return { data: validated, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        console.error('Validation errors:', errors);
        return {
          data: null as any,
          error: NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 }),
        };
      }
      return {
        data: null as any,
        error: NextResponse.json({ error: 'Invalid request body' }, { status: 400 }),
      };
    }
  };
}