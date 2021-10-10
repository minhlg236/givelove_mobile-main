import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import DefaultButton from "../../components/defaultbutton";
import { formatDate } from "../../helpers";
import { globalStyle } from "../../styles/globalStyle";
interface Info {
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
}
const UserInfoScreen = ({ route }) => {
  const user: Info = {
    fullName: route.params?.fullName,
    dob: route.params?.dob,
    gender: route.params?.gender,
    phone: route.params?.phone,
    email: route.params?.email,
    address: route.params?.address,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user.fullName || "Vũ Viết Sang",
      birthDate: formatDate(user.dob) || "19/06/2000",
      phone: user.phone || "0376536924",
      email: user.email || "vuvietsang10a9@gmail.com",
      address: user.address || "334 Trần Thị Cờ",
    },
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
  ]);
  const [onOpen, setOnOpen] = useState(false);
  return (
    <View style={globalStyle.container}>
      <Text style={styles.content}>
        <Image
          style={styles.avatar}
          source={require("../../assets/avatar.png")}
        />
      </Text>
      <View style={styles.userInfo}>
        <Text style={styles.titleText}>Họ và tên</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Họ và tên"
              style={globalStyle.textinput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="fullname"
          defaultValue=""
        />
        {errors.fullname && (
          <Text
            style={{ color: "red", alignSelf: "flex-start", marginBottom: 10 }}
          >
            Vui lòng điền họ và tên
          </Text>
        )}
        <View style={styles.birthDateAndSex}>
          <View style={styles.birthDate}>
            <Text>Ngày sinh</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="YYYY/MM/DD"
                  style={styles.textinput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="birthDate"
              defaultValue=""
            />
            {errors.birthDate && (
              <Text
                style={{
                  color: "red",
                  alignSelf: "flex-start",
                  marginBottom: 10,
                }}
              >
                Vui lòng điền ngày sinh
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.sexTitle}>Giới tính</Text>
            <DropDownPicker
              labelProps={{
                numberOfLines: 1,
              }}
              placeholder={
                user.gender === "Male" ? items[0].label : items[1].label
              }
              style={styles.sex}
              open={open}
              value={value}
              items={items}
              onOpen={() => {
                setOnOpen(true);
              }}
              onClose={() => {
                setOnOpen(false);
              }}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </View>
        <View style={onOpen && styles.phoneNum}>
          <Text style={styles.titleText}>Số điện thoại</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Số điện thoại"
                style={onOpen ? styles.textinput2 : styles.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
            defaultValue=""
          />
          {errors.phone && (
            <Text
              style={{
                color: "red",
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Vui lòng điền số điện thoại
            </Text>
          )}
        </View>
        <Text style={styles.titleText}>Email</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="abc@gmail.com"
              style={globalStyle.textinput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && (
          <Text
            style={{
              color: "red",
              alignSelf: "flex-start",
              marginBottom: 10,
            }}
          >
            Vui lòng điền email
          </Text>
        )}
        <View style={styles.address}>
          <Text style={styles.titleText}>Địa chỉ</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Địa chỉ"
                style={globalStyle.textinput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="address"
            defaultValue=""
          />
          {errors.address && (
            <Text
              style={{
                color: "red",
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Vui lòng điền địa chỉ
            </Text>
          )}
        </View>
        <View style={styles.update}>
          <DefaultButton
            text="Cập nhật"
            onPress={handleSubmit((data) => {
              console.log("data", data);
            })}
          />
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
  address: {
    marginBottom: 10,
  },
  sexTitle: {
    marginLeft: 10,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
  },
  textinput2: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    borderRightWidth: 0,
  },
  update: {
    marginBottom: 100,
  },
});
export default UserInfoScreen;
