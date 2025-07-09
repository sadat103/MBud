import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  BLUE_BACK,
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";
import { AuthContext } from "../context/AuthContext";
import { FB, GOOGLE } from "../constants/commonConstants";

function FrontScreenNew(props) {
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
      <View style={styles.Top}>
        <Text
          style={{
            fontSize: 40,
            marginTop: 70,
            color: TEXTFIELD_TEXT_PRIMARY,
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 30,
            color: TEXTFIELD_TEXT_PRIMARY,
            fontWeight: 400,
          }}
        >
          MuslimBud
        </Text>
      </View>

      <View style={styles.Middle}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            modeRef.current = GOOGLE;
            promptAsyncGoogle();
          }}
        >
          <View
            style={[
              styles.buttonDesign,
              {
                backgroundColor: BLUE_BACK,
              },
            ]}
          >
            <Text style={styles.buttonText}>Create account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            modeRef.current = FB;
            promptAsyncFB();
          }}
        >
          <View
            style={[
              styles.buttonDesign,
              {
                backgroundColor: SIDEBAR_BACK_PRIMARY,
              },
            ]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FrontScreenNew;

const styles = StyleSheet.create({
  container: {
    top: 200,
    borderRadius: 50,
    height: 592,
    width: "100%",
    backgroundColor: SIDEBAR_BACK_PRIMARY,
  },
  Top: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Middle: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    paddingLeft: 10,
    textAlign: "center",
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: 400,
  },
  buttonDesign: {
    borderRadius: 20,
    height: 60,
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: TEXT_PRIMARY,
    borderColor: BLUE_BACK,
    borderWidth: 2,
  },
});
