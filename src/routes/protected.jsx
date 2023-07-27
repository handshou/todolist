import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/MyProviders";

export default function ProtectedApp() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // useEffect(() => {
  //   const user = localStorage.getItem("auth");
  //   if (!auth && user) setAuth(user);
  // }, [auth, setAuth]);

  const user = localStorage.getItem("auth");

  useEffect(() => {
    if (!user) navigate("login");
  }, [user, navigate]);

  if (!user) return;

  return (
    <>
      <Outlet />
    </>
  );
}
