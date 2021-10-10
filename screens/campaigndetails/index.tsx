import React, { FC } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import DefaultButton from "../../components/defaultbutton";
import PrimaryButton from "../../components/primarybutton";
import { formatDay, formatMonth } from "../../helpers";
import { IUser } from "../../interfaces/user.interface";
import { globalStyle } from "../../styles/globalStyle";
interface Campaign {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  name: string;
  state: string;
  image: string;
  manager: string;
  totalMember: number;
}
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
}

const CampaignDetail: FC<Props> = ({ route, navigation }: Props) => {
  const campaigntmp: Campaign = route.params?.campaign;
  const user: IUser = route.params?.user;
  const campaign: Campaign = {
    id: campaigntmp.id,
    name: campaigntmp.name,
    description: campaigntmp.description,
    image: campaigntmp.image,
    startDate: campaigntmp.startDate,
    endDate: campaigntmp.endDate,
    location: campaigntmp.location,
    state: campaigntmp.state,
    manager: campaigntmp.manager,
    totalMember: campaigntmp.totalMember,
  };

  const startday = formatDay(campaign.startDate);
  const startmonth = formatMonth(campaign.startDate);
  const endday = formatDay(campaign.endDate);
  const endmonth = formatMonth(campaign.endDate);

  return (
    <View style={globalStyle.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          style={styles.backbutton}
          source={require("../../assets/back.png")}
        />
      </TouchableWithoutFeedback>
      <View style={styles.header}>
        <Text style={styles.title}>{campaign.name}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={{
            uri: campaign.image,
          }}
        />
      </View>
      <View style={styles.info1}>
        <View style={styles.sub1}>
          <Image
            style={styles.logo}
            source={require("../../assets/startdate.png")}
          />
          <View style={styles.content}>
            <Text>
              {startday} Tháng {startmonth}
            </Text>
            <Text style={{ color: "grey" }}>Bắt đầu</Text>
          </View>
        </View>
        <View style={styles.sub1}>
          <Image
            style={styles.logo}
            source={require("../../assets/dayleft.png")}
          />
          <View style={styles.content}>
            <Text>
              {endday} Tháng {endmonth}{" "}
            </Text>
            <Text style={{ color: "grey" }}>Kết thúc</Text>
          </View>
        </View>
        <View style={styles.sub1}>
          <Image
            style={styles.logo}
            source={require("../../assets/member.png")}
          />
          <View style={styles.content}>
            <Text>{campaign.totalMember}</Text>
            <Text style={{ color: "grey" }}>Thành Viên</Text>
          </View>
        </View>
      </View>
      <View style={styles.info2}>
        <Text style={styles.subinfo2}>
          Trưởng chiến dịch : {campaign.manager}
        </Text>
        <Text style={styles.subinfo2}>Địa điểm : {campaign.location}</Text>
        <Text style={styles.subinfo2}>Miêu tả : {campaign.description}</Text>
      </View>
      {user.role === "Member" ? (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("todoList", { campaign, user });
            }}
          >
            <View style={styles.todoList}>
              <Image
                style={styles.missionIcon}
                source={require("../../assets/mission.png")}
              />
              <Text style={styles.todoText}>Những công việc cần làm</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.watch}>
            <PrimaryButton
              text="Mua quà"
              onPress={() => {
                navigation.navigate("buygift", { campaign, user });
              }}
            />
          </View>
          <View style={styles.phatqua}>
            <DefaultButton
              text="Phát quà"
              onPress={() => {
                navigation.navigate("givegift", { campaign, user });
              }}
            />
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("todoList", { campaign, user });
            }}
          >
            <View style={styles.todoList}>
              <Image
                style={styles.missionIcon}
                source={require("../../assets/mission.png")}
              />
              <Text style={styles.todoText}>Danh sách công việc cần làm</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.watch}>
            <PrimaryButton
              text="Thành viên"
              onPress={() => {
                navigation.navigate("memberScreen", { campaign, user });
              }}
            />
          </View>
          <View style={styles.phatqua}>
            <DefaultButton
              text="Mạnh thường quân"
              onPress={() => {
                navigation.navigate("sponsorScreen", { campaign, user });
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    position: "relative",
  },
  title: {
    fontFamily: "Noto-Serif",
    fontSize: 30,
  },
  line: {
    width: 300,
    backgroundColor: "grey",
    padding: 1,
    margin: 5,
    marginBottom: 10,
  },
  img: {
    width: 400,
    height: 250,
    alignSelf: "center",
    borderRadius: 25,
  },
  info1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  logo: {
    width: 45,
    height: 45,
  },
  sub1: {
    marginTop: 10,
    flexDirection: "row",
    margin: 10,
  },
  content: {
    paddingTop: 10,
  },
  percent: {
    paddingLeft: 70,
  },
  info2: {
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#F9FBFE",
    borderRadius: 8,
    width: 400,
    shadowOpacity: 0.2,
  },
  subinfo2: {
    padding: 6,
    marginLeft: 10,
  },
  watch: {
    width: 400,
    marginBottom: 20,
  },
  back: {
    width: 400,
  },
  phatqua: {
    width: 400,
    marginBottom: 50,
  },
  backbutton: {
    position: "relative",
    right: 190,
    width: 25,
    height: 25,
  },
  missionIcon: {
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  todoList: {
    backgroundColor: "#F8FAFB",
    width: 400,
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 8,
  },
  todoText: {
    fontFamily: "Noto-Serif",
    paddingTop: 15,
    paddingLeft: 15,
  },
});
export default CampaignDetail;
