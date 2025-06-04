import Card from "@/src/common/Design_Components/Card";
import { Colors } from "@/src/common/Design_Components/Colors/Color.types";
import useColor from "@/src/common/Design_Components/Colors/useColor";
import Modal from "@/src/common/Design_Components/Modal";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsteroidDetails from "./asteroid-detail-brief";

interface Asteroid {
  id: string;
  name: string;
  date: string;
  is_potentially_hazardous_asteroid: boolean;
  absolute_magnitude_h: number;
  close_approach_data: {
    miss_distance: {
      kilometers: string;
    };
  }[];
}

interface AsteroidCardProps {
  asteroids: Asteroid[];
  contentHeight: number;
}

const AsteroidCard = ({ asteroids, contentHeight }: AsteroidCardProps) => {
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(
    null
  );
  const { bottom: bottomInset } = useSafeAreaInsets();

  const greenColor = useColor(Colors.Success);
  const errorColor = useColor(Colors.Error);
  const warningColor = useColor(Colors.Warning);
  return (
    <ScrollView>
      {asteroids &&
        asteroids.length > 0 &&
        asteroids.map((asteroid: any, index: number) => (
          <Card
            key={asteroid.id || index}
            onClick={() => setSelectedAsteroid(asteroid)}
            style={{ margin: 16, marginTop: index === 0 ? 8 : 0 }}
          >
            <Text style={styles.name}>{index + 1}</Text>
            <Text style={styles.name}>{asteroid.name}</Text>
            <Text style={styles.date}>Date: {asteroid.date}</Text>
            <Text
              style={[
                styles.hazard,
                {
                  color: asteroid.is_potentially_hazardous_asteroid
                    ? errorColor
                    : greenColor,
                },
              ]}
            >
              {asteroid.is_potentially_hazardous_asteroid
                ? "🚨 Hazardous"
                : "✅ Safe"}
            </Text>
            <Text style={styles.magnitude}>
              Magnitude: {asteroid.absolute_magnitude_h}
            </Text>
            <Text style={[styles.distance, { color: warningColor }]}>
              Miss Distance:{" "}
              {asteroid.close_approach_data[0]?.miss_distance.kilometers} km
            </Text>
          </Card>
        ))}
      <View style={{ height: bottomInset + contentHeight }} />
      <Modal
        visible={!!selectedAsteroid}
        onClose={() => setSelectedAsteroid(null)}
      >
        <AsteroidDetails asteroid={selectedAsteroid} />
      </Modal>
    </ScrollView>
  );
};

export default AsteroidCard;

const styles = StyleSheet.create({
  name: { fontSize: 18, fontWeight: "bold" },
  date: { color: "#8892b0", marginTop: 4 },
  hazard: { marginTop: 6, fontWeight: "bold" },
  magnitude: { marginTop: 4 },
  distance: { marginTop: 4 },
});
