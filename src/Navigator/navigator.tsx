import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DetailsScreen from "../components/details";
import HomeScreen from "../components/home";
import APODScreen from "../components/screens/APOD";
import AsteroidsScreen from "../components/screens/Asteroids/atseroid-list";

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="APOD" component={APODScreen} />
      <Stack.Screen name="Asteroids" component={AsteroidsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
