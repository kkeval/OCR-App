import { Heading,Link } from '@chakra-ui/layout';
import React from 'react';
import {Link as ReLink} from "react-router-dom"


const NotFound = () =>

    

  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
    <Link as={ReLink} to="/"> 
        <Heading>Login or Signup</Heading>
    </Link>

  </div>

export default NotFound;