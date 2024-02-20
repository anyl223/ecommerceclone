// import { useUserStore } from "@/stores/user-store";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const NO_HEADER_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = new Set(["/login", "/register"]);
const DEFAULT_PUBLIC_ROUTE = "/login";

const isProtectedRoute = (route: string) => !PUBLIC_ROUTES.has(route);

function Layout({ children }: any) {
  const router = useRouter();
//   const token = useUserStore.use.token();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/login");
    }
  });

  return (
    
      <div className="flex flex-column w-100 h-100 ">
        {!NO_HEADER_ROUTES.includes(router.pathname) && <Header />}
        <div
          style={{
            marginTop: isProtectedRoute(router.asPath) ? "4rem" : "0rem",
            marginBottom: isProtectedRoute(router.asPath) ? "2rem" : "0rem",
          }}
        >
          {children}
        </div>
        {!NO_HEADER_ROUTES.includes(router.pathname) && <Footer/>}
      </div>
    
  );
}

export default Layout;
