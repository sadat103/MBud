import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const styles = StyleSheet.create({
  card: {
    shadowColor: "#343541",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 15,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
  cardBorder: {
    borderColor: "blue",
    borderWidth: 2,
    backgroundColor: "#00000000",
    padding: 20,
    opacity: 0.7,
    borderRadius: 20,
  },
});

const activeViewstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#00000000",
    borderRadius: 5,
  },
  activeButton: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F4EAFC",
    borderWidth: 0,
    borderRadius: 20,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "black",
  },
  activeButtonText: {
    fontWeight: "bold",
    color: "#AA53F6",
  },
});

export const CardCustom = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export const CardBorder = (props) => {
  return (
    <View style={{ ...styles.cardBorder, ...props.style }}>
      {props.children}
    </View>
  );
};

export const Circle = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "blue",
        borderWidth: 2,
        backgroundColor: "#00000000",
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
};

export const VerticalBorderView = () => {
  <View
    style={{
      width: 2,
      backgroundColor: "black",
      height: 45,
    }}
  />;
};

export function ActiveBar({ active, name, setActive, index }) {
  const handlePress = () => {
    setActive({
      key: index,
      active: true,
    });
  };
  return (
    <View key={index} style={activeViewstyles.container}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          activeViewstyles.button,
          active.key === index && activeViewstyles.activeButton,
        ]}
      >
        <Text
          style={[
            activeViewstyles.buttonText,
            active.key === index && activeViewstyles.activeButtonText,
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
