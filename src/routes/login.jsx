import { Link } from "react-router-dom";
import {
  VStack,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <>
      <Heading pb="0.5rem">Login</Heading>
      <div>
        <FormControl
        // isInvalid={isError}
        >
          <VStack
            height="6rem"
            sx={{ display: "flex", justifyItems: "space-around" }}
          >
            <Input
              id="username"
              placeholder="username"
              type="text"
              name="username"
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
            />
          </VStack>
          <HStack sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/todolist">
              <Text sx={{ textDecoration: "none", color: "blue" }}>
                Register
              </Text>
            </Link>
            <Button type="submit">Login</Button>
          </HStack>
        </FormControl>
      </div>
    </>
  );
}
