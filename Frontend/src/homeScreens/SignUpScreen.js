import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik, Field } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useKeyboard } from "@react-native-community/hooks";
import * as yup from "yup";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXT_BACK_OWN_PRIMARY,
} from "../themes/constants";
import { viewStyles } from "../themes/commonStyles";
import { TEXT_PRIMARY } from "../themes/constants";
import {
  conPassValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../utility/inputValidation";
import CustomInput from "../comComponent/CustomInput";
import { AuthContext } from "../context/AuthContext";
import ToastMessage from "../comComponent/Toast";

function SignUpScreen() {
  const keyboard = useKeyboard();
  const { signIn, message, setMessage, disabled, setRedirLogin } =
    useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
  });
  const navigation = useNavigation();

  const validationSchemaSignUp = yup.object({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
    conPassword: conPassValidation,
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Create your account</Text>
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
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupText}> Log in </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 6, justifyContent: "space-around", paddingTop: 5 }}>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchemaSignUp}
          onSubmit={(values) => {
            console.log(values);
            signIn(values);
          }}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <ScrollView
                contentContainerStyle={[
                  styles.buttonStyle,
                  {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginBottom: !keyboard.keyboardShown
                      ? 10
                      : keyboard.keyboardHeight - 300,
                  },
                ]}
              >
                <Text style={[viewStyles.sectionTitle, styles.LabelText]}>
                  Name
                </Text>
                <Field
                  component={CustomInput}
                  name="name"
                  disabled={disabled}
                />
                <Text style={[viewStyles.sectionTitle, styles.LabelText]}>
                  Email
                </Text>
                <Field
                  // editable={disabled}
                  // selectTextOnFocus={disabled}
                  component={CustomInput}
                  name="email"
                  keyboardType="email-address"
                />
                <Text style={[viewStyles.sectionTitle, styles.LabelText]}>
                  Password
                </Text>
                <Field
                  component={CustomInput}
                  name="password"
                  disabled={disabled}
                />

                <Text style={[viewStyles.sectionTitle, styles.LabelText]}>
                  Confirm Password
                </Text>
                <Field
                  component={CustomInput}
                  name="conPassword"
                  disabled={disabled}
                />
              </ScrollView>

              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={handleSubmit}
                disabled={!isValid || disabled}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <ToastMessage
        logRedirect={false}
        backColor={"red"}
        position={-100}
        message={message}
        setMessage={setMessage}
        setRedirLogin={setRedirLogin}
      />
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
    width: "100%",
    paddingRight: 20,
  },
  LabelText: {
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 18,
    textAlign: "left",
    color: TEXTFIELD_BOR_PRIMARY,
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
    paddingRight: 30,
  },
  buttonText: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 13,
  },
  buttonDesign: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 30,
    marginLeft: 25,
    marginBottom: 20,
    marginTop: 15,
    marginRight: 15,
    height: 60,
    paddingLeft: 10,
    backgroundColor: "#1560BD",
  },
});
