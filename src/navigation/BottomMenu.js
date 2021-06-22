import React from "react";
import {
  createBottomTabNavigator,
//   BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";

import { useSafeArea } from "react-native-safe-area-context";
import { View } from "react-native";
import Home from "../screen/BottomNav/Home";
import Order from "../screen/BottomNav/Order";
import Recipe from "../screen/BottomNav/Recipe";
export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative"}}>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Order" component={Order} />
        <Tab.Screen name="Recipe" component={Recipe} />
        <Tab.Screen name="Recurring" component={Recurring} />
        </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};