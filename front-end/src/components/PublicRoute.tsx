import { type ReactNode } from "react";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = (): boolean => {
    const cookies = document.cookie.split("; ");
    return cookies.some((cookie) => cookie.startsWith("user="));
  };

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
