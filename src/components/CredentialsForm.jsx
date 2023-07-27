import {
  VStack,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";

export default function CredentialsForm({
  title,
  callback,
  LeftStack,
  isEmailError,
  isPasswordError,
  isLoading,
}) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      callback(values);
    },
  });

  return (
    <>
      <Heading pb="0.5rem">{title}</Heading>
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
            <LeftStack />
            <Button type="submit" isLoading={isLoading} colorScheme="blue">
              {title}
            </Button>
          </HStack>
        </form>
      </div>
    </>
  );
}
