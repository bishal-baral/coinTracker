import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import News from "../components/News";
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

const NewsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="news"
        component={News}
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
    </Stack.Navigator>
  );
};

export default NewsStackNavigator;
