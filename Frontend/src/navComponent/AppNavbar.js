import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../homeScreens/HomeScreen";
import MenuHome from "../menuScreens/MenuHome";
import { styles } from "../themes/main";
import SignUpScreen from "../homeScreens/SignUpScreen";
import CustomSidebarMenu from "../sideBarComp/CustomSidebarMenu";
import { useState } from "react";
import {
  BACKGROUND_PRIMARY,
  SIDEBAR_BACK_PRIMARY,
  SIGN_LOGIN_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";
import LogInNew from "../homeScreens/LogInNew";
import FrontScreen from "../homeScreens/FrontScreen";
import ForgetPassword from "../homeScreens/ForgetPassword";
import Otp from "../homeScreens/Otp";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Theme from "../menuScreens/Theme";
import { ColorContext } from "../context/ColorContext";
import { getAllConversations } from "../apis/getAllConversations";
import Privacy from "../menuScreens/Privacy";
import FrontScreenNew from "../homeScreens/FrontScreenNew";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require("../../assets/chat.png")}
          style={{
            width: 25,
            height: 25,
            marginLeft: 15,
            tintColor: TEXT_PRIMARY,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const NavigationDrawerStructureRight = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("MenuStack")}>
        {/*Donute Button Image */}
        <Image
          source={require("../../assets/settings-cog.png")}
          style={{
            width: 26,
            height: 26,
            marginRight: 15,
            tintColor: TEXT_PRIMARY,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const NavigateHome = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
        {/*Donute Button Image */}
        <Feather
          name="arrow-left"
          size={24}
          color={TEXTFIELD_BOR_PRIMARY}
          style={{
            paddingLeft: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function HomeStack({
  userInfo,
  setLoggedIn,
  backColor,
  isLoading,
  setIsLoading,
}) {
  const { auth } = useContext(AuthContext);
  const [id, setId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [messageSendPending, setMessageSendPending] = useState(false);
  const [messageSendError, setMessageSendError] = useState(false);
  const [conv, setConv] = useState([]);
  const [selectedConv, setSelectedConv] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [newConAlert, setNewConAlert] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
      const { allConversations, err } = await getAllConversations(
        auth.user_id,
        auth.token,
        auth.mode
      );
      if (allConversations) {
        if (allConversations.length === 0) {
          setMessages([]);
          setConv([]);
        } else {
          let convs = [];
          let td = allConversations.findIndex((idx) => idx._id === "Today");
          if (td !== -1) {
            convs.push(allConversations[td]);
          }
          let yd = allConversations.findIndex((idx) => idx._id === "Yesterday");
          if (yd !== -1) {
            convs.push(allConversations[yd]);
          }
          let pd = allConversations.findIndex(
            (idx) => idx._id === "Previous 30 Days"
          );
          if (pd !== -1) {
            convs.push(allConversations[pd]);
          }
          setConv(convs);
          setMessages(convs[0].conversation[0].messageList);
        }
        setSelectedConv(0);

        setIsLoading(false);
      } else if (err) {
        //console.log(err.response);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get("window").width / 1.1,
        },
        itemStyle: {
          borderRadius: 0,
          marginVertical: 0,
          borderBottomWidth: 0.5,
        },
      }}
      drawerContent={(props) => (
        <CustomSidebarMenu
          backColor={backColor}
          conv={conv}
          setConv={setConv}
          setId={setId}
          setMessages={setMessages}
          setLoggedIn={setLoggedIn}
          setSelectedConv={setSelectedConv}
          setHistoryIndex={setHistoryIndex}
          selectedConv={selectedConv}
          newConAlert={newConAlert}
          setNewConAlert={setNewConAlert}
          userInfo={userInfo}
          {...props}
        />
      )}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: (
            <View
              style={[
                styles.frow,
                styles.jCenter,
                styles.pdrt10,
                styles.pdlt10,
                styles.algnCenter,
              ]}
            >
              <Text
                style={
                  ([styles.fb],
                  {
                    fontSize: 22,
                    fontWeight: "bold",
                    color: TEXT_PRIMARY,
                  })
                }
              >
                {"MuslimBud"}
              </Text>
            </View>
          ),
          drawerPosition: "left",
          headerTitleAlign: "center",
          headerLeft: () => <NavigationDrawerStructure />,
          headerRight: () => <NavigationDrawerStructureRight />,
          headerStyle: {
            backgroundColor: BACKGROUND_PRIMARY, //Set Header coloR
          },
          headerShadowVisible: false,
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            userInfo={userInfo}
            id={id}
            backColor={backColor}
            messages={messages}
            conv={conv}
            auth={auth}
            selectedConv={selectedConv}
            historyIndex={historyIndex}
            setConv={setConv}
            setMessageSendPending={setMessageSendPending}
            setMessageSendError={setMessageSendError}
            messageSendError={messageSendError}
            messageSendPending={messageSendPending}
            setMessages={setMessages}
            setSelectedConv={setSelectedConv}
            setHistoryIndex={setHistoryIndex}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function MenuStack({
  setBackColor,
  colorChangePending,
  setColorChangePending,
}) {
  return (
    <Stack.Navigator
      initialRouteName="Menus"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: SIDEBAR_BACK_PRIMARY },
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          color: TEXT_PRIMARY,
        },
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={MenuHome}
        options={{
          title: (
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {"Settings"}
            </Text>
          ),
          headerShown: true,
          headerLeft: () => <NavigateHome />,
        }}
      />
      <Stack.Screen
        name="Theme"
        options={{
          title: (
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {"Theme"}
            </Text>
          ),
          headerShown: true,
          headerLeft: () => <NavigateHome />,
        }}
      >
        {(props) => (
          <Theme
            setBackColor={setBackColor}
            colorChangePending={colorChangePending}
            setColorChangePending={setColorChangePending}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Privacy Policy"
        options={{
          title: (
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {"Privacy Policy"}
            </Text>
          ),
          headerShown: true,
          headerLeft: () => <NavigateHome />,
        }}
      >
        {(props) => <Privacy />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppNavbar() {
  const { userInfo, isLoading, loggedIn, otpVerified, setIsLoading } =
    useContext(AuthContext);
  const { backColor, setBackColor, colorChangePending, setColorChangePending } =
    useContext(ColorContext);

  const Tab = createBottomTabNavigator();

  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignContent: "center",
  //         backgroundColor: SIDEBAR_BACK_PRIMARY,
  //       }}
  //     >
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );
  // }

  return (
    <>
      <Spinner
        visible={isLoading}
        animation="slide"
        size={"large"}
        textContent={"Loading..."}
        textStyle={{
          color: SIGN_LOGIN_PRIMARY,
        }}
      />
      {!loggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Front">
            {(props) => (
              <FrontScreenNew
                {...props}
                loggedIn={loggedIn}
                userInfo={userInfo}
                isLoading={isLoading}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Login">
            {(props) => (
              <LogInNew {...props} loggedIn={loggedIn} userInfo={userInfo} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Forget">
            {(props) => (
              <ForgetPassword
                {...props}
                loggedIn={loggedIn}
                userInfo={userInfo}
              />
            )}
          </Stack.Screen>
          {otpVerified && (
            <Stack.Screen name="Otp">
              {(props) => (
                <Otp {...props} loggedIn={loggedIn} userInfo={userInfo} />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            activeTintColor: "#2F7C6E",
            inactiveTintColor: "#222222",
          }}
        >
          <Tab.Screen
            name="HomeStack"
            options={{
              tabBarStyle: { display: "none" },
              tabBarLabel: "Home",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          >
            {(props) => (
              <HomeStack
                userInfo={userInfo}
                loggedIn={loggedIn}
                backColor={backColor}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="MenuStack"
            options={{
              headerShown: false,
              tabBarStyle: { display: "none" },
              tabBarLabel: "Menus",
              // headerLeft: () => (
              //   <Feather name="arrow-left" size={24} color="black" />
              // ),
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name="settings" color={color} size={size} />
              ),
            }}
          >
            {(props) => (
              <MenuStack
                userInfo={userInfo}
                setBackColor={setBackColor}
                colorChangePending={colorChangePending}
                setColorChangePending={setColorChangePending}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </>
  );
}

export default AppNavbar;
