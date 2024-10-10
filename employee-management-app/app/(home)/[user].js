import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const user = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM DD, YYYY");
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: formatDate(currentDate),
        status: attendanceStatus,
      };

      const response = await axios.post(
        "http://localhost:8000/attendance",
        attendanceData,
      );

      if (response.status === 200) {
        Alert.alert(`Attendance submitted successfully for ${params?.name}`);
      }
    } catch (error) {
      console.log("Error in submitting attendance. ", error);
    }
  };

  return (
    <View>
      <Text>[user]</Text>
    </View>
  );
};

export default user;