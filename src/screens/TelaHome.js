// src/screens/TelaHome.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function TelaHome({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Capipoint manual conforme os dados do backend
  const manualCapipoints = [
    {
      id: '55d04c41-9ce4-4e43-80af-b52448c3f9f7',
      name: 'Cais do Sertão',
      latitude: '-8.0631633',
      longitude: '-34.8711337',
      qr_codetext: 'MUSEU-14',
      create_attimestamp: '12/03/2025 10:13:54'
    }
  ];

  const mapRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      (async () => {
        // Solicita a permissão de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (isActive) setErrorMsg('Permissão de localização não concedida');
          return;
        }

        // Obtém a localização atual do usuário
        const currentLocation = await Location.getCurrentPositionAsync({});
        if (isActive) {
          console.log('Localização obtida:', currentLocation.coords);
          setLocation(currentLocation.coords);
        }
      })();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // Quando a localização do usuário estiver disponível, ajusta o mapa para incluir todos os markers
  useEffect(() => {
    if (mapRef.current && location) {
      // Marker do usuário
      const userMarker = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      // Marker do capipoint manual
      const capipointMarkers = manualCapipoints.map(point => ({
        latitude: parseFloat(point.latitude),
        longitude: parseFloat(point.longitude),
      }));

      // Concatena os markers
      const markers = [userMarker, ...capipointMarkers];

      mapRef.current.fitToCoordinates(markers, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [location]);

  function handleMarkerPress(point) {
    navigation.navigate('TelaRota', { point });
  }

  return (
    <View style={styles.container}>
      <Header bgColor="#FBF9E4" />

      <View style={styles.content}>
        {errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : !location ? (
          <Text style={styles.loading}>Carregando localização...</Text>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            // Inicializa o mapa centrado na localização do usuário
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
          >
            {/* Marker para a localização do usuário (ícone padrão) */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />

            {/* Marker para o capipoint manual com ícone customizado */}
            {manualCapipoints.map((point) => {
              const lat = parseFloat(point.latitude);
              const lng = parseFloat(point.longitude);
              return (
                <Marker
                  key={point.id}
                  coordinate={{ latitude: lat, longitude: lng }}
                  onPress={() => handleMarkerPress(point)}
                >
                  <Image
                    source={require('../assets/CapiPoint.png')}
                    style={{ width: 32, height: 32 }}
                    resizeMode="contain"
                  />
                </Marker>
              );
            })}
          </MapView>
        )}
      </View>

      <BottomNavBar currentScreen="TelaHome" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9E4',
    paddingBottom: 60,
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
