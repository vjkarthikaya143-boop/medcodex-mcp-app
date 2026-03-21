import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define Protected Routes
  const isWorkspaceRoute = request.nextUrl.pathname.startsWith('/workspace');
  const isLmsRoute = request.nextUrl.pathname.startsWith('/lms');
  
  // Fake JWT token check (mock for Phase 3)
  const token = request.cookies.get('auth_token')?.value || '';
  const userMode = request.cookies.get('role')?.value || 'STUDENT'; // "STUDENT" (Left Mode) vs "CODER" (Right Mode)

  if (isWorkspaceRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Left vs Right Auth mode enforcement
  if (isWorkspaceRoute && userMode === 'STUDENT') {
    // Students can't access production workspace
    return NextResponse.redirect(new URL('/lms/upgrade', request.url));
  }

  if (isLmsRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/workspace/:path*', '/lms/:path*', '/analytics/:path*'],
};
