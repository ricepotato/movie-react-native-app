import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, LIGHT_GREY, DARK_GREY } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      initialRouteName="Movies"
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
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginTop: -5 },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarBadge: "New",
          headerTitleStyle: { color: "tomato" },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "film" : "film-outline"}
                size={size}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "tv" : "tv-outline"}
                size={size}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
