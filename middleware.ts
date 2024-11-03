import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/organization(.*)',
  '/organization/:organizationId/settings/(.*)',
  '/board(.*)',
  '/select-org',
  '/api/cards(.*)'
])



export default clerkMiddleware((auth,req,event)=>{
  if(!auth().userId && isProtectedRoute(req)){
    return auth().redirectToSignIn({returnBackUrl:req.url})
  } 
  
  if(auth().userId && !isProtectedRoute(req)){
    let path : string = '/select-org'

    if( auth().orgId){
      path = `/organization/${auth().orgId}`
    }
    return NextResponse.redirect(new URL(path, req.url))
  }

  if(auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org" ){
    return NextResponse.redirect(new URL('/select-org', req.url))
  }


});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
