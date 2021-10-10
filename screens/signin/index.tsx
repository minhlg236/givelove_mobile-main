import React, { FC, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import PrimaryButton from "../../components/primarybutton";
import { globalStyle } from "../../styles/globalStyle";
import useLogin from "./hooks/useLogin";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
interface UserInfo {
  username: string;
  password: string;
  join: boolean;
}
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Signin: FC<Props> = ({ navigation }: Props) => {
  const [hidePass, setHidePass] = useState(true);
  const [loginfail, setLoginfail] = useState(false);
  const {
    mutate: login,
    isError,
    status,
    isSuccess = false,
  } = useLogin({ navigation });
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  return (
    <View style={globalStyle.container}>
      <View style={styles.logo}>
        <Text style={styles.title}>Give love</Text>
        <Image style={styles.img} source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.content}>
        <TextInput
          style={globalStyle.textinput}
          onChangeText={(value) => {
            setUser({ username: value, password: user.password });
            setLoginfail(false);
          }}
          placeholder="Tên đăng nhập"
        />
        <TextInput
          secureTextEntry={hidePass ? true : false}
          style={globalStyle.textinput}
          placeholder="Mật khẩu"
          onChangeText={(value) => {
            setUser({ username: user.username, password: value });
            setLoginfail(false);
          }}
        />
        <View style={styles.icon}>
          <Icon
            name={hidePass ? "eye-slash" : "eye"}
            size={15}
            color="grey"
            onPress={() => setHidePass(!hidePass)}
          />
        </View>
        {isSubmit &&
          (user.password.length == 0 || user.username.length == 0) && (
            <Text style={styles.errorMessage}>
              Vui lòng điền đủ thông tin đăng nhập
            </Text>
          )}
        {loginfail &&
          user.password.length != 0 &&
          user.username.length != 0 &&
          status === "error" && (
            <Text style={styles.errorMessage}>Tài khoản hoặc mật khẩu sai</Text>
          )}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <PrimaryButton
            text="Đăng nhập"
            onPress={async () => {
              setIsSubmit(true);
              if (user.password.length !== 0 && user.username.length !== 0) {
                try {
                  await login(user);
                  if (isSuccess) {
                    setLoginfail(false);
                  } else setLoginfail(true);
                } catch (error) {}
              }
            }}
          />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupLine}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Gọi", "Bạn có muốn gọi admin?", [
                {
                  text: "Huỷ",
                  style: "cancel",
                },
                {
                  text: "Gọi",
                  onPress: () => Linking.openURL(`tel:0376536924`),
                },
              ]);
            }}
          >
            <Text style={styles.signupText}>Liên hệ admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    marginBottom: 40,
  },
  content: {
    alignSelf: "center",
    width: 350,
    paddingTop: 40,
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    marginLeft: 235,
  },
  label: {
    margin: 8,
    paddingLeft: 20,
    fontSize: 17,
  },
  checkBox: {
    width: 230,
    borderWidth: 0,
  },
  forgot: {
    color: "black",
    fontWeight: "bold",
  },
  signup: {
    marginBottom: 12,
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
  errorMessage: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
  icon: {
    position: "relative",
    bottom: 52,
    left: 310,
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
});
export default Signin;
