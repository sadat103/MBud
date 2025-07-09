import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import * as Progress from "react-native-progress";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  ActiveBar,
  CardBorder,
  CardCustom,
  Circle,
} from "../comComponent/CardCustom";
import { DAYS, STATS } from "../constants/commonConstants";
import { viewStyles } from "../themes/commonStyles";

const Profile = () => {
  const [active, setActive] = useState({
    key: 0,
    active: true,
  });

  return (
    <SafeAreaView style={viewStyles.container}>
      <ScrollView
        style={{
          width: "100%",
          gap: 10,
          flex: 1,
        }}
      >
        <CardCustom
          style={{
            flex: 1,
            height: "10%",
            width: "100%",
            backgroundColor: "#2196F3",
            justifyContent: "space-between",
            alignItems: "center", // Centered horizontally
            marginBottom: "2%",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  viewStyles.sectionTitle,
                  {
                    fontSize: 20,
                    textAlign: "left",
                  },
                ]}
              >
                Name
              </Text>
              <Text
                style={[
                  viewStyles.sectionTitle,
                  {
                    fontSize: 20,
                    textAlign: "right",
                    paddingTop: "2%",
                  },
                ]}
              >
                Sadat
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  viewStyles.sectionTitle,
                  {
                    fontSize: 20,
                    textAlign: "left",
                  },
                ]}
              >
                Age:
              </Text>
              <Text
                style={[
                  viewStyles.sectionTitle,
                  {
                    fontSize: 20,
                    textAlign: "right",
                    paddingTop: "2%",
                  },
                ]}
              >
                26
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  viewStyles.sectionTitle,
                  {
                    fontSize: 20,
                    textAlign: "left",
                  },
                ]}
              >
                Location:
              </Text>
              <Text
                style={[
                  viewStyles.sectionTitle,
                  {
                    fontSize: 20,
                    textAlign: "right",
                    paddingTop: "2%",
                  },
                ]}
              >
                Dhaka
              </Text>
            </View>
          </View>
        </CardCustom>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
