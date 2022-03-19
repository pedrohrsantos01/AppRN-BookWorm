import React from "react";
import { View } from "react-native";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";

const App = () => {
  return <AppContainer />;
};

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUpScreen,
});

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  HomeScreen,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
