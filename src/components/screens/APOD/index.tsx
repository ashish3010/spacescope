import Card from "@/src/common/Design_Components/Card";
import { Colors } from "@/src/common/Design_Components/Colors/Color.types";
import useColor from "@/src/common/Design_Components/Colors/useColor";
import Header from "@/src/common/Design_Components/Header";
import Icon from "@/src/common/Design_Components/Icon";
import {
  IconColor,
  IconSize,
} from "@/src/common/Design_Components/Icon/Icon.types";
import Spinner from "@/src/common/Design_Components/Spinner";
import { NASA_API_KEY } from "@env";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

type ApodData = {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title: string;
  url: string;
};

const APODScreen = ({ route }: any) => {
  const { data } = route.params || {};
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const grey80Color = useColor(Colors.Grey_80);
  const [imageLoading, setImageLoading] = useState(false);

  console.log(apodData, "apodData");
  console.log(NASA_API_KEY, "NASA_API_KEY");

  const { subtitle } = data || {};
  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error("Error fetching APOD data:", error);
      }
    };
    fetchAPOD();
  }, []);

  const downloadImage = async () => {
    if (!apodData || !apodData.hdurl) {
      Alert.alert("Error", "No HD image available for download.");
      return;
    }
    setImageLoading(true);
    try {
      const fileUri = FileSystem.cacheDirectory + "downloaded.jpg";
      const downloadedFile = await FileSystem.downloadAsync(
        apodData?.hdurl,
        fileUri
      );
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Alert.alert("Success", "Image saved to Downloads/Photos.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not download image.");
    } finally {
      setImageLoading(false);
    }
  };

  if (!apodData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Header title={subtitle} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ padding: 16, paddingBottom: 24 }}>
          <Card>
            <Image
              source={{ uri: apodData.url }}
              style={styles.image}
              resizeMode="cover"
            />
            {apodData.copyright && (
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  width: "auto",
                }}
              >
                Image Credit: {apodData.copyright?.trim()}
              </Text>
            )}
            <Text style={styles.title}>{apodData.title}</Text>
            <Text style={[styles.date, { color: grey80Color }]}>
              {apodData.date}
            </Text>
            <Text style={styles.explanation}>{apodData.explanation}</Text>
            {apodData.hdurl && (
              <View style={styles.hdButtonContainer}>
                {imageLoading ? (
                  <Spinner />
                ) : (
                  <Icon
                    ic="download"
                    size={IconSize.MEDIUM}
                    color={IconColor.Primary}
                    isClickable
                    onClick={downloadImage}
                  />
                )}

                <Text style={styles.hdButtonText}>
                  {imageLoading ? "Downloading..." : "Download HD Image"}
                </Text>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
    </>
  );
};
export default APODScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: Colors.Grey_80,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    color: Colors.Black,
  },
  date: {
    fontSize: 16,
    color: Colors.Grey_80,
    marginBottom: 8,
  },
  explanation: {
    fontSize: 16,
    color: Colors.Black,
    lineHeight: 24,
  },
  hdButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 8,
    backgroundColor: Colors.Grey_80,
    borderRadius: 8,
  },
  hdButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.Primary,
    fontWeight: "bold",
  },
});
