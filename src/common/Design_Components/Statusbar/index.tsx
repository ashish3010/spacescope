import React from "react";
import { StatusBar, StatusBarStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../Colors/Color.types";
import useColor from "../Colors/useColor";

interface CustomStatusbarProps {
  backgroundColor?: Colors;
  barStyle?: StatusBarStyle;
}

const CustomStatusbar = ({
  backgroundColor = Colors.Primary,
  barStyle = "light-content",
}: CustomStatusbarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: insets.top,
        backgroundColor: useColor(backgroundColor),
      }}
    >
      <StatusBar
        animated
        backgroundColor={useColor(backgroundColor)}
        barStyle={barStyle}
      />
    </View>
  );
};

export default CustomStatusbar;
