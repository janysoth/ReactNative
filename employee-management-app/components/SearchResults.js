import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchResults = ({ data, input, deleteEmployee }) => {
  const filteredData = data.filter(item =>
    item?.employeeName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.employeeId.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item?.employeeName?.charAt(0)}
                </Text>
              </View>
              <View style={styles.employeeDetailsContainer}>
                <Text style={styles.employeeName}>{item?.employeeName}</Text>
                <Text style={styles.employeeDetails}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteEmployee(item?.employeeId)}
              >
                <Icon name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No matching results found</Text>
      )}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  resultItem: {
    marginVertical: 10,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#4b6cb7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
  },
  employeeDetailsContainer: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeDetails: {
    marginTop: 5,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  noResults: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
  },
});