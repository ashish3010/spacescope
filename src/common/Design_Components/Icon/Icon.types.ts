import AntDesign from "@expo/vector-icons/AntDesign";

export enum IconSize {
  XS = "xs",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XL = "xl",
  XXL = "xxl",
}

export enum IconColor {
  Primary = "primary",
  Error = 'error',
  Warning = "warning",
  Success = "success",
  Black = "black",
  White = "white",
  Grey_80 = "grey_80"
}

export type IconKey = keyof typeof AntDesign.glyphMap

export interface IconProps {
  ic: IconKey
  size?: IconSize,
  color?: IconColor,
  isClickable?: boolean,
  onClick?: () => void
}