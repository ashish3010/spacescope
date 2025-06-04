import { Colors } from "@/src/common/Design_Components/Colors/Color.types";
import useColor from "@/src/common/Design_Components/Colors/useColor";
import Header from "@/src/common/Design_Components/Header";
import Icon from "@/src/common/Design_Components/Icon";
import Modal from "@/src/common/Design_Components/Modal";
import { getDateBefore7Days, getTodayDate } from "@/src/utils/functions";
import { NASA_API_KEY } from "@env";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsteroidCard from "./asteroid-card";
import CalenderFilter from "./calender-filter";
import PendingScreen from "./pending-screen";

const AsteroidsScreen = ({ route }: any) => {
  const { data } = route.params || {};
  const { subtitle } = data || {};
  const [startDate, setStartDate] = useState(
    getDateBefore7Days(getTodayDate())
  );
  const [contentHeight, setContentHeight] = useState(0);
  const [endDate, setEndDate] = useState(getTodayDate());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [asteroidData, setAsteroidData] = useState<any>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  const grey80Color = useColor(Colors.Grey_80);

  useEffect(() => {
    const fetchAsteroids = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
        );
        const data = await res.json();
        setAsteroidData(data);
      } catch (e: any) {
        console.log(e, "error");
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchAsteroids();
  }, []);

  const asteroids = React.useMemo(() => {
    if (asteroidData && asteroidData.near_earth_objects) {
      return Object.entries(asteroidData.near_earth_objects).flatMap(
        ([date, asteroids]) =>
          asteroids?.map((asteroid: any) => ({ ...asteroid, date }))
      );
    }
    return [];
  }, [asteroidData]);

  if (loading) {
    return (
      <Header title={subtitle}>
        <PendingScreen />
      </Header>
    );
  }
  if (error) {
    return (
      <View>
        <Text style={styles.header}>Near Earth Asteroids</Text>
        <Text style={{ color: "#ff5370", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <Header title={subtitle}>
      <View style={{ backgroundColor: Colors.White }}>
        <View onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>
          <Text style={styles.header}> Near Earth Asteroids</Text>
          <View style={{ height: 8 }} />
          <Text style={{ color: grey80Color, marginHorizontal: 16 }}>
            {`Data from NASA's Near Earth Object Web Service`}
          </Text>
          <Text
            style={{ marginHorizontal: 16, marginTop: 8, color: grey80Color }}
          >
            {`Showing asteroids from ${startDate} to ${endDate}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 16,
              marginTop: 4,
            }}
          >
            <Text>{`Asteroids found: ${asteroids.length}`}</Text>
            <Icon
              ic="filter"
              isClickable
              onClick={() => setFilterVisible(true)}
            />
          </View>
          <View style={{ height: 8 }} />
        </View>
        <AsteroidCard asteroids={asteroids} contentHeight={contentHeight} />

        <Modal visible={filterVisible} onClose={() => setFilterVisible(false)}>
          <CalenderFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(date) => setStartDate(date)}
            onEndDateChange={(date) => setEndDate(date)}
          />
        </Modal>
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default AsteroidsScreen;
