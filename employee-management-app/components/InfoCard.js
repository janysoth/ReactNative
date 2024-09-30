import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const InfoCard = ({ backgroundColor, iconName, iconType, title }) => {
  const IconComponent = iconType === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Feather;

  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <View
        style={{
          width: 35,
          height: 35,
          borderRadius: 7,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent name={iconName} size={24} color='black' />
      </View>
      <Text style={{ marginTop: 7 }}>{title}</Text>
    </View>
  );
};

export default InfoCard;