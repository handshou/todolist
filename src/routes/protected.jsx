import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedApp() {
  const navigate = useNavigate();

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
