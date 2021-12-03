import React, { useState, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import CoinList from "./CoinList";

const Home = ({ navigation }) => {
  const [sortTarget, setSortTarget] = useState("market_cap_desc");
  const [modalVisible, setModalVisible] = useState(false);
  const changeModalVisibility = useCallback(
    (bool) => setModalVisible(bool),
    []
  );

  const setData = (option) => {
    setSortTarget(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3E64FF" />
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => changeModalVisibility(false)}
      ></Modal>
      <CoinList navigation={navigation} order={sortTarget} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // marginTop: StatusBar.currentHeight || 48,
    paddingBottom: 80,
  },
  itemBGImage: {
    ...StyleSheet.absoluteFillObject,
  },
});
