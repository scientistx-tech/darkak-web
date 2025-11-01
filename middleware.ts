import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Call your API to check if URL exists in DB
  const res = await fetch(`https://api.darkak.com.bd/api/public/urls/check?path=${pathname}`);
  if (res.ok) {
    const data = await res.json();
    if (data?.new_url) {
      return NextResponse.redirect(new URL(data.new_url, req.url));
    }
  }

  return NextResponse.next(); // continue normally if no redirect
}

// Match all routes
export const config = {
  matcher: '/:path*',
};
