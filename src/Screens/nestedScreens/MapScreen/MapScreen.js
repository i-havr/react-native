import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./MapScreen.styles";

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
        <Text style={styles.text}>Where the photo was taken or uploaded</Text>
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
