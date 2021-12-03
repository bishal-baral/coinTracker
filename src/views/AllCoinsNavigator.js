import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import CryptoDetail from "../components/CryptoDetail";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const screenOptions = {
  headerTransparent: false,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerStyle: {
    backgroundColor: "#3E64FF",
  },
  headerTintColor: "#fff",
};

const AllCoinsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="allCoins"
        component={Home}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              backgroundColor="#3E64FF"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="trends" component={CryptoDetail} />
    </Stack.Navigator>
  );
};

export default AllCoinsNavigator;
