import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import AnimatedSplash from "react-native-animated-splash-screen";
import AboutScreen from "../about";
import MainScreen from "../main";
import SettingScreen from "../setting";
const Tab = createBottomTabNavigator();
const NavBar = () => {
  const [isloaded, setIsloaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, 1500);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isloaded}
      logoImage={require("../../assets/logo.png")}
      backgroundColor={"white"}
      logoHeight={150}
      logoWidth={150}
    >
      <Tab.Navigator>
        <Tab.Screen
          name="Thông tin"
          component={AboutScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: "#FC7075",
            tabBarIcon: () => (
              <Ionicons
                name="ios-information-circle-outline"
                size={24}
                color="#FC7075"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Trang chủ"
          component={MainScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: "#FC7075",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color="#FC7075" size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Cài đặt"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: "#FC7075",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-settings-outline" size={24} color="#FC7075" />
            ),
          }}
        />
      </Tab.Navigator>
    </AnimatedSplash>
  );
};
export default NavBar;
