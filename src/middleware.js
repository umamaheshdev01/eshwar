import { NextResponse } from 'next/server'

export function middleware(request) {
    // Get the origin from the request headers
    const allowedOrigins = [
        'https://your-frontend-domain.com',
        'http://localhost:3000'
    ]

    const origin = request.headers.get('origin')
    const response = NextResponse.next()

    // Add CORS headers
    response.headers.set(
        'Access-Control-Allow-Origin',
        allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
    )
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400')

    return response
}

// Configure which routes should be handled by the middleware
export const config = {
    matcher: '/api/:path*'
} 