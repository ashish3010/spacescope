import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../Colors/Color.types";

interface CardProps {
  children: React.ReactNode;
  shadow?: boolean;
  backgroundColor?: string;
  style?: React.ComponentProps<typeof View>["style"];
  onClick?: () => void;
}
const Card: React.FC<CardProps> = ({
  children,
  shadow = true,
  backgroundColor = Colors.White,
  style,
  onClick,
}) => {
  return (
    <Pressable onPress={onClick ? onClick : () => {}}>
      <View
        style={[
          styles.card,
          shadow ? styles.shadow : {},
          { backgroundColor },
          style,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
