import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  Title,
  Drawer,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";

import { AuthContext } from "../components/context";

export function DrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>trader doge</Title>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="allCoins"
              onPress={() => {
                props.navigation.navigate("allCoins");
              }}
            />
            <DrawerItem
              label="search"
              onPress={() => {
                props.navigation.navigate("Search");
              }}
            />
            <DrawerItem
              label="news"
              onPress={() => {
                props.navigation.navigate("news");
              }}
            />
            <DrawerItem
              label="preferences"
              onPress={() => {
                props.navigation.navigate("prefs");
              }}
            />
          </Drawer.Section>
          <DrawerItem
            label="signOut"
            onPress={() => {
              signOut();
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    maxWidth: 180,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#ededed",
    borderTopWidth: 0.5,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
