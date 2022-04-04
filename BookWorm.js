import React from "react";
import { View, Text, StyleSheet } from "react-native";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "./src/assets/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class BookWorm extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.bgMain,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerBackTitleVisible: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const AppDrawerNavigator = () => {
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>;
};

export default BookWorm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
