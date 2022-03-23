import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import colors from "../src/assets/colors";
import CustomActionbutton from "../src/components/CustomActionbutton";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
          />
          <View style={{ alignItems: "center" }}>
            <CustomActionbutton
              style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Login</Text>
            </CustomActionbutton>
            <CustomActionbutton
              style={[styles.loginButtons, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Sign Up</Text>
            </CustomActionbutton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  textInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: "white",
    paddingHorizontal: 10,
  },
  loginButtons: {
    borderWidth: 1.5,
    backgroundColor: "transparent",
    marginTop: 10,
    width: 200,
  },
});
