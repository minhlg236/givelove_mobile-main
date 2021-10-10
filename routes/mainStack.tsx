import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddCampaign from "../screens/addCampaign";
import AddTodoList from "../screens/addTodoList";
import NavBar from "../screens/bottomnavbar";
import BuyGift from "../screens/buygift";
import CampaignDetail from "../screens/campaigndetails";
import GiveGift from "../screens/givegift";
import Member from "../screens/member";
import Signin from "../screens/signin";
import Signup from "../screens/signup";
import Sponser from "../screens/sponsor";
import TodoList from "../screens/todoList";
import UserInfoScreen from "../screens/userprofile";
import Welcome from "../screens/welcome";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInfo"
        options={{ headerTitle: "Thông tin cá nhân", headerBackTitle: "" }}
        component={UserInfoScreen}
      />
      <Stack.Screen
        name="BottomNav"
        component={NavBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CampaignDetail"
        component={CampaignDetail}
      />
      <Stack.Screen
        options={{
          headerTitle: "Nhập thông tin mua hàng",
          headerBackTitle: "",
        }}
        name="buygift"
        component={BuyGift}
      />
      <Stack.Screen
        options={{
          headerTitle: "Nhập thông tin tặng quà",
          headerBackTitle: "",
        }}
        name="givegift"
        component={GiveGift}
      />
      <Stack.Screen
        options={{
          headerTitle: "Những công việc cần làm",
          headerBackTitle: "",
        }}
        name="todoList"
        component={TodoList}
      />
      <Stack.Screen
        options={{
          headerTitle: "Tạo chiến dịch",
          headerBackTitle: "",
        }}
        name="addCampaign"
        component={AddCampaign}
      />
      <Stack.Screen
        options={{
          headerTitle: "Danh sách thành viên",
          headerBackTitle: "",
        }}
        name="memberScreen"
        component={Member}
      />
      <Stack.Screen
        options={{
          headerTitle: "Danh sách mạnh thường quân",
          headerBackTitle: "",
        }}
        name="sponsorScreen"
        component={Sponser}
      />
      <Stack.Screen
        options={{
          headerTitle: "Thêm công việc",
          headerBackTitle: "",
        }}
        name="addtodolist"
        component={AddTodoList}
      />
    </Stack.Navigator>
  );
}
