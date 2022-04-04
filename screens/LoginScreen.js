import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import colors from "../src/assets/colors";
import CustomActionbutton from "../src/components/CustomActionbutton";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onSignIn = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase.default
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (response) {
          this.setState({ isLoading: false });
          // navigate the user
          this.props.navigation.navigate("LoadingScreen");
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("A User with that email does not exist. Try signing Up");
            break;
          case "auth/invalid-email":
            alert("Please enter an email address");
            break;
        }
      }
    }
  };

  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase.default
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        if (response) {
          this.setState({ isLoading: false });
          //signin the user
          const user = await firebase.default
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });

          this.props.navigation.navigate("LoadingScreen");
          //this.onSignIn(this.state.email, this.state.password);
        }
      } catch (error) {
        this.setState({ isLoading: false });
        if (error.code == "auth/email-already-in-use") {
          alert("User already exists, Try loggin in");
        } else {
          alert("Please enter email and password");
        }
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        ) : null}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email: email })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={(password) => this.setState({ password: password })}
          />
          <View style={{ alignItems: "center" }}>
            <CustomActionbutton
              onPress={this.onSignIn}
              style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Login</Text>
            </CustomActionbutton>
            <CustomActionbutton
              onPress={this.onSignUp}
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
