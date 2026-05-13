import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const coockie = document.cookie;
    if (coockie) {
      const coockies = coockie.split("; ");
      const userCookie = coockies.find((cookie) => cookie.startsWith("user="));
      if (userCookie) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);
  return <div>{children}</div>;
};

export default PublicRoute;
