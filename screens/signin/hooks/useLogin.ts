import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { useMutation } from "react-query";
import { login } from "../../../api/login";
import { LoginDto } from "../../../api/login/dto/login.dto";
const useLogin = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}) => {
  return useMutation(
    async (data: LoginDto) => {
      return await login(data);
    },
    {
      onSuccess: (data) => {
        AsyncStorage.setItem("userId", data.userId.toString());
        AsyncStorage.setItem("token", data.jwt.toString());
        navigation.navigate("BottomNav", {
          screen: "Trang chủ",
          params: { userId: data.userId, user: data },
        });
      },
    }
  );
};

export default useLogin;
