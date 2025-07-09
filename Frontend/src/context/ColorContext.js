import React, { createContext, useState } from "react";

import { THEMES_COLOR } from "../themes/constants";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [backColor, setBackColor] = useState(THEMES_COLOR[0]);
  const [colorChangePending, setColorChangePending] = useState(false);

  return (
    <ColorContext.Provider
      value={{
        backColor,
        setBackColor,
        setColorChangePending,
        colorChangePending,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
