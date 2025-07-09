// CustomInput.js
import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  View,
  Image,
} from "react-native";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value, editable, selectTextOnFocus },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const [hide, setHide] = useState(true);

  const HIDE_PNG = require("../../assets/hide.png");
  const VIEW_PNG = require("../../assets/view.png");

  const hasError = errors[name] && touched[name];

  return (
    <>
      {name === "password" || name === "conPassword" ? (
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              marginLeft: 10,
              paddingRight: 0,
              flexWrap: "wrap",
              borderWidth: 1,
              borderColor: TEXTFIELD_BOR_PRIMARY,
              borderRadius: 10,
              padding: 10,
              borderRadius: 16,
              backgroundColor: SIDEBAR_BACK_PRIMARY,
              width: "100%",
              height: 50,
            },
            hasError && styles.errorInput,
            !hasError && styles.marginBtm,
          ]}
        >
          <TextInput
            value={value}
            onChangeText={(text) => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            style={[styles.pasTheme]}
            secureTextEntry={hide}
          />
          <Pressable
            onPress={() => {
              setHide(!hide);
            }}
          >
            <Image
              source={hide ? HIDE_PNG : VIEW_PNG}
              style={{
                paddingTop: 10,
                width: 18,
                height: 18,
                marginRight: 15,
                tintColor: TEXTFIELD_BOR_PRIMARY,
              }}
            />
          </Pressable>
        </View>
      ) : (
        <>
          <TextInput
            style={[
              styles.textInput,
              hasError && styles.errorInput,
              !hasError && styles.marginBtm,
            ]}
            onChangeText={(text) => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
        </>
      )}
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
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
  },
  errorText: {
    marginTop: 2,
    marginLeft: 11,
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  marginBtm: {
    marginBottom: 10,
  },
  passwordStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 10,
    paddingRight: 0,
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: TEXTFIELD_BOR_PRIMARY,
    borderRadius: 10,
    padding: 10,
    borderRadius: 16,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
  pasTheme: {
    flex: 1,
    color: TEXT_PRIMARY,
  },
});

export default CustomInput;
