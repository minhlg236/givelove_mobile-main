import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import DefaultButton from "../../components/defaultbutton";
import { formatDate } from "../../helpers";
import { IMission } from "../../interfaces/mission.interface";
import { globalStyle } from "../../styles/globalStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AddTodoList = ({ route }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [selectedType, SetSelectedType] = useState("Mua");

  return (
    <View style={globalStyle.container}>
      <Text style={styles.content}></Text>
      <View style={styles.userInfo}>
        <Text style={styles.titleText}>Tên món quà</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Gạo, rau củ ..."
              style={globalStyle.textinput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="gift"
          defaultValue=""
        />
        {errors.gift && (
          <Text
            style={{ color: "red", alignSelf: "flex-start", marginBottom: 10 }}
          >
            Vui lòng điền tên món quà
          </Text>
        )}

        <Text style={styles.titleText}>Công việc</Text>
        <SelectDropdown
          renderDropdownIcon={() => {
            return <FontAwesome name="chevron-down" color={"#444"} size={18} />;
          }}
          dropdownIconPosition="right"
          defaultValueByIndex={0}
          data={["Mua", "Tặng"]}
          onSelect={(selectedItem, index) => {
            SetSelectedType(selectedItem);
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

        <Text style={styles.titleText}>Hạn chót</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="dd/mm/yyyy"
              style={globalStyle.textinput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="deadline"
          defaultValue=""
        />
        {errors.deadline && (
          <Text
            style={{
              color: "red",
              alignSelf: "flex-start",
              marginBottom: 10,
            }}
          >
            Vui lòng điền hạn chót cho công việc
          </Text>
        )}
        <View style={styles.desc}>
          <Text style={styles.titleText}>Mô tả</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Mô tả (không bắt buộc)"
                style={styles.textDesc}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="address"
            defaultValue=""
          />
        </View>
        <View style={styles.add}>
          <DefaultButton
            text="Thêm"
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
  desc: {
    marginBottom: 10,
  },
  textDesc: {
    paddingBottom: 150,
    padding: 15,
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 8,
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
  add: {
    marginBottom: 100,
    marginTop: 50,
  },
});
export default AddTodoList;
