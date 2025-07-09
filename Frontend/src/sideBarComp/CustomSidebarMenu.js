import React, { useContext } from "react";
import { Divider } from "react-native-paper";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  SIDEBAR_BACK_PRIMARY,
  SIGN_LOGIN_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";
import { AuthContext } from "../context/AuthContext";
import { FB, GOOGLE, NORMAL } from "../constants/commonConstants";
import { useNavigation } from "@react-navigation/native";
import { addNewCon } from "../apis/addNewCon";
import Spinner from "react-native-loading-spinner-overlay";

const CustomSidebarMenu = (props) => {
  const {
    setNewConAlert,
    newConAlert,
    setConv,
    conv,
    setMessages,
    setSelectedConv,
    setHistoryIndex,
  } = props;
  const navigation = useNavigation();
  const { auth, logOut, logoutGoogle, logoutFaceBook } =
    useContext(AuthContext);
  async function addNewConv() {
    setNewConAlert(true);
    const { newConv, err } = await addNewCon(
      auth.user_id,
      auth.token,
      auth.mode
    );
    if (newConv) {
      if (newConv.length !== 0) {
        let newAddedConv = [...conv];
        let idx = newAddedConv.findIndex((obj) => obj._id === newConv[0]._id);
        if (idx === -1) {
          newAddedConv.unshift({
            _id: "Today",
            conversation: newConv,
          });
          setConv(newAddedConv);
          setMessages(
            newAddedConv[0].conversation[
              newAddedConv[0].conversation.length - 1
            ].messageList
          );
          setSelectedConv(0);
        } else {
          newAddedConv[idx].conversation.unshift(newConv[0].conversation[0]);
          setConv(newAddedConv);
          setMessages(
            newAddedConv[idx].conversation[
              newAddedConv[idx].conversation.length - 1
            ].messageList
          );
          setSelectedConv(newAddedConv[idx].conversation.length - 1);
        }
      }

      setNewConAlert(false);
    } else if (err) {
      setNewConAlert(false);
    }
  }

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: SIDEBAR_BACK_PRIMARY, padding: 10 },
        newConAlert && {
          opacity: 0.7,
        },
      ]}
    >
      <Spinner
        visible={newConAlert}
        animation="slide"
        size={"large"}
        textContent={"Adding..."}
        textStyle={{
          color: SIGN_LOGIN_PRIMARY,
        }}
      />
      <Pressable style={styles.button} onPress={addNewConv}>
        <Ionicons name="add" size={24} color={TEXT_PRIMARY} />
        <Text style={styles.text}>{"New Chat"}</Text>
      </Pressable>
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingBottom: 15,
          top: 0,
        }}
      >
        {conv.map((itm, index) => (
          <>
            {itm.conversation.some((obj) => obj.name === "unknown") ? null : (
              <View key={index}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 5,
                    color: TEXTFIELD_BOR_PRIMARY,
                    paddingLeft: 5,
                    paddingBottom: 5,
                  }}
                >
                  {itm._id}
                </Text>
                {itm.conversation.map((msg, ind) => (
                  <View
                    key={ind}
                    style={{
                      flex: 11,
                      paddingLeft: 5,
                      marginLeft: 5,
                      paddingTop: 5,
                      paddingBottom: 10,
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Image
                        source={require("../../assets/chat2.png")}
                        style={{
                          width: 18,
                          height: 18,
                          marginRight: 15,
                          tintColor: TEXT_PRIMARY,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 8,
                      }}
                    >
                      <Text
                        style={{ fontSize: 15, color: TEXTFIELD_TEXT_PRIMARY }}
                        onPress={() => {
                          setHistoryIndex(index);
                          setSelectedConv(ind);
                          setMessages(
                            conv[index].conversation[ind].messageList
                          );
                        }}
                      >
                        {msg.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        source={require("../../assets/pencil.png")}
                        style={{
                          width: 18,
                          height: 18,
                          marginRight: 15,
                          tintColor: TEXT_PRIMARY,
                        }}
                      />
                      <Image
                        source={require("../../assets/trash.png")}
                        style={{
                          width: 18,
                          height: 18,
                          marginRight: 15,
                          tintColor: TEXT_PRIMARY,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        ))}
      </DrawerContentScrollView>
      <Divider theme={{ colors: { primary: TEXT_PRIMARY } }} />
      <Pressable
        style={{
          paddingLeft: 5,
          paddingTop: 15,
          paddingBottom: 5,
          flexDirection: "row",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        onPress={() => {
          console.log(auth);
          if (auth.mode === NORMAL) {
            logOut();
          } else if (auth.mode === FB) {
            logoutFaceBook();
          } else if (auth.mode === GOOGLE) {
            logoutGoogle();
          }
        }}
      >
        <View
          style={{
            paddingLeft: 8,
          }}
        >
          <Image
            source={require("../../assets/crown2.png")}
            style={{
              width: 20,
              height: 20,
              marginRight: 15,
              //tintColor: TEXT_PRIMARY,
            }}
          />
        </View>
        <View style={{ paddingLeft: 2 }}>
          <Text style={{ fontSize: 15, color: TEXT_PRIMARY }}>
            Upgrade to Pro
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          paddingLeft: 5,
          paddingTop: 5,
          paddingBottom: 5,
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            paddingLeft: 5,
          }}
        >
          <Image
            source={
              props.userInfo.image
                ? {
                    uri: props.userInfo.image,
                  }
                : require("../../assets/user.png")
            }
            style={[
              {
                width: 24,
                height: 24,
                marginRight: 15,
              },
              !props.userInfo.image && {
                tintColor: TEXT_PRIMARY,
              },
            ]}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text style={{ fontSize: 15, color: TEXT_PRIMARY }}>
            {props.userInfo ? props.userInfo.name : ""}
          </Text>

          <Image
            source={require("../../assets/more.png")}
            style={{
              width: 18,
              height: 18,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    marginLeft: 10,
    paddingRight: 20,
    paddingLeft: 5,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 45,
    width: "96%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: TEXTFIELD_BOR_PRIMARY,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
  },
  text: {
    paddingLeft: 10,
    fontSize: 16,
    textAlign: "left",
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default CustomSidebarMenu;
