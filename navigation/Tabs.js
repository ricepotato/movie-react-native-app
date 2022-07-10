import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, LIGHT_GREY, DARK_GREY } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : "tomato",
        tabBarInactiveTintColor: isDark ? LIGHT_GREY : DARK_GREY,
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        headerTitleStyle: {
          color: isDark ? "white" : "black",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{ tabBarBadge: "New", headerTitleStyle: { color: "tomato" } }}
      />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
