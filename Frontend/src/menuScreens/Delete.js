import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DELETE_ACCOUNT } from "../constants/alertConstants";
import { TEXTFIELD_BOR_PRIMARY, TEXT_PRIMARY } from "../themes/constants";

function Delete({ deleteAccount, setDeleteAccount }) {
  return (
    <Modal
      style={{
        backgroundColor: TEXTFIELD_BOR_PRIMARY,
      }}
      animationType="slide"
      transparent={true}
      visible={deleteAccount}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setDeleteAccount(!deleteAccount);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 15,
              textAlign: "center",
              fontSize: 20,
              color: TEXT_PRIMARY,
            }}
          >
            Are you sure you want to delete your account?
          </Text>
          <Text style={styles.modalText}>{DELETE_ACCOUNT}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.button,
                {
                  borderBottomLeftRadius: 5,
                  borderTopWidth: 1,
                  borderEndWidth: 1,
                },
              ]}
              onPress={() => {
                setDeleteAccount(false);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.button,
                {
                  borderBottomRightRadius: 5,
                  borderTopWidth: 1,
                  borderStartWidth: 1,
                },
              ]}
              onPress={() => {
                setDeleteAccount(false);
              }}
            >
              <Text style={styles.buttonDelete}>Delete</Text>
            </TouchableOpacity>
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
    color: TEXTFIELD_BOR_PRIMARY,
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
    backgroundColor: "#293d58",
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
    backgroundColor: "#293d58",
    alignItems: "center",
  },
  modalText: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    textAlign: "center",
    color: TEXT_PRIMARY,
  },
});

export default Delete;
