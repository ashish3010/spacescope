import Button from "@/src/common/Design_Components/Button";
import { ButtonSize } from "@/src/common/Design_Components/Button/Button.types";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Asteroid {
  name?: string;
  id?: string;
  date?: string;
  absolute_magnitude_h?: number;
  close_approach_data?: {
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
  }[];
  is_potentially_hazardous_asteroid?: boolean;
  is_sentry_object?: boolean;
}

interface AsteroidDetailsProps {
  asteroid: Asteroid | null;
}

const AsteroidDetails = ({ asteroid }: AsteroidDetailsProps) => (
  <View style={styles.detailsContainer}>
    <ScrollView>
      <Text style={styles.detailsTitle}>{asteroid?.name}</Text>
      <Text>Date: {asteroid?.date}</Text>
      <Text>Magnitude: {asteroid?.absolute_magnitude_h}</Text>
      <Text>
        Miss Distance:{" "}
        {asteroid?.close_approach_data?.[0]?.miss_distance.kilometers} km
      </Text>
      <Text>
        Relative Velocity:{" "}
        {
          asteroid?.close_approach_data?.[0]?.relative_velocity
            .kilometers_per_hour
        }{" "}
        km/h
      </Text>
      <Text>
        Hazardous: {asteroid?.is_potentially_hazardous_asteroid ? "Yes" : "No"}
      </Text>
      <Text>Sentry Object: {asteroid?.is_sentry_object ? "Yes" : "No"}</Text>
      <View style={{ height: 16 }} />
      <Button
        title="View on NASA JPL"
        size={ButtonSize.LARGE}
        onClick={() => {}}
      />
    </ScrollView>
  </View>
);

export default AsteroidDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    width: "100%",
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
