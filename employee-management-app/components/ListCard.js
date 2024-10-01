import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ListCard = ({ iconName, text, onPress }) => {
  return (
    <Pressable style={styles.pressableCard} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color='black' />
      </View>
      <Text style={styles.cardText}>{text}</Text>
    </Pressable>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  pressableCard: {
    backgroundColor: "#D3CCE3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    marginTop: 7,
    fontWeight: "600",
  },
});