import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Pressable } from "react-native";
import { Colors } from "../Colors/Color.types";
import useColor from "../Colors/useColor";
import { IconColor, IconProps, IconSize } from "./Icon.types";

const getIconSizeOnly = (size?: IconSize) => {
  switch (size) {
    case IconSize.XS:
      return { size: 12 };
    case IconSize.SMALL:
      return { size: 16 };
    case IconSize.MEDIUM:
      return { size: 24 };
    case IconSize.LARGE:
      return { size: 32 };
    case IconSize.XL:
      return { size: 40 };
    case IconSize.XXL:
      return { size: 48 };
    default:
      return { icon: 24 };
  }
};

const getIconColor = (color?: IconColor) => {
  switch (color) {
    case IconColor.Black:
      return Colors.Black;
    case IconColor.Primary:
      return Colors.Primary;
    case IconColor.Success:
      return Colors.Success;
    case IconColor.Warning:
      return Colors.Warning;
    case IconColor.Error:
      return Colors.Error;
    case IconColor.White:
      return Colors.White;
    case IconColor.Grey_80:
      return Colors.Grey_80;
    default:
      return Colors.Primary;
  }
};

const Icon = ({
  ic,
  size = IconSize.MEDIUM,
  color = IconColor.Primary,
  isClickable = false,
  onClick,
}: IconProps) => {
  const resolvedColor = useColor(getIconColor(color));

  if (!ic) {
    return null;
  }

  return (
    <Pressable onPress={isClickable ? onClick : () => {}}>
      <AntDesign
        name={ic}
        size={getIconSizeOnly(size).size}
        color={resolvedColor}
      />
    </Pressable>
  );
};

export default Icon;
