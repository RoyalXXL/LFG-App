import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/shared/types/api';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? '';
  return NextResponse.json({ ok: true, data: { query, items: [] } } satisfies ApiResponse<{ query: string; items: unknown[] }>);
}