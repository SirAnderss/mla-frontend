import { type NextRequest } from 'next/server';
import { corsHeaders } from '@/shared/constants/global';

/**
 *
 * @param request NextRequest
 * @description This function is used to set the CORS headers for API routes to avoid CORS errors
 * @returns Record<string, string>
 */
export function headersForAPIRoute(
  request: NextRequest
): Record<string, string> {
  const negotiatorHeaders: Record<string, string> = {};

  // Set request headers to and object for easier access
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  return {
    ...corsHeaders,
    'Access-Control-Allow-Origin': negotiatorHeaders['x-forwarded-host'],
  };
}
