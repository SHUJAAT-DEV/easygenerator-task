import { Suspense } from "react";
import RenderRouter from "./routes";
import { HistoryRouter, history } from "@/routes/history";


const App: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={null}>
        <RenderRouter />
      </Suspense>
    </HistoryRouter>
  );
};

export default App;
