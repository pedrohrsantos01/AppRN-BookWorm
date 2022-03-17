import React from "react";
import { View, Text, StatusBar } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../src/assets/colors";
import CustomActionbutton from "../../src/components/CustomActionbutton";
export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
        <View
          style={{
            flex: 1,
            borderColor: "blue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-bookmarks" size={150} color={colors.logoColor} />
          <Text
            style={{
              fontSize: 50,
              fontWeight: "100",
              color: "white",
            }}
          >
            Book Worm
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderColor: "orange",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <CustomActionbutton
            style={{
              width: 200,
              backgroundColor: "transnparent",
              borderWidth: 2,
              borderColor: colors.bgPrimary,
              marginBottom: 10,
            }}
            title="Login in"
            onPress={() => alert("Login")}
          >
            <Text style={{ fontWeight: "100", color: "white" }}>Login in</Text>
          </CustomActionbutton>
          <CustomActionbutton
            style={{
              width: 200,
              backgroundColor: "transnparent",
              borderWidth: 2,
              borderColor: colors.bgError,
            }}
            title="Sign up"
            onPress={() => alert("Sign up")}
          >
            <Text style={{ fontWeight: "100", color: "white" }}>Sign up</Text>
          </CustomActionbutton>
        </View>
      </View>
    );
  }
}