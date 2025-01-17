import React from "react";
import { Text } from "react-native";
import { fonts } from "../utils/fontStyles";

export default function CustomText({ fontFamily = fonts.nRegular, style, ...props }) {
  return (
    <Text {...props} style={[{ fontFamily }, style]}>
      {props.children}
    </Text>
  );
}
