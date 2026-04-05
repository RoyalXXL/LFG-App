import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/features/posts/services/post.service';
import { PrismaPostRepository } from '@/features/posts/repositories/post.repository';
import { ApiResponse } from '@/shared/types/api';

const service = new PostService(new PrismaPostRepository());

export async function GET(request: NextRequest) {
  const game = request.nextUrl.searchParams.get('game');
  if (!game) return NextResponse.json({ ok: false, error: 'game query is required' } satisfies ApiResponse<never>, { status: 400 });
  const data = await service.listByGame(game);
  return NextResponse.json({ ok: true, data } satisfies ApiResponse<unknown>);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const data = await service.create('demo-user-id', payload);
  return NextResponse.json({ ok: true, data } satisfies ApiResponse<{ id: string }>, { status: 201 });
}