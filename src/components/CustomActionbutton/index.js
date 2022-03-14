import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function getPosition(position) {
  switch (position) {
    case "left":
      return { position: "absolute", left: 20, bottom: 20 };
    default:
      return { position: "absolute", right: 20, bottom: 20 };
  }
}

const CustomActionbutton = ({ children, style, onPress, position }) => {
  const floatingActionButton = position ? getPosition(position) : [];

  return (
    <TouchableOpacity style={floatingActionButton} onPress={onPress}>
      <View style={[styles.container, style]}>{children}</View>
    </TouchableOpacity>
  );
};

CustomActionbutton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
};

CustomActionbutton.defaultProps = {
  style: {},
};

export default CustomActionbutton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: "#a5deba",
    alignItems: "center",
    justifyContent: "center",
  },
});
