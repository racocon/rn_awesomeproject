import React, { Component } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  Image,
  Animated,
} from "react-native";
import * as Linking from "expo-linking";
import Cell from "../components/Cell";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: Platform.OS,
      text: "",
      alertText: "General Kenobi",
      fadeAnim: new Animated.Value(1),
      rotateAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(this.state.rotateAnim, {
        toValue: 180,
        duration: 50000,
        useNativeDriver: true,
      })
    ).start();
  }

  render() {
    let cell_array = [
      {
        title: "React",
        index: 1,
        description: "Lorem ipsum",
      },
      {
        title: "React Native",
        index: 2,
        description: "Ipsum lorem",
      },
    ];

    let { text, alertText } = this.state;

    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Animated.View style={[{ opacity: this.state.fadeAnim }]}>
            <Text style={styles.fadingText}>I was never here...</Text>
          </Animated.View>
          {cell_array.map((item, index) => {
            return (
              <Cell
                title={item.title}
                key={item.index}
                onPress={() => {
                  console.log(item.title);
                  this.props.navigation.navigate("Second", {
                    title: item.title,
                    description: item.description,
                  });
                }}
              />
            );
          })}

          <Animated.View
            style={[
              styles.rotatingSquare,
              {
                transform: [{ rotate: this.state.rotateAnim }],
              },
            ]}
          >
            <Image
              style={[
                {
                  width: 140,
                  height: 140,
                },
              ]}
              source={{
                uri:
                  "https://i.kym-cdn.com/photos/images/newsfeed/001/384/543/865.jpg",
              }}
            />
          </Animated.View>

          <Button
            title="Hello there"
            onPress={() => {
              console.log("HEWWO");

              if (Platform.OS === "web") {
                alert(alertText);
              } else {
                Alert.alert(alertText);
              }
            }}
          />

          <Text style={styles.text}>{text}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              console.log("Hehe");
              Linking.openURL("https://github.com/racocon/awesomeproject");
            }}
          >
            <Text style={{ fontSize: 20 }}>Click me pls</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            value={this.state.text}
            onChangeText={(text) => {
              this.setState({
                text: text,
              });
            }}
            placeholder="Type here"
          />
          <Button
            title="Submit"
            onPress={() => {
              console.log("hewwo");

              this.setState({
                text: "You are never in control.",
              });
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "lightGrey",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  fadingText: {
    fontSize: 30,
    padding: 14,
  },
  rotatingSquare: {
    margin: 20,
  },
  text: {
    fontSize: 40,
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 20,
  },
};

export default HomeScreen;
