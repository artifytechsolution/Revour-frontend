"use client";

import ReduxProvider from "@src/redux/reduxProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthLayout from "./AuthLayout";
import Header from "@src/component/components/Header";
import Footer from "@src/component/components/Footer";
import MobileFooter from "@src/component/components/MobileFooter";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [router]);

  useEffect(() => {
    // This code runs only in the browser
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 425);
      };

      checkScreenSize(); // initial check
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ReduxProvider>
      <Header />
      <QueryClientProvider client={queryClient}>
        <AuthLayout>{children}</AuthLayout>
      </QueryClientProvider>
      {isMobile ? <MobileFooter /> : <Footer />}
    </ReduxProvider>
  );
};

export default MainLayout;
