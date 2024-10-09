import { Entypo, Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import InfoCard from '../../components/InfoCard';
import ListCard from "../../components/ListCard";
import ReportCard from "../../components/ReportCard";

const index = () => {
  const router = useRouter();
  return (
    <ScrollView>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={styles.headerText}>Employee Management System</Text>
            <Entypo name="lock" size={24} color="black" />
          </View>

          <View style={styles.row}>
            <ListCard
              iconName="people"
              text="Employees List"
              onPress={() => router.push("/(home)/employees")}
            />

            <ListCard
              iconName="checkmark"
              text="Mark Attendance"
              onPress={() => router.push("/(home)/markattendance")}
            />
          </View>

          {/* Reports */}
          <View style={styles.reportContainer}>
            <ReportCard icon="newspaper-outline" IconComponent={Ionicons} title="Attendance Report" />
            <ReportCard icon="repo-pull" IconComponent={Octicons} title="Summary Report" />
            <ReportCard icon="report" IconComponent={Octicons} title="All Generate Report" />
            <ReportCard icon="people" IconComponent={Ionicons} title="Overtime Employees" onPress={() => console.log("Pressed")} />
          </View>

          <View style={styles.row}>
            <InfoCard backgroundColor="#f79d00" iconName="guy-fawkes-mask" iconType="MaterialCommunityIcons" title="Attendance Criteria" />
            <InfoCard backgroundColor="#ABCABA" iconName="bar-chart" iconType="Feather" title="Increased Workflow" />
          </View>

          <View style={styles.row}>
            <InfoCard backgroundColor="#D3CCE3" iconName="guy-fawkes-mask" iconType="MaterialCommunityIcons" title="Cost Savings" />
            <InfoCard backgroundColor="#bdc3c7" iconName="bar-chart" iconType="Feather" title="Employee Performance" onPress={() => console.log("Pressed")} />
          </View>
        </View>
      </LinearGradient>
    </ScrollView >
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
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
  reportContainer: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
});