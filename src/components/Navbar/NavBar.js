import { useAuth } from "../../contexts/AuthContext";
import { Link as ReLink } from "react-router-dom";
import { Button, Text, Flex, Spacer, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import Profile from "./Profile";

export default function NavBar() {
  const { currentUser } = useAuth();

  return (
    <Flex
      h={{ base: "70px", md: "100px" }}
      mb={{ base: "20px", md: "10px" }}
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        as={ReLink}
        to="/"
        style={{ fontFamily: "'Press Start 2P' ", textDecoration: "none" }}
        ml="20px"
        fontWeight="extrabold"
        fontSize={{ base: "20px", md: "45px", lg: "50px" }}
        bgGradient="linear(to-r, #7928CA,#FF0080)"
        bgClip="text"
        w={{ base: "400px", md: "500px", lg: "500px" }}
      >
        OCR APP
      </Heading>
      <Spacer />
      {!currentUser && (
        <>
          <Button
            colorScheme="light"
            variant="ghost"
            mr={{ base: "1px", md: "10px" }}
            fontSize={{ base: "15px", md: "20px" }}
          >
            <Text
              as={ReLink}
              style={{ textDecoration: "none" }}
              as={ReLink}
              to="/signup"
            >
              Sign Up
            </Text>
          </Button>
          <Button
            colorScheme="light"
            variant="ghost"
            mr={{ base: "1px", md: "10px" }}
            fontSize={{ base: "15px", md: "20px" }}
          >
            <Text as={ReLink} style={{ textDecoration: "none" }} to="/login">
              Login
            </Text>
          </Button>
        </>
      )}
      {currentUser && (
        <>
          <Text mr={{base:"10px",md:"20px"}} fontSize={{base:"12px",md:"sm"}} color="gray.400">
            {currentUser.email}
          </Text>
          <Profile />
        </>
      )}
      <ColorModeSwitcher
        ml={{ base: "1px", md: "10px" }}
        mr={{ base: "2px", md: "10px" }}
      />
    </Flex>
  );
}
