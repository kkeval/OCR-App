import { Box, Heading, Text, Link, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Card } from "../login/Card";
import SignUpForm from "./SignUpForm";
import { Link as ReLink } from "react-router-dom";

const SignUp = () => (
  <Box maxW="md" mx="auto">
    <Heading textAlign="center" size="xl" fontWeight="extrabold" >
      Sign Up Here
    </Heading>
    <Link as={ReLink} to="/login" style={{textDecoration:"none"}} color={useColorModeValue("blue.500","blue.200")} >
      <Text mt="2" mb="5" align="center" maxW="md" fontWeight="medium" fontFamily="heading">
        Already have an account?
      </Text>
    </Link>
    <Card boxShadow="dark-lg">
      <SignUpForm />
    </Card>
  </Box>
);

export default SignUp;
