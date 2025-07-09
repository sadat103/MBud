import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: "0%",
    marginTop: "10%",
    paddingLeft: "0%",
    gap: 5,
    backgroundColor: "#343541",
    alignItems: "center", // Centered horizontally
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    borderRadius: 10,
  },
  sectionTitle: {
    //fontSize: 24,
    fontWeight: "600",
    color: Colors.white,
  },
  card: {
    height: "20%",
    width: "100%",
    backgroundColor: "#2196F3",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
});
