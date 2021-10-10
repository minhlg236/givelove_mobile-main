import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ICustomButton {
  text: string;
  onPress: () => void;
}
const DefaultButton = ({ text, onPress }: ICustomButton) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#FC989C",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
export default DefaultButton;
