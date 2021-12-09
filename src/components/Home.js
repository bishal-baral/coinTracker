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

  const [modalVisible, setModalVisible] = useState(false);
  const changeModalVisibility = useCallback(
    (bool) => setModalVisible(bool),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3E64FF" />
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => changeModalVisibility(false)}
      ></Modal>
      <CoinList navigation={navigation}/>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  itemBGImage: {
    ...StyleSheet.absoluteFillObject,
  },
});
