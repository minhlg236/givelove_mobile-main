import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

const SettingScreen = () => {
  return (
    <View style={globalStyle.container}>
      <Text style={styles.content}>Setting screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
});
export default SettingScreen;
