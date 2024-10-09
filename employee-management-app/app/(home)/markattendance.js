import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const markattendance = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMM DD, YYYY");
  };

  // To Fetch All of the Employoee Data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error in fetching EmployeeData. ", error);
      }
    };
    fetchEmployeeData();
  }, []);

  // To Fetch All of the Attendance Data
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/attendance", {
        params: {
          date: formatDate(currentDate),
          // date: currentDate.format("MMM DD, YYYYY"),
        }
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("Error in fetching Attendance Data. ", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // 'Not Marked' or a default status
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        {/* Change of Date Ticker */}
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
          <AntDesign
            onPress={goToPrevDay}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={24}
            color="black"
          />
        </View>
        {/* End of Change of Date Ticker */}

        <View style={{ marginHorizontal: 12 }}>
          {employeeWithAttendance.map((item, index) => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/[user]",
                  params: {
                    name: item.employeeName,
                    id: item.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  }
                });
              }
              }
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
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
                  {item?.employeeName?.charAt(0)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.employeeName}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>

              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#FF69B4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    {item.status.charAt(0)}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};

export default markattendance;

const styles = StyleSheet.create({});