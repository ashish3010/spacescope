import CustomStatusbar from "@/src/common/Design_Components/Statusbar";
import AppNavigator from "@/src/Navigator/navigator";
import React from "react";
import { SafeAreaView } from "react-native";

const Home = () => {
  return (
    <>
      <CustomStatusbar />
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};

export default Home;
