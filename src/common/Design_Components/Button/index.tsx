import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../Colors/Color.types";
import useColor from "../Colors/useColor";
import Icon from "../Icon";
import { IconColor, IconSize } from "../Icon/Icon.types";
import Spinner from "../Spinner";
import { ButtonKind, ButtonProps, ButtonSize } from "./Button.types";

const Button = ({
  size = ButtonSize.MEDIUM,
  isLoading = false,
  prefixIc,
  suffixIc,
  disabled = false,
  kind = ButtonKind.PRIMARY,
  title = "button",
  onClick,
}: ButtonProps) => {
  const disabledOpacity = isLoading || disabled ? 0.5 : 1;
  const isPrimary = kind === ButtonKind.PRIMARY;
  const isSecondary = kind === ButtonKind.SECONDARY;

  const iconColor = isPrimary ? IconColor.White : IconColor.Primary;

  const primaryColor = useColor(Colors.Primary);
  const transparentColor = useColor(Colors.Transparent);
  const whiteColor = useColor(Colors.White);

  const backgroundColor = isPrimary ? primaryColor : transparentColor;
  const borderColor = isSecondary ? primaryColor : transparentColor;
  const borderWidth = isSecondary ? 2 : 0;
  const textColor = isPrimary ? whiteColor : primaryColor;
  const spinnerColor = isPrimary ? Colors.White : Colors.Primary;

  return (
    <Pressable
      onPress={onClick}
      style={[
        styles.buttonContainer,
        styles[size],
        {
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
          borderColor: borderColor,
          opacity: disabledOpacity,
        },
      ]}
    >
      {isLoading ? (
        <Spinner color={spinnerColor} />
      ) : (
        <>
          {prefixIc && (
            <Icon ic={prefixIc} size={IconSize.LARGE} color={iconColor} />
          )}
          <Text style={{ color: textColor }}>{title}</Text>
          {suffixIc && (
            <Icon ic={suffixIc} size={IconSize.LARGE} color={iconColor} />
          )}
        </>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    columnGap: 8,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
