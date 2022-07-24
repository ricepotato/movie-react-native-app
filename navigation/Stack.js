import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity, useColorScheme } from "react-native";
import Detail from "../screens/Detail";
import { BLACK_COLOR } from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go go three</Text>
  </TouchableOpacity>
);

const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>to back</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerBackButtonMenuEnabled: true,
        headerBackTitleVisible: true,
        headerTitleStyle: { color: isDark ? "white" : BLACK_COLOR },
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail}></NativeStack.Screen>
    </NativeStack.Navigator>
  );
};

export default Stack;
