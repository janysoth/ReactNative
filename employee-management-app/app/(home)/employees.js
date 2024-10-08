import { AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import SearchResults from "../../components/SearchResults";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  // const deleteEmployee = (employeeId) => {
  //   const updatedData = employees.filter(item => item.employeeId !== employeeId);

  //   setEmployees(updatedData);
  // };

  const API_URL = Constants.expoConfig?.extra?.apiUrl || "http://localhost:8000";

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(`${API_URL}/employees/${employeeId}`);

      if (response.status === 200) {
        const updatedData = employees.filter(item => item.employeeId !== employeeId);
        setEmployees(updatedData);
        Alert.alert('Success', 'Employee has been deleted successfully.');
      } else {
        Alert.alert('Error', 'Failed to delete employee.');
      }
    } catch (error) {
      console.error('Error in deleting an employee: ', error);
      Alert.alert('Error', 'Failed to delete employee.');
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error in fetching employee data. ", error);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />

          {employees.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} deleteEmployee={deleteEmployee} />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No Data</Text>
          <Text>
            Press on the plus button to add a new employee.
          </Text>
          <Pressable onPress={() => router.push("/(home)/adddetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="#0072b1"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});