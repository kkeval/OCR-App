import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";

export default function SignUpForm() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const notify1 = () => toast.error("Failed to create");
  const notifySuc = () => toast.success("Succsess");

  async function handleSubmit(e) {
    e.preventDefault();
    if (passRef.current.value !== passConRef.current.value) {
      return setError("Password Does Not Match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
      setError("Failed to Create Account!");
      notifySuc();
      history.push("/");
    } catch {
      notify1();
    }
    setLoading(false);
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <chakra.form onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing="3">
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Box>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                ref={emailRef}
               
                required
              />
            </Box>
            <Box>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                ref={passRef}
                autoComplete="password"
                required
              />
            </Box>
            <Box>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                name="conpassword"
                type="password"
                ref={passConRef}
                autoComplete="password"
                required
              />
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign Up
            </Button>
          </Stack>
        </FormControl>
      </chakra.form>
    </>
  );
}
