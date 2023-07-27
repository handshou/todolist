import { useState, useContext } from "react";
import { Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import CredentialsForm from "../components/CredentialsForm";
import { AuthContext } from "../context/MyProviders";
import { signIn } from "../utils/auth/signIn";

export default function Login() {
  const navigate = useNavigate();

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const LeftStack = () => (
    <Link to="/register">
      <Text sx={{ textDecoration: "none", color: "blue" }}>Register</Text>
    </Link>
  );

  const callback = async (values) => {
    setIsEmailError(false);
    setIsPasswordError(false);
    setIsLoading(true);
    const { errorCode, errorMessage, user } = await signIn(
      values.email,
      values.password
    );
    setIsLoading(false);

    if (user && user.accessToken) {
      localStorage.setItem("auth", user);
      setAuth(user);
    }
    if (errorMessage) {
      console.table({ errorCode, errorMessage });
      if (errorCode === "auth/user-not-found") {
        setIsEmailError(true);
      }
      if (errorCode === "auth/wrong-password") {
        setIsPasswordError(true);
      }
      return;
    }
    navigate("/app/todolist", { replace: true });
  };

  return (
    <CredentialsForm
      title="Login"
      isEmailError={isEmailError}
      isPasswordError={isPasswordError}
      isLoading={isLoading}
      callback={callback}
      LeftStack={LeftStack}
    />
  );
}
