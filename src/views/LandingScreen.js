import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,

} from "react-native";
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3E64FF" />
      <View style={styles.header}>
        <Animatable.Image
          animation='bounceIn'
          source={require('../assets/coins.png')}
          style={{ marginLeft: 250, width: 50, height: 50,}}
          resizeMode='stretch'
        />
          <Animatable.Image
          animation='bounceIn'
          source={require('../assets/bitcoin.png')}
          style={{ marginRight: 250, width: 50, height: 50,}}
          resizeMode='stretch'
        /> 
                <Animatable.Image
          animation='bounceIn'
          source={require('../assets/ethereum.png')}
          style={{  width: 50, height: 50,}}
          resizeMode='stretch'
        />
                <Animatable.Image
          animation='bounceIn'
          source={require('../assets/iota.png')}
          style={{ marginLeft: 250, width: 50, height: 50,}}
          resizeMode='stretch'
        />
                <Animatable.Image
          animation='bounceIn'
          source={require('../assets/money.png')}
          style={{ marginRight: 250, width: 50, height: 50,}}
          resizeMode='stretch'
        />
                        <Animatable.Image
          animation='bounceIn'
          source={require('../assets/neo.png')}
          style={{ marginLeft: 150, width: 50, height: 50,}}
          resizeMode='stretch'
        />
                        <Animatable.Image
          animation='bounceIn'
          source={require('../assets/ripple.png')}
          style={{ marginRight: 150, width: 50, height: 50,}}
          resizeMode='stretch'
        />
                        <Animatable.Image
          animation='bounceIn'
          source={require('../assets/tether.png')}
          style={{ marginLeft: 250, width: 50, height: 50,}}
          resizeMode='stretch'
        />
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.surface,
            alignItems: "center",
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: "#3E64FF",
            },
          ]}
        >
          coinTracker
        </Text>
        <Text style={styles.text}>
          one place to track all the cryptocurrencies and conveniently look at
          the current trends in the crypto market
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient colors={["black"]} style={styles.signIn}>
              <Text style={styles.textSign}>start tracking</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#D9FFFFFF",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#3E64FF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    marginTop: 100,
    width: 150,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});