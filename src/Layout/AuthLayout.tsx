/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

//Types imports
type ChildrenProps = {
  children: React.ReactNode;
};
//Component imports
import useAuth from "@src/hooks/useAuth";

const AuthLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log("is login is herereere");
  console.log(isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  // Routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/search", "/experiences"];

  // Routes that require authentication (using startsWith for dynamic routes)
  const protectedRoutesPrefixes = [
    "/home",
    "/hourly",
    "/order",
    "/bookings",
    "/dashboard",
  ];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutesPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    console.log("Current pathname:", pathname);
    console.log("Is protected route:", isProtectedRoute);
    console.log("Is logged in:", isLoggedIn);

    // Redirect to search if not authenticated and trying to access protected route
    if (!isLoggedIn && isProtectedRoute) {
      router.push("/search");
      return;
    }

    // // Optional: Redirect authenticated users away from auth pages
    // if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    //   router.push("/home");
    //   return;
    // }
  }, [isLoggedIn, pathname, router, isProtectedRoute]);

  return <>{children}</>;
};

export default AuthLayout;
