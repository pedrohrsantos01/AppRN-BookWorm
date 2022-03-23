import React from "react";
import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";
import colors from "../../src/assets/colors";

import { Ionicons } from "@expo/vector-icons";
import { DrawerItems } from "react-navigation";

export default class CustomDrawerComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
        <View
          style={{
            height: 150,
            backgroundColor: colors.bgMain,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Platform.OS == "android" ? 20 : 0,
          }}
        >
          <Ionicons name="bookmarks" size={100} color={colors.logoColor} />
          <Text style={{ fontSize: 24, color: "white", fontWeight: "100" }}>
            Book Worm
          </Text>
        </View>
        <DrawerItems {...this.props} />
      </ScrollView>
    );
  }
}
