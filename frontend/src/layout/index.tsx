// src/components/LayoutPage.tsx
import type { FC } from "react";

import { Suspense } from "react";
import { Outlet } from "react-router";
import ErrorBoundary from "@/components/ErrorBoundary";

const LayoutPage: FC = () => {
  return (
    <div className="">
      {/* here you can add your own header if requred <header > </header> */}
      <div>
        {/* e.g if we had side menu , drawer then can easily add here 
       just need to fetch menu from backend side , and render here ,
       e.g <SideMenu  ... />
        */}

        <ErrorBoundary fallback="Oops! Something went wrong">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default LayoutPage;
