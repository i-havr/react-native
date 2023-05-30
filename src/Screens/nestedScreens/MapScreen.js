import React, { useState, useEffect } from "react";

import MapView, { Marker } from "react-native-maps";

import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Location from "expo-location";

import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function MapScreen({ navigation, route }) {
  const [mapPoint, setMapPoint] = useState(() => ({
    latitude: route.params.location.latitude,
    longitude: route.params.location.longitude,
  }));

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.text}>Where the photo was taken</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.arrowWrapper}>
            <Feather name="arrow-left" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude: mapPoint.latitude,
            longitude: mapPoint.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: mapPoint.latitude,
              longitude: mapPoint.longitude,
            }}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 54,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth: 0.5,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  arrowWrapper: {
    position: "absolute",
    left: 16,
    bottom: "50%",
    transform: [{ translate: [0, 3] }],
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  mapView: {
    flex: 1,
    backgroundColor: "blue",
  },
});
