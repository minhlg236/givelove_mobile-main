import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

interface Props {
  buttonName: string;
  onPress: () => void;
}
const Footer = ({ buttonName, onPress }: Props) => {
  const nav = useNavigation();
  return (
    <View style={globalStyle.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}
        >
          <View style={styles.button1}>
            <Text style={styles.text1}>Trở về</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.text}>{buttonName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#FC989C",
    width: 170,
    height: 50,
  },
  button1: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FC989C",
    width: 170,
    height: 50,
    marginRight: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  text1: {
    color: "#FC989C",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
export default Footer;
