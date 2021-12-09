import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../components/TabBar";
import {
  AllCoinsNavigator,
  SearchStackNavigator,
  PreferencesStackNavigator,
  NewsStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="search"
        component={SearchStackNavigator}
        initialParams={{ icon: "search-dollar" }}
      />
      <Tab.Screen
        name="allCoins"
        component={AllCoinsNavigator}
        initialParams={{ icon: "coins" }}
      />
      <Tab.Screen
        name="news"
        component={NewsStackNavigator}
        initialParams={{ icon: "newspaper" }}
      />
      <Tab.Screen
        name="prefs"
        component={PreferencesStackNavigator}
        initialParams={{ icon: "atom" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;