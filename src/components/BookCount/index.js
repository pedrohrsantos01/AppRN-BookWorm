import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const BookCount = ({ title, count }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text>{count}</Text>
    </View>
  );
};

BookCount.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

export default BookCount;
