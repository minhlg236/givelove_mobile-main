import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultButton from "../../components/defaultbutton";
import { globalStyle } from "../../styles/globalStyle";
import firebase, * as FireBase from "firebase";
import { firebaseConfig } from "../../firebase";
interface AddCampaign {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  description: string;
  total: number;
}
const AddCampaign = ({ route }) => {
  const [imagee, setImagee] = useState<string | any>(null);
  const [image, setImage] = useState<string | any>(null);
  const [imageName, setImageName] = useState<string | any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImagee(result.uri);
      toggleModal();
      setImageName(
        result.uri.replace(
          "file:///Users/star/Library/Developer/CoreSimulator/Devices/E2A07823-9EFA-4A0A-BA53-8E1D999163ED/data/Containers/Data/Application/5E6A8457-EB5C-43BB-94BA-F5B5E7A12441/Library/Caches/ExponentExperienceData/%2540anonymous%252Fgivelove_mobile-b6eefe93-ecb1-4644-a2af-62090c5acf10/ImagePicker/",
          ""
        )
      );
    }
  };

  const uploadImageToFirebase = async () => {
    const blob: Blob | Uint8Array | ArrayBuffer | any = await new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imagee, true);
        xhr.send(null);
      }
    );
    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddCampaign>({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      location: "",
      image: "",
      description: "",
      total: undefined,
    },
  });

  return (
    <View style={globalStyle.container}>
      <View style={styles.userInfo}>
        <ScrollView style={{ height: 680 }}>
          <Text style={styles.titleText}>Tên chiến dịch</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Tên chiến dịch (bắt buộc)"
                style={globalStyle.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && (
            <Text
              style={{ color: "red", alignSelf: "flex-start", marginBottom: 5 }}
            >
              Vui lòng điền tên chiến dịch
            </Text>
          )}

          <Text style={styles.titleText}>Ngày bắt đầu</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="dd/mm/yyyy(bắt buộc)"
                style={globalStyle.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="startDate"
            defaultValue=""
          />
          {errors.startDate && (
            <Text
              style={{
                color: "red",
                alignSelf: "flex-start",
                marginBottom: 5,
              }}
            >
              Vui lòng điền ngày bắt đầu
            </Text>
          )}

          <Text style={styles.titleText}>Ngày kết thúc</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="dd/mm/yyyy(bắt buộc)"
                style={globalStyle.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="endDate"
            defaultValue=""
          />
          {errors.endDate && (
            <Text
              style={{
                color: "red",
                alignSelf: "flex-start",
                marginBottom: 5,
              }}
            >
              Vui lòng điền ngày kết thúc
            </Text>
          )}
          <Text style={styles.titleText}>Địa điểm</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Địa điểm(bắt buộc)"
                style={globalStyle.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="location"
            defaultValue=""
          />
          {errors.location && (
            <Text
              style={{
                color: "red",
                alignSelf: "flex-start",
                marginBottom: 5,
              }}
            >
              Vui lòng điền địa điểm
            </Text>
          )}
          <Text style={styles.titleText}>Tổng tiền</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Vnd(bắt buộc)"
                style={globalStyle.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="total"
            defaultValue=""
          />
          {errors.total && (
            <Text
              style={{
                color: "red",
                alignSelf: "flex-start",
                marginBottom: 5,
              }}
            >
              Vui lòng điền tổng số tiền
            </Text>
          )}
          <Text style={styles.titleText}>Mô tả</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Mô tả(không bắt buộc)"
                style={[globalStyle.textinput, styles.desc]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
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
          {imageName && <Text>{imageName}</Text>}
        </ScrollView>
        <Modal
          isVisible={isModalVisible}
          style={{ width: 300, flex: 1, alignSelf: "center" }}
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
              style={{ height: 1, width: 200, backgroundColor: "#DEDEDE" }}
            ></View>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.textModal}>Lấy hình từ thư viện</Text>
            </TouchableOpacity>
            <View
              style={{ height: 1, width: 200, backgroundColor: "#DEDEDE" }}
            ></View>
            <Button title="Huỷ" onPress={toggleModal} />
          </View>
        </Modal>
        <View style={styles.add}>
          {!uploading ? (
            <DefaultButton
              text="Tạo"
              onPress={handleSubmit(async (data) => {
                await uploadImageToFirebase();
                data = { ...data, image };
                console.log(data);
              })}
            />
          ) : (
            <ActivityIndicator size="small" color="#000" />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    fontSize: 25,
  },
  avatar: {
    width: 200,
    height: 190,
  },
  userInfo: {
    width: 350,
  },
  titleText: {
    paddingLeft: 5,
  },
  birthDateAndSex: {
    flexDirection: "row",
  },
  phoneNum: { width: 255 },
  birthDate: {
    width: 230,
    marginRight: 20,
  },
  sex: {
    width: 100,
    borderColor: "#777",
    height: 50,
  },
  desc: {
    paddingBottom: 100,
  },
  add: {
    marginBottom: 30,
    marginTop: 30,
  },
  camera: {
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: "#E3E1E1",
    flexDirection: "row",
    alignItems: "center",
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
export default AddCampaign;
