import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Preferences = () => {
  return (
    <View style={styles.container}>
      <Text> This page would include the user preferences for the app. </Text>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
