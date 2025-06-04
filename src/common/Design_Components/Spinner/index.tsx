import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { Colors } from "../Colors/Color.types";
import useColor from "../Colors/useColor";
import { SpinnerSize, SpinnerTypes } from "./Spinner.types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SpinnerSizes = {
  small: {
    width: 24,
    height: 24,
    borderWidth: 3,
  },
  medium: {
    width: 32,
    height: 32,
    borderWidth: 5,
  },
  large: {
    width: 64,
    height: 64,
    borderWidth: 5,
  },
};

const Spinner = ({
  size = SpinnerSize.MEDIUM,
  customWidth,
  color = Colors.Primary,
}: SpinnerTypes) => {
  const progress = useRef(new Animated.Value(0)).current;

  const { width: spinnerWidth, borderWidth } = SpinnerSizes[size];
  const width = customWidth || spinnerWidth;
  const radius = width / 2;
  const strokeWidth = borderWidth;
  const halfCircle = radius + borderWidth;
  const circumference = 2 * radius * Math.PI;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => {
      animation.stop();
    };
  });

  return (
    <View>
      <Svg
        width={width}
        height={width}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="transparent"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={useColor(color)}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress.interpolate({
              inputRange: [0, 1],
              outputRange: [circumference, 0],
            })}
          />
        </G>
      </Svg>
    </View>
  );
};

export default Spinner;
