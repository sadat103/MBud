import * as yup from "yup";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXT_BACK_OWN_PRIMARY,
} from "../themes/constants";
import { viewStyles } from "../themes/commonStyles";
import { TEXT_PRIMARY } from "../themes/constants";
import { AuthContext } from "../context/AuthContext";
import {
  emailValidation,
  passwordValidation,
} from "../utility/inputValidation";
import CustomInput from "../comComponent/CustomInput";
import ToastMessage from "../comComponent/Toast";
import { NORMAL } from "../constants/commonConstants";

function LogInNew() {
  const { login, setMessage, setRedirLogin, message, modeRef } =
    useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();

  const validationSchemaLogIn = yup.object({
    email: emailValidation,
    password: passwordValidation,
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Welcome back!</Text>
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
              color: TEXT_PRIMARY,
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchemaLogIn}
        onSubmit={(values) => {
          console.log(values);
          modeRef.current = NORMAL;
          login(values.email, values.password);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <View style={{ flex: 4 }}>
              <View style={styles.buttonStyle}>
                <>
                  <Text style={[viewStyles.sectionTitle, styles.LabelText]}>
                    Email
                  </Text>
                  <Field
                    component={CustomInput}
                    name="email"
                    keyboardType="email-address"
                  />
                  <Text style={[viewStyles.sectionTitle, styles.LabelText]}>
                    Password
                  </Text>
                  <Field component={CustomInput} name="password" />
                </>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={handleSubmit}
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
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingTop: 30,
                  paddingLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Forget")}
              >
                <Text
                  style={{
                    color: TEXT_BACK_OWN_PRIMARY,
                  }}
                >
                  {" "}
                  Forgotten Password?
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <ToastMessage
        logRedirect={false}
        backColor={"green"}
        position={-130}
        message={message}
        setMessage={setMessage}
        setRedirLogin={setRedirLogin}
      />
    </View>
  );
}

export default LogInNew;

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
  buttonStyle: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    borderRadius: 30,
    marginLeft: 20,
    height: 60,
    backgroundColor: "#1560BD",
  },
  LabelText: {
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 18,
    textAlign: "left",
    color: TEXTFIELD_BOR_PRIMARY,
  },
});
