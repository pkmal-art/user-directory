'use client';
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import './globals.css';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/users/")) {
      NProgress.start();
      return () => {
        NProgress.done();
      };
    }
  }, [pathname]);
  
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
};