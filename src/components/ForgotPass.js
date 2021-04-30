import {
  Button,
  chakra,
  FormLabel,
  Input,
  Alert,
  Box,
  Heading,
  Link,
  Text,
  useColorModeValue,
  AlertIcon,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef } from "react";
import {Link as ReLink} from "react-router-dom"
import {Card} from "./login/Card"

export default function ForgotPassword() {
  const emailRef = useRef();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [errorsuc, setErrorsuc] = useState("");
  const [loading, setLoading] = useState(false);



  async function handleForgotpass(e) {
    e.preventDefault();

    try {
      setError("");
      setErrorsuc("");
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setErrorsuc("Check Your Email for Reset Link")
    
    } catch {
      setError("Email is Wrong!");
    }
    setLoading(false);
  }

  return (
    <Box maxW="md" mx="auto" >

<Heading textAlign="center" size="xl" fontWeight="extrabold">
        Forgot Password
      </Heading>
     
       
      <Link as={ReLink} to="/signup" style={{textDecoration:"none"}}>
      <Text mt="2" mb="5" align="center" maxW="md" fontWeight="medium"  color={useColorModeValue("blue.500","blue.200")}> Don&apos;t have an account? </Text>
        </Link>
  

    <Card boxShadow="dark-lg">
      <chakra.form onSubmit={handleForgotpass}>
        <Stack spacing="4">
          {error && (
            <Alert status="error"  rounded={{
                sm: "lg",
              }}>
              <AlertIcon />
              {error}
            </Alert>
          )} 
           {errorsuc && (
            <Alert status="success">
              <AlertIcon />
              {errorsuc}
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
          
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            onClick={handleForgotpass}
            disabled={loading}
          >
            Reset Password
          </Button>{" "}
        </Stack>
      </chakra.form>
    </Card>
   </Box>
  );
}
