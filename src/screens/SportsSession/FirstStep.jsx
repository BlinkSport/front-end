import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  setSportSessionData,
  setIsEditing,
} from "@/Redux/Slices/sportSessionSlice";

const sportsData = [
  { id: 1, name: "Football", icon: "⚽" },
  { id: 2, name: "Basketball", icon: "🏀" },
  { id: 3, name: "Tennis", icon: "🎾" },
  { id: 4, name: "Running", icon: "🏃‍♂️" },
  { id: 5, name: "Cycling", icon: "🚴‍♂️" },
  { id: 6, name: "Swimming", icon: "🏊‍♂️" },
];

const FirstStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { sportSessionData, isEditing } = useAppSelector(
    (state) => state.sportSession
  );
  const [selectedSportId, setSelectedSportId] = useState(
    sportSessionData.sportId || null
  );

  useEffect(() => {
    if (isEditing && sportSessionData.sportId) {
      setSelectedSportId(sportSessionData.sportId);
    }
  }, [isEditing, sportSessionData.sportId]);

  const handleSportSelect = (id) => {
    setSelectedSportId(id);
    dispatch(setSportSessionData({ sportId: id }));
  };

  const handleNext = () => {
    if (selectedSportId !== null) {
      console.log("Selected sport:", selectedSportId);
      navigation.navigate("SecondStepSportSessionPage");
    } else {
      console.error("Please select a sport before proceeding.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>
          Choose your sport
        </Text>
        <FlatList
          data={sportsData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSportSelect(item.id)}
              style={{
                backgroundColor: selectedSportId === item.id ? "blue" : "gray",
                margin: 10,
                padding: 20,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {item.icon} {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={handleNext}
          disabled={selectedSportId === null}
          style={{
            backgroundColor: selectedSportId !== null ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FirstStepScreen;
