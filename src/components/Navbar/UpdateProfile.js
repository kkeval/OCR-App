import {
  Button,
  chakra,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Stack,
  Box,
  Flex,
  Spacer,
  Heading
} from "@chakra-ui/react";
import * as React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { Card } from "../login/Card";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth()
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

 

  function handleSubmit(e) {
    e.preventDefault()
    if (passRef.current.value !== passConRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passRef.current.value) {
      promises.push(updatePassword(passRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
    
    <Box  maxW={{base:"90%",md:"450px"}} mx="auto">

<Heading textAlign="center" fontSize={{base:"30px",md:"40px"}} mb={10} fontWeight="extrabold">
        Update Profile
      </Heading>
    <Card>
      <chakra.form onSubmit={handleSubmit}>
        <Stack spacing="3">
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          { currentUser && (<Alert status="success">
              <AlertIcon />
              {currentUser.email}
            </Alert>)}
          <Box>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={currentUser.email}
              ref={emailRef}
            />
          </Box>

          <Box>
            <Flex>
              <Box>
                <FormLabel> Password </FormLabel>
              </Box>
              <Spacer />
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
          <Box>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                name="password"
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
            fontSize="md"
            onClick={handleSubmit}
            disabled={loading}
          >
            Update Profile
          </Button>
        </Stack>
      </chakra.form>
    </Card>
    </Box>
    </>
  );
}
