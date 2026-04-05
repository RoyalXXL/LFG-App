import { NextRequest, NextResponse } from 'next/server';
import { GameService } from '@/features/games/services/game.service';
import { PrismaGameRepository } from '@/features/games/repositories/game.repository';
import { ApiResponse } from '@/shared/types/api';

const service = new GameService(new PrismaGameRepository());

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');
  const data = query ? await service.search(query) : await service.trending();
  return NextResponse.json({ ok: true, data } satisfies ApiResponse<unknown>);
}