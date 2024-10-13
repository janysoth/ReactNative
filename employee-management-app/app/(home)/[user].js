import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router"; // Import useRouter
import moment from "moment";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import AttendanceStatusButton from "../../components/AttendanceStatusButton";

const User = () => {
  const params = useLocalSearchParams();
  const router = useRouter(); // Initialize useRouter
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
        // Redirect to markattendance page after submission
        router.push("/markattendance");
      }
    } catch (error) {
      console.log("Error in submitting attendance. ", error);
      Alert.alert("Error", "Failed to submit attendance. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>
      {/* End of the Date Ticker */}

      <Pressable
        style={{
          marginVertical: 10,
          marginHorizontal: 12,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            padding: 10,
            backgroundColor: "#4b6cb7",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {params?.name.charAt(0)}
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {params?.name}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {params?.designation} ({params?.id})
          </Text>
        </View>
      </Pressable>
      {/* End of the Employee Pressable */}

      {/* Base Pay */}
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 12 }}>
        Base Pay : {params?.salary}
      </Text>

      {/* Attendance */}
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 3,
            marginTop: 7,
          }}
        >
          ATTENDANCE
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <AttendanceStatusButton
            status="present"
            currentStatus={attendanceStatus}
            onPress={() => setAttendanceStatus("present")}
            label="Present"
          />

          <AttendanceStatusButton
            status="absent"
            currentStatus={attendanceStatus}
            onPress={() => setAttendanceStatus("absent")}
            label="Absent"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <AttendanceStatusButton
            status="halfday"
            currentStatus={attendanceStatus}
            onPress={() => setAttendanceStatus("halfday")}
            label="Half Day"
          />

          <AttendanceStatusButton
            status="holiday"
            currentStatus={attendanceStatus}
            onPress={() => setAttendanceStatus("holiday")}
            label="Holiday"
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#E0E0E0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Advance / Loans"
          />
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#E0E0E0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Extra Bonus"
          />
        </View>

        <Pressable
          onPress={submitAttendance}
          style={{
            padding: 15,
            backgroundColor: "#00c6ff",
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "500" }}
          >
            Submit Attendance
          </Text>
        </Pressable>
      </View>
    </View>
    // End of the Main View
  );
};

export default User;