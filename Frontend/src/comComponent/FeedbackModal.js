import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DELETE_ACCOUNT } from "../constants/alertConstants";
import {
  BACKGROUND_PRIMARY,
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_BOR_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  TEXT_PRIMARY,
} from "../themes/constants";

function FeedbackModal({ feedback, setFeedback, messages }) {
  const [text, setText] = useState("");
  const [height, setHeight] = useState(50);
  const [showTextBox, setShowTextBox] = useState(false);
  function handleFeedback(params) {
    console.log("params");
  }

  return (
    <Modal
      style={{
        backgroundColor: BACKGROUND_PRIMARY,
      }}
      animationType="slide"
      transparent={true}
      visible={feedback}
      onRequestClose={() => {
        setFeedback(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setFeedback(false);
              }}
            >
              <Image
                source={require("../../assets/feedback.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 15,
                  tintColor: TEXT_PRIMARY,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>{messages.text}</Text>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require("../../assets/like.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 15,
                  tintColor: TEXT_PRIMARY,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFeedback(false);
              }}
            >
              <Image
                source={require("../../assets/dislike.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 15,
                  tintColor: TEXT_PRIMARY,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowTextBox(!showTextBox);
              }}
            >
              <Image
                source={require("../../assets/feedback.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 15,
                  tintColor: TEXT_PRIMARY,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {showTextBox && (
              <TextInput
                multiline={true}
                style={{
                  margin: 20,
                  paddingTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  color: TEXTFIELD_TEXT_PRIMARY,
                  borderWidth: 1,
                  borderColor: TEXTFIELD_BOR_PRIMARY,
                  borderRadius: 10,
                  borderRadius: 16,
                  backgroundColor: BACKGROUND_PRIMARY,
                  width: "80%",
                  height: 100,
                  marginBottom: 10,
                  textAlignVertical: "top",
                }}
                onChangeText={(text) => setText(text)}
                onContentSizeChange={(event) =>
                  setHeight(event.nativeEvent.contentSize.height)
                }
                value={text}
              />
            )}
            {showTextBox && (
              <TouchableOpacity onPress={handleFeedback}>
                <Image
                  source={require("../../assets/up-arrow.png")}
                  style={{
                    marginTop: 23,
                    width: 30,
                    height: 30,
                    marginRight: 15,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
    flexDirection: "column",
    color: BACKGROUND_PRIMARY,
  },
  row: {
    paddingTop: 1,
    flexDirection: "row",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: TEXTFIELD_BOR_PRIMARY,
  },
  button: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SIDEBAR_BACK_PRIMARY,
  },
  buttonText: {
    color: TEXT_PRIMARY,
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonDelete: {
    color: "#FE001A",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
    alignItems: "center",
  },
  modalText: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: TEXT_PRIMARY,
  },
});

export default FeedbackModal;
