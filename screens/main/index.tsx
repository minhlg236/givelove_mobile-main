import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ActionButton from "react-native-action-button";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { IUser } from "../../interfaces/user.interface";
import ListCampaign from "./components/listcampaigns";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
}

const MainScreen = ({ route, navigation }: Props) => {
  const userId = route?.params.userId;
  const user: IUser = route?.params.user;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chiến dịch của tôi</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserInfo", user);
          }}
        >
          <Image
            style={styles.avatar}
            source={require("../../assets/avatar.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={user.role === "Manager" ? styles.campaign2 : styles.campaign}
      >
        <ListCampaign user={user} userId={userId} navigation={navigation} />
      </View>

      {user.role === "Manager" && (
        <ActionButton
          position="center"
          offsetY={1}
          buttonColor="#FC7075"
          size={70}
          onPress={() => {
            navigation.navigate("addCampaign");
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginTop: 140,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Noto-Serif",
    fontSize: 30,
    alignSelf: "center",
    marginLeft: 85,
  },
  avatar: {
    marginLeft: 40,
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  campaign: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    height: 720,
    marginBottom: 80,
  },
  campaign2: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    height: 700,
    marginBottom: 80,
  },
});
export default MainScreen;
