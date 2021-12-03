import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";
import Graph from "./Graph";

const CryptoDetail = ({ route }) => {
  const [selected, setSelected] = useState(2);
  const buttons = ["day", "week", "month"];
  const { itemId } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={[styles.text, { color: "black" }]}>
        {`price trends`} (&#36;)
      </Text>
      <ButtonGroup
        buttons={buttons}
        onPress={setSelected}
        selectedIndex={selected}
      />
      <Graph coinId={itemId} selectedIndex={selected} />
    </View>
  );
};

CryptoDetail.propTypes = {
  itemId: PropTypes.string,
};

export default CryptoDetail;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 70,
    borderRadius: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 50,
  },
});
