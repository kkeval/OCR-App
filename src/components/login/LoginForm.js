import {
  Button,
  chakra,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Text,
  Stack,
  Box,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import { Link as ReLink } from "react-router-dom";

export default function LoginForm() {
  const emailRef = useRef();
  const passRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const notifySuc = () => toast.success("Succsessfully Logged In");

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passRef.current.value);
      history.push("/");
      notifySuc();
    } catch {
      setError("Password or Email is Wrong!");
    }
    setLoading(false);
  }
  return (
    <>
      <chakra.form onSubmit={handleSubmit}>
        <Stack spacing="3">
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {currentUser && (
            <Alert borderRadius="8" status="success">
              <AlertIcon />
              {currentUser.email}
            </Alert>
          )}
          <Box>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              ref={emailRef}
            />
          </Box>

          <Box>
            <Flex>
              <Box>
                <FormLabel> Password </FormLabel>
              </Box>
              <Spacer />
              <Text
                fontSize="md"
                as={ReLink}
                color={useColorModeValue("blue.500", "blue.200")}
                to="/forgot-password"
                style={{ textDecoration: "none" }}
              >
                Forgot Password?
              </Text>
            </Flex>
            <Input
              name="password"
              type="password"
              ref={passRef}
              autoComplete="password"
              required
              style={{ marginBottom: "10px" }}
            />
          </Box>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            onClick={handleSubmit}
            disabled={loading}
          >
            Log in
          </Button>
        </Stack>
      </chakra.form>
    </>
  );
}
