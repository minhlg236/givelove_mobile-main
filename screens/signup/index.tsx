import React, { FC, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import PrimaryButton from "../../components/primarybutton";
import { globalStyle } from "../../styles/globalStyle";
import CheckBox from "react-native-check-box";
import DefaultButton from "../../components/defaultbutton";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Signup: FC<Props> = ({ navigation }: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const handCheckBoxChange = () => {
    setIsSelected(!isSelected);
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../../assets/loginIcon.png")} />
      </View>
      <View style={styles.content}>
        <TextInput style={globalStyle.textinput} placeholder="UserName" />
        <TextInput style={globalStyle.textinput} placeholder="Email" />
        <TextInput style={globalStyle.textinput} placeholder="Password" />
        <View style={styles.signup}>
          <PrimaryButton text="Sign Up" onPress={() => {}} />
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupLine}>You already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.signupText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logo: {},
  content: {
    alignSelf: "center",
    width: 350,
    paddingTop: 40,
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    paddingTop: 10,
  },
  label: {
    margin: 8,
    paddingLeft: 20,
    fontSize: 17,
  },
  checkBox: {
    width: 295,
    borderWidth: 0,
  },
  forgot: {
    color: "black",
    fontWeight: "bold",
  },
  signup: {
    marginBottom: 12,
    marginTop: 15,
  },
  signupLine: {
    alignSelf: "center",
  },
  signupText: {
    color: "#1E57F1",
    paddingTop: 2,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 100,
  },
});
export default Signup;
