import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  Link,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Card } from "./Card";
import LoginForm from "./LoginForm";
import { Link as ReLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const history = useHistory();
  const notifySuc = () => toast.success(error);
  const notifyFailed = () => toast.success(error);
  const { signGoogle, error } = useAuth();
  async function handleGooleLogin(e) {
    e.preventDefault();
    try {
      await signGoogle();
      notifySuc();
      history.push("/");
    } catch {
      notifyFailed();
    }
  }

  return (
    <Box maxW="md" mx="auto">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Login in to your account
      </Heading>

      <Link as={ReLink} to="/signup" style={{ textDecoration: "none" }}>
        <Text
          mt="2"
          mb="5"
          align="center"
          color={useColorModeValue("blue.500", "blue.200")}
          maxW="md"
          fontWeight="medium"
        >
          {" "}
          Don&apos;t have an account?{" "}
        </Text>
      </Link>

      <Card boxShadow="dark-lg">
        <LoginForm />
        <SimpleGrid mt="6" columns={3} spacing="3">
          <Button
            color="currentColor"
            variant="outline"
            borderWidth="2px"
            borderColor={useColorModeValue("black", "white")}
            disabled
          >
            <VisuallyHidden>Login with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button
            color="currentColor"
            variant="outline"
            onClick={handleGooleLogin}
            borderWidth="2px"
            borderColor={useColorModeValue("black", "white")}
          >
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
          <Button
            color="currentColor"
            variant="outline"
            disabled
            borderWidth="2px"
            borderColor={useColorModeValue("black", "white")}
          >
            <VisuallyHidden>Login with Github</VisuallyHidden>
            <FaGithub />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  );
}
