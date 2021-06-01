import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../src/contexts/AuthContext";
import Login from "./components/login/Login";
import SignUp from "./components/Signup/Signup";
import OcrApp from "./components/OcrApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPass from "./components/ForgotPass";
import UpdateProfile from "./components/Navbar/UpdateProfile";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
        },
      },    
    },
  });
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Navbar />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPass} />
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />
            <Route exact path="/" component={OcrApp} />
           
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer/>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
