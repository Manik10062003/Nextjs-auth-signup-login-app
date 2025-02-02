import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicpath = path ==="/login" || path === "/signup" || path === "/verifyemail" || path === "/";

    const token = request.cookies.get('token')?.value || '' ;

    if(publicpath && token){
        return NextResponse.redirect(new URL("/profile" , request.nextUrl));

}
if(!publicpath && !token){
    return NextResponse.redirect(new URL("/login" ,request.nextUrl))
}
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile', 
    '/verifyemail',
  ]
};
 