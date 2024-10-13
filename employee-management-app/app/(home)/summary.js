import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

const summary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/attendance-report-all-employees`,
        {
          params: {
            month: currentDate.month() + 1, // months are zero-indexed in moment.js
            year: currentDate.year(),
          }
        }
      );
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Error in fetching attendance report. ", error);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      <View style={{ marginHorizontal: 12 }}>
        {attendanceData?.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: "#A1FFCE", borderRadius: 5 }}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Present</DataTable.Title>
                  <DataTable.Title>Absent</DataTable.Title>
                  <DataTable.Title>Half Day</DataTable.Title>
                  <DataTable.Title>Holiday</DataTable.Title>
                  <DataTable.Title>Non-Working</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item?.present ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.absent ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.halfday ?? 0}</DataTable.Cell>
                  <DataTable.Cell>{item?.holiday ?? 0}</DataTable.Cell>
                  <DataTable.Cell>8</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});