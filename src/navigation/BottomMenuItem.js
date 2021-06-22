import React from "react";
import { View } from "react-native";
import colors from '../constants/colors';
import { AntDesign } from "@expo/vector-icons";
export const BottomMenuItem = ({ iconName, isCurrent }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AntDesign
        name={iconName}
        size={32}
        style={{ color: isCurrent ? colors.THEME_ORANGE : colors.TEXT_SECONDARY }}
      />
    </View>
  );
};
