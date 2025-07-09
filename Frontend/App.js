import * as React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavbar from "./src/navComponent/AppNavbar";
import { ColorProvider } from "./src/context/ColorContext";
import { NavigationContainer } from "@react-navigation/native";

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ColorProvider>
          <AppNavbar />
        </ColorProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
