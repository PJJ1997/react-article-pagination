import React, { useEffect, useState } from "react";

import AppContainer from "./AppContainer";
import "./AppDisplay";
import AppDisplay from "./AppDisplay";

const App = () => {
  return (
    <AppContainer.Provider>
      <AppDisplay />
    </AppContainer.Provider>
  );
};

export default App;
