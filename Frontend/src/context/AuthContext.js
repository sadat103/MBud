import React, { createContext, useRef, useState } from "react";
import { logIn } from "../apis/postLogin";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fblogOUT, googlelogOUT, logOUT } from "../apis/logOut";
import {
  ANDROID_CLIENT_ID,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  FB_CLIENT_ID,
  IOS_CLIENT_ID,
} from "../constants/idConstant";
import { signUp } from "../apis/signUp";
import { useNavigation } from "@react-navigation/native";
import { otpPost } from "../apis/otpPost";
import { fbLoggedIn, googleLoggedIn } from "../apis/getLogged";
import {
  FB,
  GOOGLE,
  NORMAL,
  USER_INFO,
  GOOGLE_FB_SESSION,
} from "../constants/commonConstants";
import { tokenValid, tokenValidFb } from "../apis/tokenValidate";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [otpVerified, setOtpVerified] = useState(false);
  const [redirLogin, setRedirLogin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    user_id: "",
  });
  const [auth, setAuth] = useState(null);
  const modeRef = useRef(GOOGLE);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useAuthRequest({
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      responseType: "code",
      prompt: "consent",
      extraParams: {
        access_type: "offline",
      },
    });

  const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
    clientId: FB_CLIENT_ID,
  });

  useEffect(() => {
    async function logORSignInInit() {
      if (modeRef.current === GOOGLE) {
        if (responseGoogle && responseGoogle?.type === "success") {
          setIsLoading(true);
          const { loggedData, err } = await googleLoggedIn(
            responseGoogle.authentication.accessToken,
            responseGoogle.authentication.refreshToken
          );
          //console.log(loggedData);
          if (loggedData) {
            modeRef.current = GOOGLE;
            const persistAuth = async () => {
              await AsyncStorage.setItem(
                GOOGLE_FB_SESSION,
                JSON.stringify({
                  mode: GOOGLE,
                  user_id: loggedData.resultPerson._id,
                  token: responseGoogle.authentication.accessToken,
                })
              );
            };
            persistAuth();
            const persistUserInfo = async () => {
              await AsyncStorage.setItem(
                USER_INFO,
                JSON.stringify(loggedData.resultPerson)
              );
            };
            persistUserInfo();
            setAuth({
              mode: GOOGLE,
              user_id: loggedData.resultPerson._id,
              token: responseGoogle.authentication.accessToken,
            });
            setUserInfo(loggedData.resultPerson);
            setLoggedIn(true);
            setIsLoading(false);
          } else if (err) {
            setIsLoading(false);
            setLoggedIn(false);
          }
        }
      } else if (modeRef.current === FB) {
        if (responseFB && responseFB.type === "success") {
          setIsLoading(true);
          //console.log("here", responseFB.authentication.accessToken);
          const { loggedData, err } = await tokenValidFb(
            responseFB.authentication.accessToken
          );
          //console.log("here", loggedData);
          if (loggedData) {
            modeRef.current = FB;
            const persistAuth = async () => {
              await AsyncStorage.setItem(
                GOOGLE_FB_SESSION,
                JSON.stringify({
                  mode: FB,
                  user_id: loggedData.resultPerson._id,
                  token: loggedData.token,
                })
              );
            };
            persistAuth();
            const persistUserInfo = async () => {
              await AsyncStorage.setItem(
                USER_INFO,
                JSON.stringify(loggedData.resultPerson)
              );
            };
            persistUserInfo();
            setAuth({
              mode: FB,
              user_id: loggedData.resultPerson._id,
              token: loggedData.token,
            });
            setUserInfo(loggedData.resultPerson);
            setIsLoading(false);
            setLoggedIn(true);
          } else if (err) {
            setIsLoading(false);
            setLoggedIn(false);
          }
        }
      } else {
        setIsLoading(false);
        setLoggedIn(false);
      }
    }

    logORSignInInit();
  }, [responseFB, responseGoogle]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem(GOOGLE_FB_SESSION);
      const jsonUserInfo = await AsyncStorage.getItem(USER_INFO);
      if (jsonValue !== null && jsonUserInfo !== null) {
        const authFromJson = JSON.parse(jsonValue);
        const userFromJson = JSON.parse(jsonUserInfo);
        console.log("auth", authFromJson, userFromJson);
        if (authFromJson.mode === GOOGLE) {
          console.log(
            "google",
            authFromJson.user_id,
            authFromJson.token,
            authFromJson.mode
          );
          setIsLoading(true);
          const { authData, err } = await tokenValid(
            authFromJson.user_id,
            authFromJson.token,
            authFromJson.mode
          );
          console.log("message", err);

          if (authData) {
            if (authData.message === "Token regenerated") {
              const persistAuth = async () => {
                await AsyncStorage.setItem(
                  GOOGLE_FB_SESSION,
                  JSON.stringify({
                    mode: GOOGLE,
                    user_id: authFromJson.user_id,
                    token: tokenData.accessToken,
                  })
                );
              };
              setAuth({
                mode: GOOGLE,
                user_id: authFromJson.user_id,
                token: tokenData.accessToken,
              });
              persistAuth();
              setUserInfo(userFromJson);
              setIsLoading(false);
              setLoggedIn(true);
            } else if (authData.message === "Not valid user") {
              AsyncStorage.removeItem(USER_INFO);
              AsyncStorage.removeItem(GOOGLE_FB_SESSION);
              setUserInfo(null);
              setAuth(null);
              setIsLoading(false);
              setLoggedIn(false);
            } else {
              setAuth(authFromJson);
              setUserInfo(userFromJson);
              setIsLoading(false);
              setLoggedIn(true);
            }
          } else if (err) {
            setIsLoading(false);
            setLoggedIn(false);
          }
        } else if (authFromJson.mode === FB) {
          setIsLoading(true);
          const { authData, err } = await fbLoggedIn(authFromJson.token);
          if (authData) {
            if (authData.message !== "Failed") {
              const persistAuth = async () => {
                await AsyncStorage.setItem(
                  GOOGLE_FB_SESSION,
                  JSON.stringify({
                    mode: FB,
                    user_id: authFromJson.user_id,
                    token: authData.token,
                  })
                );
              };
              setAuth({
                mode: FB,
                user_id: authFromJson.user_id,
                token: authData.token,
              });
              persistAuth();

              setUserInfo(userFromJson);
              setIsLoading(false);
              setLoggedIn(true);
            } else {
              setIsLoading(false);
              setLoggedIn(false);
            }
          } else if (err) {
            setIsLoading(false);
            setLoggedIn(false);
          }
        } else if (authFromJson.mode === NORMAL) {
          setIsLoading(true);
          if (userInfo) {
            const persistAuth = async () => {
              await AsyncStorage.setItem(
                GOOGLE_FB_SESSION,
                JSON.stringify({
                  mode: NORMAL,
                  user_id: authFromJson.user_id,
                  token: authFromJson.token,
                })
              );
            };
            setAuth({
              mode: NORMAL,
              user_id: authFromJson.user_id,
              token: authFromJson.token,
            });
            modeRef.current = NORMAL;
            persistAuth();
            setUserInfo(userFromJson);
            setIsLoading(false);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            setIsLoading(false);
          }
        }
      }
    };
    getPersistedAuth();
  }, []);

  async function signIn(authInfo) {
    const { name, email, password } = authInfo;
    setDisabled(true);
    const { signUpData, err } = await signUp(name, email, password);
    //console.log(signUpData, "here");
    if (signUpData) {
      if (signUpData.status) {
        setOtpVerified(true);
        setUserInfo(signUpData.data);
        setTimeout(function () {
          setDisabled(false);
          navigation.navigate("Otp");
        }, 2000);
      } else {
        setMessage(signUpData.message);
        setDisabled(false);
      }
    } else if (err) {
      setMessage(err);
      setDisabled(false);
    }
  }

  async function otpVerify(otp) {
    const { otpData, err } = await otpPost(userInfo.user_id, otp);
    //console.log(otpData);
    if (otpData) {
      if (otpData.status) {
        setMessage(otpData.message);
        if (redirLogin) {
          setOtpVerified(false);
          navigation.navigate("Login");
        }
      } else if (!otpData.status) {
        setOtpVerified(true);
        setMessage(otpData.message);
      }
    } else if (err) {
      setOtpVerified(true);
      setMessage(err);
    }
  }

  const login = async (email, password) => {
    //console.log(mode);
    if (modeRef.current === NORMAL) {
      setIsLoading(true);
      const { loginData, err } = await logIn(email, password);
      //console.log(loginData);
      if (loginData) {
        if (loginData.message === "success") {
          const persistAuth = async () => {
            await AsyncStorage.setItem(
              GOOGLE_FB_SESSION,
              JSON.stringify({
                mode: NORMAL,
                user_id: loginData.userInfo.id,
                token: loginData.token,
              })
            );
          };
          persistAuth();

          const persistUserInfo = async () => {
            await AsyncStorage.setItem(
              USER_INFO,
              JSON.stringify(loginData.userInfo)
            );
          };
          persistUserInfo();
          setAuth({
            mode: NORMAL,
            user_id: loginData.userInfo.id,
            token: loginData.token,
          });
          modeRef.current = NORMAL;
          setUserInfo(loginData.userInfo);
          setIsLoading(false);
          setLoggedIn(true);
        } else {
          setIsLoading(false);
          setLoggedIn(false);
        }
      } else if (err) {
        console.log(err.response);
        setLoggedIn(false);
        setIsLoading(false);
      }
    }
  };

  const logOut = async () => {
    if (auth.mode === NORMAL) {
      const { logoutData, err } = await logOUT();
      if (logoutData.message === "logged out") {
        AsyncStorage.removeItem(USER_INFO);
        AsyncStorage.removeItem(GOOGLE_FB_SESSION);
        setAuth(null);
        setLoggedIn(false);
        setIsLoading(false);
      } else if (err) {
        AsyncStorage.removeItem(USER_INFO);
        AsyncStorage.removeItem(GOOGLE_FB_SESSION);
        setAuth(null);
        setLoggedIn(false);
        setIsLoading(false);
      }
    }
  };

  const logoutGoogle = async () => {
    setIsLoading(true);
    const { logoutData, err } = await googlelogOUT(auth.token);
    if (logoutData) {
      if (logoutData.message === "Success") {
        AsyncStorage.removeItem(USER_INFO);
        AsyncStorage.removeItem(GOOGLE_FB_SESSION);
        setAuth(null);
        setLoggedIn(false);
        setIsLoading(false);
      } else {
        AsyncStorage.removeItem(USER_INFO);
        AsyncStorage.removeItem(GOOGLE_FB_SESSION);
        setAuth(null);
        setLoggedIn(false);
        setIsLoading(false);
      }
    } else if (err) {
      AsyncStorage.removeItem(USER_INFO);
      AsyncStorage.removeItem(GOOGLE_FB_SESSION);
      setAuth(null);
      setLoggedIn(false);
      setIsLoading(false);
    }
  };

  const logoutFaceBook = async () => {
    setIsLoading(true);
    const { logoutData, err } = await fblogOUT(auth.token);
    if (logoutData) {
      if (logoutData.message === "Success") {
        AsyncStorage.removeItem(USER_INFO);
        AsyncStorage.removeItem(GOOGLE_FB_SESSION);
        setAuth(null);
        setLoggedIn(false);
        setIsLoading(false);
      } else {
        setLoggedIn(true);
        setLoggedIn(false);
      }
    } else if (err) {
      setIsLoading(false);
      setLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        otpVerified,
        login,
        logOut,
        userToken,
        loggedIn,
        userInfo,
        isLoading,
        logoutGoogle,
        promptAsyncGoogle,
        promptAsyncFB,
        logoutFaceBook,
        signIn,
        otpVerify,
        message,
        setMessage,
        setRedirLogin,
        disabled,
        setOtpVerified,
        auth,
        modeRef,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
