import { registerRootComponent } from "expo";
import { AppRegistry, Platform } from "react-native";

import App from "./App";
import Counter from "./src/components/Counter";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
if (Platform.OS == "android") {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent("main", () => App);
}
