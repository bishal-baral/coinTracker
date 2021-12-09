import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  Switch,
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
              <Avatar.Image
                source={{
                  uri: 'https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png',
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>trader doge</Title>
                <Caption
                  style={styles.caption}
                  ellipsizeMode='tail'
                  numberOfLines={1}
                >
                  test@test.com
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name='coins' color={color} size={size} />
              )}
              label="allCoins"
              onPress={() => {
                props.navigation.navigate("allCoins");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name='search-dollar' color={color} size={size} />
              )}
              label="search"
              onPress={() => {
                props.navigation.navigate("Search");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name='newspaper' color={color} size={size} />
              )}
              label="news"
              onPress={() => {
                props.navigation.navigate("news");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name='atom' color={color} size={size} />
              )}
              label="preferences"
              onPress={() => {
                props.navigation.navigate("prefs");
              }}
            />
          </Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <FontAwesome5 name='hand-point-left' color={color} size={size} />
            )}
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
