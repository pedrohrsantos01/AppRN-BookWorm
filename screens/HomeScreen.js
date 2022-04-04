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

import BookCount from "../src/components/BookCount";
import Counter from "../src/components/Counter";
import CustomActionbutton from "../src/components/CustomActionbutton";

import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase/app";

import colors from "../src/assets/colors";
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      Count: 0,
      isAddNewBookVisible: false,
      textInputData: " ",
      books: [],
      booksReading: [],
      booksRead: [],
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    const currentUserData = await firebase.default
      .database()
      .ref("users/")
      .child(user.uid)
      .once("value");

    this.setState({ currentUser: currentUserData.val() });
  };

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = async (book) => {
    try {
      const snapshot = await firebase.default
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");
      if (snapshot.exists()) {
        alert("Unable to add as book already exists");
      } else {
        const key = await firebase.default
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .push().key;

        const response = await firebase.default
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ name: book, read: false });

        this.setState(
          (state, props) => ({
            books: [...state.books, book],
            booksReading: [...state.booksReading, book],
            isAddNewBookVisible: false,
          }),
          () => {
            console.log(this.state.books);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    /*
    
    */
  };

  markAsRead = (selectedBook, index) => {
    let books = this.state.books.filter((book) => book !== selectedBook);
    let booksReading = this.state.booksReading.filter(
      (book) => book !== selectedBook
    );

    this.setState((prevState) => ({
      books: books,
      booksReading: booksReading,
      booksRead: [...prevState.booksRead, selectedBook],
      //readingCount: prevState.readingCount - 1,
      //readCount: prevState.readCount + 1,
    }));
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>
      <CustomActionbutton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
      </CustomActionbutton>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        <View style={styles.container}>
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={(text) => this.setState({ textInputData: text })}
                style={styles.textInput}
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
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>
                  Você ainda não leu nenhum livro.
                </Text>
              </View>
            }
          />
          <CustomActionbutton
            position="right"
            onPress={this.showAddNewBook}
            style={styles.addNewBookButton}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionbutton>
        </View>

        <View style={styles.footer}>
          <BookCount title="Total Books" count={this.state.books.length} />
          <BookCount title="Reading" count={this.state.booksReading.length} />
          <BookCount title="Read" count={this.state.booksRead.length} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
  },
  checkmarkButton: {
    backgroundColor: colors.bgSucess,
  },
  listItemContainer: {
    height: 50,
    flexDirection: "row",
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center",
  },
  listEmptyComponentText: {
    fontWeight: "bold",
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgSucess,
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25,
  },
  addNewBookButtonText: {
    color: "white",
    fontSize: 30,
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: "row",
  },
});
