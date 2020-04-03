import React from "react";
import { BrowserRouter } from "react-router-dom";

import MainRouter from "./MainRouter";
import Menu from "./core/Menu";

const App = () => {
  return (
    <BrowserRouter>
      <MainRouter></MainRouter>
    </BrowserRouter>
  );
};

export default App;
