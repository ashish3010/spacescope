import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { BackHandler, Platform, Text, View } from "react-native";
import { Colors } from "../Colors/Color.types";
import useColor from "../Colors/useColor";
import Icon from "../Icon";
import { IconColor } from "../Icon/Icon.types";

interface HeaderProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  handleBack?: boolean;
  onBackPress?: () => void;
}

const Header = ({
  children,
  title,
  subtitle,
  handleBack,
  onBackPress,
}: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const primaryColor = useColor(Colors.Primary);
  const [height, setHeight] = React.useState(0);

  const onBack = () => {
    if (handleBack && onBackPress) {
      onBackPress();
      return;
    }
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
  };

  if (children && !React.isValidElement(children)) {
    return null;
  }

  return (
    <View>
      <View
        onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
        style={[styles.headerContainer, { backgroundColor: primaryColor }]}
      >
        <Icon ic="left" color={IconColor.White} onClick={onBack} isClickable />
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && <Text style={styles.headerSubTitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={{ marginTop: height }}>{children}</View>
    </View>
  );
};

export default Header;

const styles = {
  headerContainer: {
    padding: 16,
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: "center" as const,
    flexDirection: "row" as const,
    justifyContent: "flex-start" as const,
    gap: 8,
  },
  headerTitle: {
    color: Colors.White,
    fontSize: 20,
  },
  headerSubTitle: {
    color: Colors.White,
    fontSize: 16,
  },
};
