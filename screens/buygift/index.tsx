import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PrimaryButton from "../../components/primarybutton";
import { globalStyle } from "../../styles/globalStyle";
import useTodoListByCampaignId from "../todoList/hooks/useTodoList";
const BuyGift = ({ route }) => {
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      toggleModal();
      setImage(
        result.uri.replace(
          "file:///Users/star/Library/Developer/CoreSimulator/Devices/E2A07823-9EFA-4A0A-BA53-8E1D999163ED/data/Containers/Data/Application/5E6A8457-EB5C-43BB-94BA-F5B5E7A12441/Library/Caches/ExponentExperienceData/%2540anonymous%252Fgivelove_mobile-b6eefe93-ecb1-4644-a2af-62090c5acf10/ImagePicker/",
          ""
        )
      );
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  const date = dd + "/" + mm + "/" + yyyy;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      buydate: date,
      price: "",
      desc: "",
      giftname: "",
    },
  });
  const gifts: string[] = [];

  const campaignId = route?.params?.id;
  const { data } = useTodoListByCampaignId(campaignId);
  data?.data.map((todo) => {
    if (todo.status == true) {
      if (todo.type !== "give") gifts.push(todo.gift);
    }
  });
  const [selectedGift, SetSelectedGift] = useState(gifts[0]);
  return (
    <View style={globalStyle.container}>
      <View style={styles.content}>
        <Text>Tên món quà</Text>
        <SelectDropdown
          renderDropdownIcon={() => {
            return <FontAwesome name="chevron-down" color={"#444"} size={18} />;
          }}
          dropdownIconPosition="right"
          defaultValueByIndex={0}
          data={gifts}
          onSelect={(selectedItem, index) => {
            SetSelectedGift(selectedItem);
          }}
          rowStyle={{ padding: 1 }}
          buttonStyle={{
            padding: 1,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#777",
            borderRadius: 8,
            width: 350,
            marginBottom: 20,
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          renderCustomizedRowChild={(item, index) => {
            return <Text>{item}</Text>;
          }}
        />

        <Text>Ngày mua</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="mm/dd/yyyy"
              style={globalStyle.textinput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={false}
            />
          )}
          name="buydate"
        />
        {errors.buydate && (
          <Text style={{ color: "red", alignSelf: "flex-end" }}>
            Vui lòng nhập ngày mua
          </Text>
        )}

        <Text>Giá</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="VND"
              style={globalStyle.textinput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="price"
          defaultValue=""
        />
        {errors.price && (
          <Text
            style={{ color: "red", alignSelf: "flex-end", marginBottom: 20 }}
          >
            Vui lòng nhập giá
          </Text>
        )}
        <Text>Mô tả</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 1000,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              placeholder="Miêu tả món hàng (không bắt buộc)"
              style={styles.desc}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="desc"
          defaultValue=""
        />
        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.camera}>
            <View style={styles.cameraicon}>
              <Feather name="camera" size={30} color="black" />
            </View>
            <View>
              <Text style={styles.addimg}>Thêm hình ảnh</Text>
            </View>
          </View>
        </TouchableOpacity>
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
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.textModal}>Chụp hình</Text>
            </TouchableOpacity>
            <View
              style={{ height: 1, width: 300, backgroundColor: "#DEDEDE" }}
            ></View>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.textModal}>Lấy hình từ thư viện</Text>
            </TouchableOpacity>
            <View
              style={{ height: 1, width: 300, backgroundColor: "#DEDEDE" }}
            ></View>
            <Button title="Huỷ" onPress={toggleModal} />
          </View>
        </Modal>
        {image && <Text>{image}</Text>}
        <PrimaryButton
          text="Xác Nhận"
          onPress={handleSubmit((data) => {
            const newData = { ...data, gift: selectedGift };
            console.log("data", newData);
          })}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    width: 350,
  },
  desc: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
    paddingBottom: 120,
    borderRadius: 8,
    marginBottom: 20,
  },
  camera: {
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: "#E3E1E1",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },
  cameraicon: {
    marginTop: 15,
    paddingLeft: 30,
  },
  addimg: { marginTop: 10, paddingLeft: 30, fontSize: 20 },
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
});
export default BuyGift;
