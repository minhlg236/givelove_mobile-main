import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/footer";
import { formatDate } from "../../helpers";
import { ICampaign } from "../../interfaces/campaign.interface";
import { IUser } from "../../interfaces/user.interface";
import { globalStyle } from "../../styles/globalStyle";
import useTodoListByCampaignId from "./hooks/useTodoList";

const TodoList = ({ route }: any) => {
  const nav = useNavigation<any>();
  const camapaign: ICampaign = route?.params?.campaign;
  const user: IUser = route?.params?.user;
  const role = user.role;
  const campaignId = camapaign.id;
  const { data } = useTodoListByCampaignId(campaignId.toString());
  return (
    <View>
      <View style={role === "Manager" && styles.wrapper}>
        <ScrollView style={{ backgroundColor: "white" }}>
          {data?.data?.map((todo, idx) => (
            <View style={globalStyle.container} key={idx}>
              <View key={idx} style={styles.box}>
                {todo.status ? (
                  <View style={styles.status}>
                    <FontAwesome5 name="check" size={15} color="#777" />
                    <Text style={styles.notDone}>Chưa hoàn thành</Text>
                  </View>
                ) : (
                  <View style={styles.status}>
                    <FontAwesome5 name="check" size={15} color="green" />
                    <Text style={styles.done}>Đã hoàn thành</Text>
                  </View>
                )}
                <Text style={styles.text}>Tên món quà : {todo.gift}</Text>

                {todo.type === "give" ? (
                  <Text style={styles.text}>Công việc : Tặng </Text>
                ) : (
                  <Text style={styles.text}>Công việc : Mua </Text>
                )}
                <Text style={styles.text}>
                  Hạn chót : {formatDate(todo.deadline)}{" "}
                </Text>
                <Text style={styles.text}>Mô tả : {todo.description} </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {role === "Manager" && (
        <View style={styles.footer}>
          <Footer
            buttonName="Thêm công việc"
            onPress={() => {
              nav.navigate({ name: "addtodolist", key: "addtodo" });
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#F9FBFE",
    borderRadius: 8,
    shadowOpacity: 0.2,
    width: 370,
  },
  firstLine: {
    flexDirection: "row",
  },
  notDone: {
    marginLeft: 5,
    color: "#777",
  },
  done: {
    marginLeft: 5,
    color: "green",
  },
  status: {
    flexDirection: "row",
    position: "relative",
    left: 210,
    top: 20,
  },
  text: { paddingTop: 8 },
  wrapper: {
    height: 730,
  },
  footer: {
    backgroundColor: "white",
    marginTop: 15,
    width: 370,
    alignSelf: "center",
  },
});
export default TodoList;
