import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES } from "./routes/routes";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
