import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'


const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password']
const privatePaths = ['/dashboard', '/profile', '/setting', 'company']

const isPublicPath = (path: string) => {
    return publicPaths.some(publicPath => path.startsWith(publicPath))
}

const isPrivatePath = (path: string) => {
    return privatePaths.some(privatePath => path.startsWith(privatePath))
}


const verifyToken = (request: NextRequest) => {
    const token = request.cookies.get('jobPilotAuth')?.value

    if (!token) return false

    // Here you would typically verify the token with your backend
    // For now, we'll just check if it exists
    return true
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl



    // Allow access to static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    // Check if the path is public
    if (isPublicPath(pathname)) {
        // If user is already authenticated and trying to access login/register, redirect to dashboard
        if (verifyToken(request)) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        // Allow access to public paths
        return NextResponse.next()
    }

    // Check if the path is private
    if (isPrivatePath(pathname)) {
        // If user is not authenticated, redirect to login
        if (!verifyToken(request)) {
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
        }
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}