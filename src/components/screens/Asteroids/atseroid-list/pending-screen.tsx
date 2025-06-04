import Card from "@/src/common/Design_Components/Card";
import Shimmer from "@/src/common/Design_Components/Shimmer";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PendingScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: 0 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16, paddingBottom: 8 }}>
          <Shimmer height={24} width="80%" />
          <View style={{ height: 8 }} />
          <Shimmer />
          <View style={{ height: 8 }} />
          <Shimmer />
          <View style={{ height: 8 }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Shimmer width="60%" />
            <Shimmer width="10%" />
          </View>
        </View>
        <View style={{ height: 8 }} />
        {[...Array(5)].map((_, index) => (
          <Card key={index} style={{ marginBottom: 16, marginHorizontal: 16 }}>
            <Shimmer width="40%" />
            <View style={{ height: 8 }} />
            <Shimmer width="50%" />
            <View style={{ height: 8 }} />
            <Shimmer width="30%" />
            <View style={{ height: 8 }} />
            <Shimmer width="50%" />
            <View style={{ height: 8 }} />
            <Shimmer width="80%" />
          </Card>
        ))}
        <View style={{ height: bottomInset }} />
      </ScrollView>
    </View>
  );
};

export default PendingScreen;
