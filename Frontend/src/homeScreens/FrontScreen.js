import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";
import { AuthContext } from "../context/AuthContext";
import { FB, GOOGLE } from "../constants/commonConstants";

function FrontScreen(props) {
  const { promptAsyncGoogle, promptAsyncFB, modeRef } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        props.isLoading && {
          opacity: 0.7,
        },
      ]}
    >
      <>
        <View style={styles.Top}>
          <Text style={styles.LoginText}>MuslimBud</Text>
        </View>

        <View style={styles.Middle}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              modeRef.current = GOOGLE;
              promptAsyncGoogle();
            }}
          >
            <View style={styles.buttonDesign}>
              <Image
                source={require("../../assets/google.png")}
                style={{
                  width: 17,
                  height: 17,
                }}
              />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              modeRef.current = FB;
              promptAsyncFB();
            }}
          >
            <View style={styles.buttonDesign}>
              <Image
                source={require("../../assets/facebook.png")}
                style={{
                  width: 17,
                  height: 17,
                }}
              />
              <Text style={styles.buttonText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyle}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: TEXTFIELD_BOR_PRIMARY,
              }}
            />
            <View>
              <Text
                style={{
                  width: 50,
                  textAlign: "center",
                  color: TEXTFIELD_BOR_PRIMARY,
                }}
              >
                Or
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: TEXTFIELD_BOR_PRIMARY,
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("Signup")}
          >
            <View style={styles.buttonDesign}>
              <Text style={styles.buttonText}>Create account</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Bottom}>
          <View
            style={{
              paddingTop: 50,
              width: "100%",
            }}
          >
            <View
              style={{
                paddingTop: 20,
                flexDirection: "row",
                width: "110%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text style={styles.bottomText}>
                By signing up, you agree to our
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.linkText}>Terms,</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.linkText}>Privacy Policy </Text>
              </TouchableOpacity>
              <Text style={styles.bottomText}>and</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.linkText}>Cookie Use.</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 40,
                flexDirection: "row",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={styles.bottomText}>Have an account already?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    </View>
  );
}

export default FrontScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 11,
    width: "100%",
    paddingRight: 30,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
    color: TEXTFIELD_TEXT_PRIMARY,
  },
  Top: {
    flex: 3,
    paddingLeft: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Middle: {
    flex: 5,
    paddingLeft: 30,
    height: "50%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Bottom: {
    flex: 3,
    paddingLeft: 15,
    paddingRight: 10,
    height: "50%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    borderRadius: 20,
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    paddingLeft: 10,
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontWeight: 500,
  },
  bottomText: {
    textAlign: "left",
    color: TEXTFIELD_BOR_PRIMARY,
    fontSize: 14,
  },
  linkText: {
    paddingLeft: 5,
    paddingTop: 0,
    fontSize: 15,
    fontWeight: 500,
    color: TEXT_PRIMARY,
  },
  buttonDesign: {
    borderRadius: 25,
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: TEXT_PRIMARY,
    borderColor: TEXTFIELD_BOR_PRIMARY,
    borderWidth: 2,
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
