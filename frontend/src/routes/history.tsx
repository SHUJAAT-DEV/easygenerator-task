import { createBrowserHistory } from 'history';
import {
  createElement,
  FC,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

interface HistoryRouterProps {
  history: typeof history;
  children: ReactElement;
}

export const HistoryRouter: FC<HistoryRouterProps> = ({
  history,
  children,
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    const unlisten = history.listen(({ location, action }: any) => {
      setState({ location, action });
    });
    // Cleanup the listener on component unmount
    return () => {
      unlisten();
    };
  }, [history]);

  return createElement(
    Router,
    Object.assign({ children, navigator: history }, state)
  );
};
