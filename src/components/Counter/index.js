import React from "react";
import { Text, View, Button } from "react-native";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  incrementCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  decrementCounter() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Count: {this.state.counter}</Text>
        <Button
          color={"red"}
          title="Diminuir"
          onPress={this.decrementCounter.bind(this)}
        />
        <Button
          color={"blue"}
          title="Aumentar"
          onPress={this.incrementCounter.bind(this)}
        />
      </View>
    );
  }
}

export default Counter;
