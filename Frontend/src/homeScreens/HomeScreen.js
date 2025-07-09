import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useKeyboard } from "@react-native-community/hooks";
import { styles } from "../themes/main";
import {
  BACKGROUND_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_BACK_BOT_PRIMARY,
  TEXT_BACK_OWN_PRIMARY,
  ZET_BLACK,
} from "../themes/constants";
import { messageSendPost } from "../apis/sendMessage";
import FeedbackModal from "../comComponent/FeedbackModal";
// import {
//   RewardedAd,
//   RewardedAdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";
// import { GOOGLE_AD_APP_ID } from "../constants/idConstant";

const { width } = Dimensions.get("window");

// const rewarded = RewardedAd.createForAdRequest(GOOGLE_AD_APP_ID, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });

const Chats = ({ item, clr, setFeedback, setFeedMessage }) => {
  var state = item.sender.name !== "ChatBot";
  return (
    <TouchableOpacity
      onLongPress={() => {
        if (!state) {
          setFeedback(true);
          setFeedMessage(item);
        }
      }}
      activeOpacity={0.8}
      style={[
        styles.pdlt10,
        styles.pdtp10,
        styles.pdrt10,
        styles.jStart,
        state ? styles.frowrev : styles.frow,
      ]}
    >
      <View
        style={[
          state ? messages.ownChat : messages.otherChat,
          state
            ? {
                backgroundColor: clr.color,
                borderRadius: 14,
              }
            : messages.myChat,
          state
            ? {
                marginLeft: 20,
              }
            : {
                marginRight: 20,
              },
        ]}
      >
        <Text
          style={[
            state
              ? {
                  lineHeight: 25,
                  color: clr.background ? ZET_BLACK : TEXTFIELD_TEXT_PRIMARY,
                }
              : {
                  lineHeight: 25,
                  color: TEXTFIELD_TEXT_PRIMARY,
                },
          ]}
        >
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = (props) => {
  const {
    messages,
    auth,
    historyIndex,
    selectedConv,
    setConv,
    setMessages,
    setMessageSendPending,
    setMessageSendError,
    conv,
    setSelectedConv,
    setHistoryIndex,
  } = props;
  const { messageSendPending } = props;
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(false);
  const [feedMessage, setFeedMessage] = useState("");
  const keyboard = useKeyboard();
  const flatListRef = useRef(null);
  const clr = props.backColor;

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     }
  //   );
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     (reward) => {
  //       console.log("User earned reward of ", reward);
  //     }
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  // if (!loaded) {
  //   return null;
  // }

  const scrollToBottom = () => {
    if (messages.length !== 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      });
    }
  };
  const RenderMessages = ({ item }) => {
    return (
      <Chats
        item={item}
        clr={clr}
        setFeedback={setFeedback}
        setFeedMessage={setFeedMessage}
      />
    );
  };

  async function handleMessage() {
    let msgs = messages.length === 0 ? [] : [...messages];
    msgs.push({
      conversation_id:
        messages.length === 0
          ? conv[historyIndex].conversation[selectedConv]._id
          : messages[0].conversation_id,
      text: message,
      sender: {
        name: "own",
      },
    });
    setMessage("");
    setMessages(msgs);
    setMessageSendPending(true);

    const { messageData, err } = await messageSendPost(
      auth.user_id,
      messages.length === 0
        ? conv[historyIndex].conversation[selectedConv]._id
        : messages[0].conversation_id,
      auth.mode,
      message,
      auth.token
    );
    if (messageData) {
      if (messageData.message === "Successful") {
        let currentMsg = [
          ...conv[historyIndex].conversation[selectedConv].messageList,
        ];
        currentMsg.push(messageData.data[0]);
        currentMsg.push(messageData.data[1]);
        let updatedConv = [...conv];
        updatedConv[historyIndex].conversation[selectedConv].name =
          messageData.updatedCon.name;
        updatedConv[historyIndex].conversation[selectedConv].isActive = "Today";
        updatedConv[historyIndex].conversation[selectedConv].delay =
          messageData.updatedCon.delay;
        updatedConv[historyIndex].conversation[selectedConv].updatedAt =
          messageData.updatedCon.updatedAt;
        updatedConv[historyIndex].conversation[selectedConv].messageList =
          currentMsg;

        let idx = updatedConv.findIndex((obj) => obj._id === "Today");
        const elementToMove =
          updatedConv[historyIndex].conversation[selectedConv];
        updatedConv[historyIndex].conversation.splice(selectedConv, 1);
        if (idx === -1) {
          updatedConv.unshift({
            _id: "Today",
            conversation: [elementToMove],
          });
        } else {
          updatedConv[idx].conversation.unshift(elementToMove);
        }
        setSelectedConv(0);
        setHistoryIndex(0);
        setConv(updatedConv);
        setMessages(currentMsg);
        setMessageSendPending(false);
      } else {
        setMessageSendPending(false);
        setMessageSendError(true);
      }
    } else if (err) {
      setMessageSendPending(false);
      setMessageSendError(true);
    }
    //rewarded.show();
  }

  const headerComponent = () => (
    <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.94)" }}></View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboarVerticalOffset={100}
      style={{
        flexDirection: "column",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: BACKGROUND_PRIMARY,
      }}
    >
      {messages && messages.length !== 0 ? (
        <FlatList
          ref={flatListRef}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          data={messages}
          renderItem={({ item }) => (
            <RenderMessages item={item} setFeedMessage={setFeedMessage} />
          )}
          keyExtractor={(item, index) => String(index)}
          ListHeaderComponent={headerComponent}
          stickyHeaderIndices={[0]}
          style={messages.list}
        />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              marginBottom: !keyboard.keyboardShown ? width / 1.7 : width / 3,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: TEXTFIELD_TEXT_PRIMARY,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              No messages. Start typing
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {messageSendPending && (
        <Text
          style={{
            textAlign: "center",
            color: TEXTFIELD_BOR_PRIMARY,
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: 500,
            marginTop: 8,
            marginBottom: 6,
          }}
        >
          MuslimBud is typing....
        </Text>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: BACKGROUND_PRIMARY,
          }}
        >
          <TextInput
            multiline={true}
            disabled={messageSendPending}
            onChangeText={(text) => setMessage(text)}
            placeholder="Salam, Ask Anything!"
            placeholderTextColor={TEXTFIELD_BOR_PRIMARY}
            style={{
              marginTop: 8,
              opacity: messageSendPending ? 0.7 : 1,
              marginLeft: 10,
              color: TEXTFIELD_TEXT_PRIMARY,
              borderWidth: 1,
              borderColor: TEXTFIELD_BOR_PRIMARY,
              borderRadius: 10,
              padding: 10,
              borderRadius: 16,
              backgroundColor: BACKGROUND_PRIMARY,
              width: width / 1.22,
              height: 50,
              marginBottom: !keyboard.keyboardShown
                ? 10
                : keyboard.keyboardHeight - 185,
            }}
          />
          <TouchableOpacity onPress={handleMessage}>
            <Image
              source={require("../../assets/up-arrow.png")}
              style={{
                marginTop: 16,
                width: 30,
                height: 30,
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      {feedback && (
        <FeedbackModal
          feedback={feedback}
          setFeedback={setFeedback}
          messages={feedMessage}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const messages = StyleSheet.create({
  ownChat: { maxWidth: width, padding: 10 },
  otherChat: { maxWidth: width, padding: 10 },
  list: {
    flex: 1,
    width: "100%",
  },
  myChat: {
    backgroundColor: TEXT_BACK_BOT_PRIMARY,
    borderRadius: 14,
  },
  frnChat: {
    backgroundColor: TEXT_BACK_OWN_PRIMARY,
    borderRadius: 14,
  },
});

export default HomeScreen;
