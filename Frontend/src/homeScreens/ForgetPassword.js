import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_BACK_OWN_PRIMARY,
} from "../themes/constants";
import { viewStyles } from "../themes/commonStyles";
import { TEXT_PRIMARY } from "../themes/constants";

function ForgetPassword() {
  const [hide, setHide] = useState(true);
  const HIDE_PNG = require("../../assets/hide.png");
  const VIEW_PNG = require("../../assets/hide.png");
  let icon = hide ? HIDE_PNG : VIEW_PNG;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Find your account</Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              color: TEXTFIELD_BOR_PRIMARY,
            }}
          >
            Enter the email associated with your account to change your
            password.
          </Text>
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <View style={styles.buttonStyle}>
          <Text
            style={[
              viewStyles.sectionTitle,
              {
                paddingBottom: 5,
                paddingLeft: 10,
                fontSize: 18,
                textAlign: "left",
                color: TEXTFIELD_BOR_PRIMARY,
              },
            ]}
          >
            Email
          </Text>
          <TextInput
            onChange={() => Keyboard.dismiss}
            // placeholder="Salam, Ask Anything!"
            // placeholderTextColor={TEXTFIELD_BOR_PRIMARY}
            style={{
              marginTop: 8,
              marginLeft: 10,
              paddingRight: 30,
              flexWrap: "wrap",
              color: TEXTFIELD_TEXT_PRIMARY,
              borderWidth: 1,
              borderColor: TEXTFIELD_BOR_PRIMARY,
              borderRadius: 10,
              padding: 10,
              borderRadius: 16,
              //fontFamily: "Lato_400Regular",
              backgroundColor: SIDEBAR_BACK_PRIMARY,
              width: "100%",
              height: 50,
              marginBottom: 10,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonDesign}
          onPress={() => navigation.navigate("Otp")}
        >
          <Text
            style={{
              color: TEXT_PRIMARY,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 13,
            }}
          >
            Send Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 50,
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Front")}
        >
          <Text
            style={{
              color: TEXT_BACK_OWN_PRIMARY,
            }}
          >
            {" "}
            Go to Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
    width: "100%",
    paddingRight: 20,
  },
  LoginText: {
    marginTop: 60,
    fontSize: 30,
    color: TEXT_PRIMARY,
    fontWeight: "bold",
  },
  Middle: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  signupText: {
    color: TEXT_BACK_OWN_PRIMARY,
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    marginTop: 50,
    borderRadius: 30,
    marginLeft: 20,
    height: 60,
    backgroundColor: "#1560BD",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
});
