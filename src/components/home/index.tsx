import Button from "@/src/common/Design_Components/Button";
import { ButtonSize } from "@/src/common/Design_Components/Button/Button.types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [imageHeight, setImageHeight] = useState(0);

  const handleImageLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    const imageSource = require("../../../assets/images/cosmos.webp");
    const resolved = Image.resolveAssetSource(imageSource);
    Image.getSize(resolved.uri, (imgWidth, imgHeight) => {
      const aspectRatio = imgHeight / imgWidth;
      const calculatedHeight = width * aspectRatio;
      setImageHeight(calculatedHeight);
    });
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {`Welcome to SpaceScope, your gateway to the wonders of the universe!`}
      </Text>
      <View style={{ height: 16 }} />
      <Text style={{ fontSize: 18 }}>
        {`Explore the wonders of the universe with data and images from NASA. From the breathtaking beauty of distant galaxies to the intricate details of our own solar system, SpaceScope brings the cosmos to your fingertips.`}
      </Text>
      <View style={{ height: 16 }} />
      <Text style={{ fontSize: 16 }}>
        {`Discover breathtaking space imagery, learn about celestial events, and explore NASA's missions—all from the palm of your hand. From the surface of Mars to the edges of the observable universe, SpaceScope brings you closer to the cosmos.`}
      </Text>
      <View style={{ height: 16 }} />
      <Image
        source={require("../../../assets/images/cosmos.webp")}
        resizeMode="contain"
        onLayout={handleImageLayout}
        style={{ width: "100%", height: imageHeight, objectFit: "contain" }}
      />
      <View style={{ height: 16 }} />
      <Button
        title="Get started"
        size={ButtonSize.LARGE}
        onClick={() => navigation.navigate("Details")}
      />
    </View>
  );
};

export default HomeScreen;
