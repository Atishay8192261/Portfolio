import { NextRequest, NextResponse } from 'next/server';
import handler from '@/lib/chatgpt';

export async function POST(req: NextRequest) {
  return await handler(req, NextResponse);
}
