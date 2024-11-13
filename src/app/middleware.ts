import { NextResponse, NextRequest } from "next/server"; 
import { getToken } from "next-auth/jwt"; 

export async function middleware(req: NextRequest) { 
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if token exists. If not, redirect to login page.
  if (!token && req.url.includes("/dash-board")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: ["/dash-board"], // Protect the dash-board path
};
