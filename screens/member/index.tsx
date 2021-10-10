import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Footer from "../../components/footer";
import { ICampaign } from "../../interfaces/campaign.interface";
import { globalStyle } from "../../styles/globalStyle";
import useMemberInCampaign from "./hooks/useMemberInCampaign";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultButton from "../../components/defaultbutton";
import { AntDesign } from "@expo/vector-icons";

const Member = ({ route }: any) => {
  const camapaign: ICampaign = route?.params?.campaign;
  const campaignId = camapaign.id;
  const { data } = useMemberInCampaign(campaignId.toString());
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View style={styles.wrapper}>
        <ScrollView style={{ backgroundColor: "white" }}>
          {data?.data?.map((member, idx) => (
            <View style={globalStyle.container} key={idx}>
              <View key={idx} style={styles.box}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.status}>
                    <AntDesign name="delete" size={15} color="red" />
                    <Text style={styles.delete}>Xoá</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.text}>Họ và tên : {member.fullName}</Text>
                <Text style={styles.text}>Email : {member.email} </Text>
                <Text style={styles.text}>Số điện thoại : {member.phone} </Text>
                <Text style={styles.text}>Địa chỉ: {member.address}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Footer
          buttonName="Thêm thành viên"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        customBackdrop={
          <SafeAreaView style={styles.customBackdrop}>
            <Text style={styles.customBackdropText}></Text>
          </SafeAreaView>
        }
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            alignItems: "center",
            padding: 20,
            paddingTop: 50,
            paddingBottom: 200,
          }}
        >
          <Text style={styles.title}>Thêm thành viên</Text>
          <AntDesign
            style={styles.iconSearch}
            name="search1"
            size={16}
            color="black"
          />
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Nhập tên thành viên"
              style={styles.searchInput}
            ></TextInput>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.textbutton}>Tìm</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cancelButton}>
            <Button
              title="Huỷ"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
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
  delete: {
    marginLeft: 5,
    color: "red",
  },
  status: {
    flexDirection: "row",
    position: "relative",
    left: 280,
    top: 20,
  },
  text: { padding: 8 },
  wrapper: {
    height: 730,
  },
  footer: {
    backgroundColor: "white",
    marginTop: 15,
    width: 370,
    alignSelf: "center",
  },
  customBackdrop: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "grey",
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
  textModal: {
    padding: 10,
    fontSize: 17,
    color: "#007AFF",
  },
  searchInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    width: 250,
    marginRight: 20,
    paddingLeft: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSearch: {
    position: "absolute",
    top: 122,
    left: 40,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "Noto-Serif",
    paddingBottom: 30,
  },
  cancelButton: {
    position: "absolute",
    top: 310,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13.5,
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FC989C",
  },
  textbutton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
export default Member;
