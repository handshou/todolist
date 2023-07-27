import { useState, useContext } from "react";
import { Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import CredentialsForm from "../components/CredentialsForm";
import { AuthContext } from "../context/MyProviders";
import { createUser } from "../utils/auth/createUser";

export default function Register() {
  const navigate = useNavigate();

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const LeftStack = () => (
    <Link to="/login">
      <Text sx={{ textDecoration: "none", color: "blue" }}>
        Already have an account?
      </Text>
    </Link>
  );

  const callback = async (values) => {
    setIsEmailError(false);
    setIsPasswordError(false);
    setIsLoading(true);
    const { errorCode, errorMessage, user } = await createUser(
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
      if (errorCode === "auth/email-already-in-use") {
        setIsEmailError(true);
      }
      if (errorCode === "auth/weak-password") {
        setIsPasswordError(true);
      }
      return;
    }
    navigate("/app/todolist", { replace: true });
  };

  return (
    <CredentialsForm
      title="Register"
      isEmailError={isEmailError}
      isPasswordError={isPasswordError}
      isLoading={isLoading}
      callback={callback}
      LeftStack={LeftStack}
    />
  );
}
