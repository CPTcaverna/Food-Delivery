import { Link, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Plus, Box, LayoutDashboard } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_URL_BACK + "/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleAuthUser = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL_BACK + "/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        return;
      }
    };
    handleAuthUser();
  }, [setUser]);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded border";

    if (location.pathname === path) {
      return `${baseClass} bg-[#F2DAAC] text-[#161410]`;
    } else {
      return baseClass;
    }
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-187.5 md:p-0">
        <Link to="/">
          <img src="logo.png" alt="" />
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-8 text-white">
              <div className="flex gap-1 text-[#F2DAAC]">
                <Link to={"/"}>
                  <div className={getNavItemClass("/")}>
                    <Box size={20} />
                  </div>
                </Link>
                <Link to={"/Pedidos"}>
                  <div className={getNavItemClass("/Pedidos")}>
                    <LayoutDashboard size={20} />
                  </div>
                </Link>
                <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded border">
                  <Plus size={20} />
                </div>
              </div>
              <div className="relative cursor-pointer">
                <ShoppingCart size={18} />
                <p className="absolute -top-4 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] p-1 text-sm text-[#161410]">
                  1{" "}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p>{user.name}</p>
                <LogOut
                  size={18}
                  className="cursor-pointer"
                  onClick={handleLogout}
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-md bg-[#F2DAAC] font-bold">
                Entrar
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
