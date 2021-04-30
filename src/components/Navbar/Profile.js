import {
  Avatar,
  
  useColorModeValue,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { Link as ReLink } from "react-router-dom";

export default function Profile() {
  const { logout, currentUser } = useAuth();

  const notifyLogout = () => toast.success("Logged Out");
  const logoutfailed = () => toast.success("Logged Out");

  const history = useHistory("");
  async function handleLogout() {
   

    try {
      
      
      await logout();
      notifyLogout();
      history.push("/login");
    } catch {
      logoutfailed();
    }
    
  }

 

  return (
    <>
      <Menu>
        <MenuButton
          cursor="pointer"
          as={Avatar}
          size="md"
          name={currentUser.email}
          color={useColorModeValue("black", "white")}
          p={5}
          bg={useColorModeValue("gray.300", "gray.600")}
        ></MenuButton>
        <MenuList>
          <MenuItem as={ReLink} to="/update-profile" >Update Profile </MenuItem>
           <MenuItem
            onClick={handleLogout   }
           >Log out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
