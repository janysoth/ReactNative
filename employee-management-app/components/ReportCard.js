import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const ReportCard = ({ icon, IconComponent, title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#BE93C5",
        borderRadius: 6,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          padding: 7,
          width: 45,
          height: 45,
          borderRadius: 7,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconComponent name={icon} size={24} color="black" />
      </View>

      <Text
        style={{
          marginLeft: 10,
          fontSize: 16,
          fontWeight: "600",
          flex: 1,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          width: 35,
          height: 35,
          borderRadius: 7,
          backgroundColor: "white",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <Entypo name='chevron-right' size={24} color="black" />
      </View>
    </Pressable>
  );
};

export default ReportCard;