import { ColorModeScript,Box } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";

ReactDOM.render(
  <StrictMode>
 
    <ColorModeScript />
    <App /> 

    
  </StrictMode>,

  document.getElementById("root")
);

serviceWorker.register();