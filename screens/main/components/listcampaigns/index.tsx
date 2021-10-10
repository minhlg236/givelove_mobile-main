import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { formatDate } from "../../../../helpers";
import { IUser } from "../../../../interfaces/user.interface";
import useCampaignsByManagerId from "../../hooks/useCampaignsByManagerId";
import useCampaignsByUserId from "../../hooks/useCampaignsByUserId";
interface Campaign {
  name: string;
  desc: string;
  img: string;
  status: string;
}
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userId: string;
  user: IUser;
}
const ListCampaign: FC<Props> = ({ navigation, userId, user }: Props) => {
  var response;
  if (user.role === "Member") {
    response = useCampaignsByUserId(userId);
  } else if (user.role === "Manager") {
    response = useCampaignsByManagerId(userId);
  }
  const { data } = response;

  return (
    <>
      <ScrollView>
        {data?.data?.map((campaign, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              navigation.navigate("CampaignDetail", {
                campaign: campaign,
                user: user,
              });
            }}
          >
            <View style={styles.card}>
              <Image
                style={styles.img}
                source={{
                  uri: campaign.image,
                }}
              />
              <View style={styles.desc}>
                <View style={styles.overview}>
                  <Text style={styles.title}>{campaign.name}</Text>
                  {campaign.state && (
                    <Text style={styles.status}>● Đang hoạt động</Text>
                  )}
                </View>

                <Text style={styles.location}>
                  Địa điểm : {campaign.location}
                </Text>
                <Text style={styles.location}>
                  Ngày bắt đầu: {formatDate(campaign.startDate)}
                </Text>
                <Text>Ngày kết thúc: {formatDate(campaign.endDate)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 370,
    height: 200,
    alignSelf: "center",
    borderRadius: 8,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 1,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    alignSelf: "center",
    width: 370,
    marginBottom: 30,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  status: {
    color: "green",
    position: "absolute",
    right: 10,
    top: 15,
  },
  overview: {
    paddingTop: 10,
    flexDirection: "row",
  },
  desc: {
    padding: 10,
  },
  location: {
    paddingBottom: 5,
  },
});
export default ListCampaign;
