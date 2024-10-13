import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  Text,
} from "react-native";

const AttendanceStatusButton = ({ status, currentStatus, onPress, label }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: currentStatus === status ? "#C4E0E5" : "#f0f0f0",
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
      }}
    >
      {currentStatus === status ? (
        <FontAwesome5 name="dot-circle" size={24} color="black" />
      ) : (
        <Entypo name="circle" size={24} color="black" />
      )}
      <Text>{label}</Text>
    </Pressable>
  );
};

export default AttendanceStatusButton;