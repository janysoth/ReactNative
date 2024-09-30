import { Entypo, Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import InfoCard from '../../components/InfoCard';
import ReportCard from "../../components/ReportCard";

const index = () => {
  return (
    <ScrollView>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 12 }}>
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Employee Management System</Text>
            <Entypo name="lock" size={24} colors="black" />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Employee List */}
            <Pressable
              style={{
                backgroundColor: "#D3CCE3",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={24} color="black" />
              </View>

              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Employee List
              </Text>
            </Pressable>
            {/* End of Employee List */}

            {/* Mark Attendance */}
            <Pressable
              style={{
                backgroundColor: "#D3CCE3",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={24} color="black" />
              </View>

              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Mark Attendance
              </Text>
            </Pressable>
            {/* End of Attendance List */}
          </View>

          {/* Reports */}
          <View
            style={{
              marginTop: 20,
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
            }}
          >
            {/* Attendance Report */}
            <ReportCard
              icon="newspaper-outline"
              IconComponent={Ionicons}
              title="Attendance Report"
            />

            {/* Summary Report */}
            <ReportCard
              icon="repo-pull"
              IconComponent={Octicons}
              title="Summary Report"
            />

            {/* All Generate Report */}
            <ReportCard
              icon="report"
              IconComponent={Octicons}
              title="All Generate Report"
            />

            {/* Overtime Employees */}
            <ReportCard
              icon="people"
              IconComponent={Ionicons}
              title="Overtime Employees"
            />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Attendance Criteria */}
            <InfoCard
              backgroundColor="#f79d00"
              iconName="guy-fawkes-mask"
              iconType="MaterialCommunityIcons"
              title="Attendance Criteria"
            />

            {/* Increased Workflow */}
            <InfoCard
              backgroundColor="#ABCABA"
              iconName="bar-chart"
              iconType="Feather"
              title="Increased Workflow"
            />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Cost Savings */}
            <InfoCard
              backgroundColor="#D3CCE3"
              iconName="guy-fawkes-mask"
              iconType="MaterialCommunityIcons"
              title="Cost Savings"
            />

            {/* Employee Performance */}
            <InfoCard
              backgroundColor="#bdc3c7"
              iconName="bar-chart"
              iconType="Feather"
              title="Employee Performance"
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});