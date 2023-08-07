import { headersForAPIRoute } from '@/shared/utils';
import { type NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  const headers = headersForAPIRoute(request);

  return NextResponse.json(
    {},
    {
      headers,
    }
  );
}
