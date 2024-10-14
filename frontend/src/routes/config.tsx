import { useEffect, type FC, type ReactElement } from "react";

import PrivateRoute from "./pravateRoute";

export interface WrapperRouteProps {
  titleId: string;
  auth?: boolean;
  element: ReactElement;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  titleId,
  auth,
  ...props
}) => {
  useEffect(() => {
    document.title = titleId;
  }, [titleId]);

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
