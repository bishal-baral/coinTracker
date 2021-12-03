import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Tab from "./Tab";

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("Track");
  const { routes } = state;
  const renderColor = (currentTab) =>
    currentTab === selected ? "white" : "black";

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    backgroundColor: "#3E64FF",
    width: 500,
    borderRadius: 100,
    padding: 20,
  },
});
