import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

const AddDetails = () => {
  const [isActive, setIsActive] = useState(true);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");

  const router = useRouter();

  const handleRegister = () => {
    // Basic validation
    if (!employeeName || !employeeId || !designation || !phoneNumber || !dateOfBirth || !joiningDate || !salary || !address) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const employeeData = {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee: isActive,
      salary,
      address,
    };

    axios
      .post("http://localhost:8000/addEmployee", employeeData)
      .then((response) => {
        Alert.alert("Registration Successful", "You have been registered successfully.");
        // Clear form fields
        resetForm();
        router.push("/");
      })
      .catch((error) => {
        Alert.alert("Registration failed.", error.response?.data?.message || "An error occurred during registration.");
        console.log("Registration failed. ", error);
      });
  };

  const resetForm = () => {
    setEmployeeName("");
    setEmployeeId("");
    setDateOfBirth("");
    setPhoneNumber("");
    setSalary("");
    setAddress("");
    setJoiningDate("");
    setDesignation("");
    setIsActive(true); // Reset switch
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Navigation Icons */}
        <Pressable style={styles.navIcons}>
          <Ionicons
            onPress={() => router.back()}
            style={styles.backIcon}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Ionicons
            onPress={() => router.push("/")} // Assuming your home route is "/"
            style={styles.homeIcon}
            name="home"
            size={24}
            color="black"
          />
        </Pressable>

        <Text style={styles.heading}>Add a New Employee</Text>

        {/* Country TextInput */}
        <TextInput
          style={styles.input}
          placeholder="India"
          placeholderTextColor={"black"}
        />

        {/* Full Name TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name (First and last Name)</Text>
          <TextInput
            value={employeeName}
            onChangeText={setEmployeeName}
            style={styles.input}
            placeholder="Enter your full name..."
            placeholderTextColor={"black"}
          />
        </View>

        {/* Employee ID TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Employee ID</Text>
          <TextInput
            value={employeeId}
            onChangeText={setEmployeeId}
            style={styles.input}
            placeholder="Enter your employee ID..."
            placeholderTextColor={"black"}
          />
        </View>

        {/* Designation TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            value={designation}
            onChangeText={setDesignation}
            style={styles.input}
            placeholder="Designation"
            placeholderTextColor={"black"}
          />
        </View>

        {/* Mobile Number TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            placeholder="Enter your phone number here..."
            placeholderTextColor={"black"}
            keyboardType="phone-pad"
          />
        </View>

        {/* Date of Birth TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            style={styles.input}
            placeholder="Enter your date of birth here..."
            placeholderTextColor={"black"}
          />
        </View>

        {/* Joining Date TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Joining Date</Text>
          <TextInput
            value={joiningDate}
            onChangeText={setJoiningDate}
            style={styles.input}
            placeholder="Enter your joining date here..."
            placeholderTextColor={"black"}
          />
        </View>

        {/* Active Employee Switch */}
        <View style={styles.switchRow}>
          <Text style={styles.label}>Active Employee</Text>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
          />
        </View>

        {/* Salary TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Salary</Text>
          <TextInput
            value={salary}
            onChangeText={setSalary}
            style={styles.input}
            placeholder="Enter your salary here..."
            placeholderTextColor={"black"}
            keyboardType="numeric"
          />
        </View>

        {/* Address TextInput */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholder="Enter your address here..."
            placeholderTextColor={"black"}
          />
        </View>

        {/* Add Employee Button */}
        <Pressable
          onPress={handleRegister}
          style={styles.button}
          accessible={true}
          accessibilityLabel="Add Employee"
        >
          <Text style={styles.buttonText}>Add Employee</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backIcon: {
    width: 50, // Fixed width for back icon
    padding: 10,
  },
  homeIcon: {
    alignItems: 'flex-end', // Align home icon to the right
    marginLeft: 320,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#0072b1',
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});