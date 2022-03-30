import React from "react";
import { View, Text } from "react-native";
import CustomActionbutton from "../src/components/CustomActionbutton";
import colors from "../src/assets/colors";

import * as firebase from "firebase/app";
import "firebase/auth";
export default class SettingsScreen extends React.Component {
  signOut = async () => {
    try {
      await firebase.default.auth().signOut();
      this.props.navigation.navigate("WelcomeScreen");
    } catch (error) {
      alert("Unable to sign out right now");
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgorundColor: colors.bgMain,
        }}
      >
        <CustomActionbutton
          style={{
            width: 200,
            backgroundColor: "transnparent",
            borderWidth: 2,
            borderColor: colors.bgError,
          }}
          title="Sign up"
          onPress={this.signOut}
        >
          <Text style={{ fontWeight: "100", color: "white" }}>Log Out</Text>
        </CustomActionbutton>
      </View>
    );
  }
}
