// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { viewStyles } from "../themes/commonStyles";
import { MENUS } from "../constants/commonConstants";
import { CardCustom } from "../comComponent/CardCustom";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";
import Delete from "./Delete";
import History from "./History";

const MenuHome = ({ route, navigation }) => {
  const [deleteAccount, setDeleteAccount] = React.useState(false);

  const [historyRemove, setHistoryRemove] = React.useState(false);

  return (
    <ScrollView
      style={{
        width: "100%",
        gap: 10,
        flex: 1,
        backgroundColor: SIDEBAR_BACK_PRIMARY,
        opacity: deleteAccount ? 0.9 : 1,
      }}
    >
      {MENUS.map((el, index) => (
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingLeft: 2,
            marginBottom: 5,
            marginLeft: 5,
            paddingRight: 12,
          }}
          key={index}
        >
          <Text
            style={[
              viewStyles.sectionTitle,
              {
                paddingBottom: 10,
                paddingLeft: 5,
                fontSize: 18,
                textAlign: "left",
                color: TEXTFIELD_BOR_PRIMARY,
              },
            ]}
          >
            {el.label}
          </Text>
          {el.content.map((cont, idx) => (
            <CardCustom
              key={idx}
              style={{
                flex: 2,
                height: 70,
                width: "100%",
                backgroundColor: "#1e2c40",
                justifyContent: "space-between",
                marginBottom: 5,
                alignItems: "center", // Centered horizontally
              }}
            >
              <Pressable
                style={{
                  flex: 2,
                  width: "100%",
                  backgroundColor: "#1e2c40",
                  justifyContent: "space-between",
                  alignItems: "center", // Centered horizontally
                }}
                onPress={() => {
                  if (cont.name === "Theme") {
                    navigation.navigate("Theme", { screen: el.name });
                  } else if (cont.name === "Privacy Policy") {
                    navigation.navigate("Privacy Policy", { screen: el.name });
                  } else if (cont.name === "Delete Account") {
                    setDeleteAccount(true);
                  } else if (cont.name === "Clear History") {
                    setHistoryRemove(true);
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {cont.icon}
                    <Text
                      style={[
                        viewStyles.sectionTitle,
                        {
                          fontSize: 20,
                          textAlign: "left",
                          color: TEXT_PRIMARY,
                        },
                      ]}
                    >
                      {cont.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </CardCustom>
          ))}
        </View>
      ))}
      {deleteAccount && (
        <Delete
          deleteAccount={deleteAccount}
          setDeleteAccount={setDeleteAccount}
        />
      )}
      {historyRemove && (
        <History
          historyRemove={historyRemove}
          setHistoryRemove={setHistoryRemove}
        />
      )}
    </ScrollView>
  );
};
export default MenuHome;
