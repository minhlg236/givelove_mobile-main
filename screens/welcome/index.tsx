import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import PrimaryButton from "../../components/primarybutton";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Welcome: FC<Props> = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.title}>Give love</Text>
        <Image style={styles.img} source={require("../../assets/logo.png")} />
      </View>

      <View style={styles.buttonGroup}>
        <View style={styles.button1}>
          <PrimaryButton
            text="Bắt đầu"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
        {/* <View>
          <SecondaryButton
            text="Register"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  buttonGroup: {
    width: 350,
    alignSelf: "center",
  },
  button1: {
    marginBottom: 20,
  },
  img: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 40,
    color: "#FC7075",
    fontFamily: "Noto-Serif",
  },
  logo: {
    width: 200,
    marginBottom: 200,
    alignSelf: "center",
  },
});
export default Welcome;
