import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../components/Search";
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

const SearchNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Search"
        component={Search}
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

export default SearchNavigator;