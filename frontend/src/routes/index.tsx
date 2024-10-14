import type { RouteObject } from "react-router";
import { lazy, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./config";
import LayoutPage from "@/layout";

const NotFound = lazy(() => import("@/pages/404"));
const LoginPage = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));

// Default public routes
const defaultPublicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
    ),
  },
  {
    path: "/register",
    element: (
      <WrapperRouteComponent element={<SignUp />} titleId="title.register" />
    ),
  },
];

// Interface for menu data
interface MenuItem {
  code: string;
  icon: string;
  path: string;
}

const componentMap: Record<string, any> = {
  "/home": lazy(() => import("@/pages/home/Home")),
};

const RenderRouter = () => {
  const [routerList, setRouterList] =
    useState<RouteObject[]>(defaultPublicRoutes);

  // Simulate fetching menu items from an API
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Simulate API call to get the menu
    const fetchMenu = async () => {
      const apiMenu = [
        {
          code: "home",
          icon: "home",
          path: "/home",
        },
      ];
      setMenuData(apiMenu); // Replace this with your actual API call
    };

    fetchMenu();
  }, []);

  const generateProtectedRoutesFromMenu = (menu: MenuItem[]): RouteObject[] => {
    return menu.map((menuItem) => {
      const LazyComponent =
        componentMap[menuItem.path] || lazy(() => import("@/pages/404"));
      return {
        path: menuItem.path,
        element: (
          <WrapperRouteComponent
            auth
            element={<LazyComponent />}
            titleId={`title.${menuItem.code}`}
          />
        ),
      };
    });
  };

  const computedRoutes = useMemo(() => {
    const dynamicProtectedRoutes = generateProtectedRoutesFromMenu(menuData);
    return [
      {
        path: "/",
        element: (
          <WrapperRouteComponent auth element={<LayoutPage />} titleId="" />
        ),
        children: [
          {
            path: "",
            element: <Navigate to="home" />,
          },
          ...dynamicProtectedRoutes,
          {
            path: "*",
            element: (
              <WrapperRouteComponent
                auth
                element={<NotFound />}
                titleId="title.notFound"
              />
            ),
          },
        ],
      },
      ...defaultPublicRoutes, // Include public routes outside LayoutPage
    ];
  }, [menuData]);

  useEffect(() => {
    setRouterList(computedRoutes);
  }, [computedRoutes]);

  // Provide a fallback if no routes are available
  const list =
    routerList.length > 0
      ? routerList
      : [{ path: "*", element: <label>Loading...</label> }];

  return useRoutes(list);
};

export default RenderRouter;
