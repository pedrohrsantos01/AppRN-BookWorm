import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

import BookCount from "./src/components/BookCount";
import Counter from "./src/components/Counter";
import CustomActionbutton from "./src/components/CustomActionbutton";

import { Ionicons } from "@expo/vector-icons";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      Count: 0,
      isAddNewBookVisible: false,
      textInputData: " ",
      books: [],
    };
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = (book) => {
    this.setState(
      (state, props) => ({
        books: [...state.books, book],
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1,
      }),
      () => {
        console.log(this.state.books);
      }
    );
  };

  incrementCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  decrementCounter = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };

  markAsRead = (selectedBook, index) => {
    let newList = this.state.books.filter((book) => book !== selectedBook);

    this.setState((prevState) => ({
      books: newList,
      readingCount: prevState.readingCount - 1,
      readCount: prevState.readCount + 1,
    }));
  };

  renderItem = (item, index) => (
    <View style={{ height: 50, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{item}</Text>
      </View>
      <CustomActionbutton
        style={{ width: 100, backgroundColor: "#a5deba" }}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>Mark as Read</Text>
      </CustomActionbutton>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            borderBottomColor: "#E9E9E9",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>Book Worm</Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.isAddNewBookVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                onChangeText={(text) => this.setState({ textInputData: text })}
                style={{ flex: 1, backgroundColor: "#ececec", paddingLeft: 5 }}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
              />

              <CustomActionbutton
                onPress={() => this.addBook(this.state.textInputData)}
              >
                <Ionicons name="checkmark" color="white" size={40} />
              </CustomActionbutton>

              <CustomActionbutton
                style={{ backgroundColor: "#deada5" }}
                onPress={this.hideAddNewBook}
              >
                <Ionicons name="close" color="white" size={40} />
              </CustomActionbutton>
            </View>
          )}

          <FlatList
            data={this.state.books}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  Você ainda não leu nenhum livro.
                </Text>
              </View>
            }
          />
          <CustomActionbutton
            position="right"
            onPress={this.showAddNewBook}
            style={{ backgroundColor: "#AAd1e6", borderRadius: 25 }}
          >
            <Text style={{ fontSize: 30, color: "white" }}>+</Text>
          </CustomActionbutton>
        </View>

        <View
          style={{
            height: 70,
            borderTopWidth: 0.5,
            borderTopColor: "#E9E9E9",
            flexDirection: "row",
          }}
        >
          <BookCount title="Total" count={this.state.totalCount} />
          <BookCount title="Reading" count={this.state.readingCount} />
          <BookCount title="Read" count={this.state.readCount} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
