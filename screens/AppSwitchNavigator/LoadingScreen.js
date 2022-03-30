import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import * as firebase from "firebase/app";
import "firebase/auth";
import colors from "../../src/assets/colors";

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        //navigate to the home screen
        this.props.navigation.navigate("HomeScreen", { user: user });
      } else {
        //navigate the user to the login screen
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgMain,
  },
});
