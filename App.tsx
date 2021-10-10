import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AnimatedSplash from "react-native-animated-splash-screen";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigator from "./routes/mainStack";
const queryClient = new QueryClient();
export default function App() {
  const [auth, setAuth] = useState("false");
  let [fontsLoaded] = useFonts({
    "Noto-Serif": require("./assets/fonts/NotoSerif-Italic.ttf"),
  });
  const [isloaded, setIsloaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, 1000);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={isloaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"white"}
        logoHeight={150}
        logoWidth={150}
      >
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </QueryClientProvider>
      </AnimatedSplash>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
