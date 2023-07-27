import { Link, useNavigate } from "react-router-dom";
import {
  VStack,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/MyProviders";
import { useFormik } from "formik";

import { signIn } from "../utils/auth/signIn";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsEmailError(false);
      setIsPasswordError(false);
      setIsLoading(true);
      const { errorCode, errorMessage, user } = await signIn(
        values.email,
        values.password
      );
      setIsLoading(false);

      if (user && user.accessToken) {
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("refreshToken", user.refreshToken);
        setAuth(user);
        console.table(user);
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
      navigate("/todolist", { replace: true });
    },
  });

  return (
    <>
      <Heading pb="0.5rem">Login</Heading>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <VStack
            height="6rem"
            sx={{ display: "flex", justifyItems: "space-around" }}
          >
            <FormControl isInvalid={isEmailError}>
              <Input
                id="email"
                placeholder="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    console.log(e);
                  }
                }}
              />
            </FormControl>
            <FormControl isInvalid={isPasswordError}>
              <Input
                id="password"
                placeholder="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
          </VStack>
          <HStack sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link type="submit">
              <Text sx={{ textDecoration: "none", color: "blue" }}>
                Register
              </Text>
            </Link>
            <Button type="submit" isLoading={isLoading} colorScheme="blue">
              Login
            </Button>
          </HStack>
        </form>
      </div>
    </>
  );
}
