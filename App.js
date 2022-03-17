import React from "react";
import { View } from "react-native";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return <AppContainer />;
};

const AppSwitchNavigator = createSwitchNavigator({
  WelcomeScreen,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
