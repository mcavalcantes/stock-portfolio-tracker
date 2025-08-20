import { Login } from "../pages/login";
import { SignUp } from "../pages/sign-up";
import { Dashboard } from "../pages/dashboard";

export const ROUTES: {
  path: string;
  element: React.JSX.Element;
}[] = [
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/dashboard", element: <Dashboard /> },
];
