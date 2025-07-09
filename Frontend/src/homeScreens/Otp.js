import React, { useContext, useState } from "react";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXT_BACK_OWN_PRIMARY,
} from "../themes/constants";
import { viewStyles } from "../themes/commonStyles";
import { TEXT_PRIMARY } from "../themes/constants";
import { AuthContext } from "../context/AuthContext";
import ToastMessage from "../comComponent/Toast";

function Otp() {
  const { otpVerify, setRedirLogin, setMessage, message } =
    useContext(AuthContext);
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Enter your code </Text>
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
            We need to confirm that you authorized changes to your account.
          </Text>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <View style={styles.buttonStyle}>
          <Text
            style={[
              viewStyles.sectionTitle,
              {
                paddingBottom: 5,
                paddingLeft: 10,
                fontSize: 18,
                textAlign: "left",
                color: TEXT_PRIMARY,
              },
            ]}
          >
            Enter the 4-digit code we sent your email
          </Text>
          <View
            style={{
              paddingTop: 20,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SmoothPinCodeInput
              cellSize={50}
              codeLength={4}
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: "gray",
              }}
              cellStyleFocused={{
                borderColor: "black",
              }}
              textStyle={{
                fontSize: 37,
                fontWeight: "bold",
                color: TEXT_PRIMARY,
              }}
              value={code}
              onFulfill={(code) => {
                otpVerify(code);
              }}
              onTextChange={(code) => setCode(code)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 50,
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            otpVerify(code);
          }}
        >
          <Text
            style={{
              color: TEXT_BACK_OWN_PRIMARY,
            }}
          >
            Resend code
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            marginTop: 50,
            paddingTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: TEXTFIELD_BOR_PRIMARY,
            }}
          >
            Don't have access to your email?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}> Contact us</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: TEXTFIELD_BOR_PRIMARY,
            }}
          >
            {" "}
            for help.
          </Text>
        </View>
      </View>
      <ToastMessage
        logRedirect={true}
        backColor={"green"}
        position={-130}
        message={message}
        setMessage={setMessage}
        setRedirLogin={setRedirLogin}
      />
    </View>
  );
}

export default Otp;

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
