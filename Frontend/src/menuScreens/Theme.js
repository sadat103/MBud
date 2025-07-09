import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  SIDEBAR_BACK_PRIMARY,
  TEXTFIELD_TEXT_PRIMARY,
  THEMES_COLOR,
  ZET_BLACK,
} from "../themes/constants";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: SIDEBAR_BACK_PRIMARY,
    width: "100%",
  },
  Middle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

function Theme({ setBackColor, colorChangePending, setColorChangePending }) {
  const [fontLoaded, setFondLoaded] = useState(false);

  let customFonts = {
    ZCOOLXiaoWei: require("../../assets/fonts/ZCOOLXiaoWei-Regular.ttf"),
  };

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFondLoaded(true);
  };

  useEffect(() => {
    _loadFontsAsync();
  }, []);

  if (!fontLoaded) {
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>;
  }

  return (
    <>
      {fontLoaded && (
        <FlatList
          data={THEMES_COLOR}
          numColumns={2} // Number of columns in the grid
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setBackColor(item);
                }}
                style={{
                  flex: 1,
                  borderWidth: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#343541",
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 6,
                  shadowOpacity: 0.26,
                  elevation: 15,
                  height: 170,
                  backgroundColor: item.color,
                  padding: 20,
                }}
              >
                <View style={styles.Middle} key={item.id}>
                  {item.background ? (
                    <Text
                      style={{
                        fontSize: 18,
                        //fontFamily: "ZCOOLXiaoWei",
                        color: ZET_BLACK,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        //fontFamily: "ZCOOLXiaoWei",
                        color: TEXTFIELD_TEXT_PRIMARY,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </>
  );
}

export default Theme;
