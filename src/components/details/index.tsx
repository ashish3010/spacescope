import Card from "@/src/common/Design_Components/Card";
import { Colors } from "@/src/common/Design_Components/Colors/Color.types";
import useColor from "@/src/common/Design_Components/Colors/useColor";
import Header from "@/src/common/Design_Components/Header";
import Icon from "@/src/common/Design_Components/Icon";
import {
  IconColor,
  IconSize,
} from "@/src/common/Design_Components/Icon/Icon.types";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment } from "react";
import { ScrollView, Text, View } from "react-native";

const list = [
  {
    title: "APOD",
    subtitle: "Astronomy Picture of the Day",
    screen: "APOD",
    // apiEndpoint: "https://api.nasa.gov/planetary/apod",
  },
  {
    title: "Asteroids - NeoWs",
    subtitle: "Near Earth Object Web Service",
    screen: "Asteroids",
    apiEndpoint:
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-01&end_date=2023-10-07&api_key=DEMO_KEY",
  },
  {
    title: "Mars Rover Photos",
    subtitle: "Photos from Mars Rovers",
    // apiEndpoint: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api
  },
  {
    title: "EPIC",
    subtitle: "Earth Polychromatic Imaging Camera",
    // apiEndpoint: "https://epic.gsfc.nasa.gov/api/natural
  },
  {
    title: "Space Weather",
    subtitle: "Space weather data",
    // apiEndpoint: "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0",
  },
  {
    title: "Nasa Images & Videos",
    subtitle: "NASA's image and video library",
    // apiEndpoint: "https://images-api.nasa.gov/search?q=moon",
  },
  {
    title: "Satellite Tracking",
    subtitle: "Track satellites in real-time",
    // apiEndpoint:
    // "https://api.n2yo.com/rest/v1/satellite/above?lat=37.7749&lng=-122.4194&altitude=0&api_key=DEMO_KEY",
  },
  {
    title: "Astronomy Events",
    subtitle: "Upcoming astronomy events",
    // apiEndpoint: "https://api.leonardos.space/v1/astronomy/events",
  },
];

const DetailsScreen = () => {
  const grey80Color = useColor(Colors.Grey_80);
  const navigation = useNavigation<any>();

  return (
    <View>
      <Header title="SpaceScope">
        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            {list.map((item, index) => (
              <Fragment key={item.title + index}>
                <Card
                  onClick={() => {
                    if (item.screen) {
                      console.log(item.screen, "item.screen");
                      navigation.navigate(item.screen, { data: item });
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: grey80Color }}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <View>
                    <Icon
                      ic="right"
                      size={IconSize.MEDIUM}
                      color={IconColor.Primary}
                    />
                  </View>
                </Card>
                <View style={{ height: 16 }} />
              </Fragment>
            ))}
          </View>
        </ScrollView>
      </Header>
    </View>
  );
};

export default DetailsScreen;
