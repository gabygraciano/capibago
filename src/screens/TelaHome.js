// src/screens/TelaHome.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

// JSONs crus
import mercadosRaw from '../data/mercadospublicos.json';
import museusRaw from '../data/museus.json';

export default function TelaHome({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Converter cada record para objeto
  const mercados = mercadosRaw.records.map((row) => ({
    id: row[0],
    nome: row[1],
    descricao: row[2],
    bairro: row[3],
    latitude: row[4],
    longitude: row[5],
    tipo: 'mercado',
  }));

  const museus = museusRaw.records.map((row) => ({
    id: row[0],
    nome: row[1],
    descricao: row[2],
    bairro: row[3],
    logradouro: row[4],
    latitude: row[5],
    longitude: row[6],
    telefone: row[7],
    site: row[8],
    tipo: 'museu',
  }));

  // Juntar tudo
  const allPoints = [...mercados, ...museus];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização não concedida');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  // Ao clicar no Marker, navegamos para TelaRota passando { point }
  const handleMarkerPress = (point) => {
    navigation.navigate('TelaRota', { point });
  };

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
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            {allPoints.map((point) => {
              const lat = parseFloat(point.latitude);
              const lng = parseFloat(point.longitude);

              return (
                <Marker
                  key={`${point.tipo}-${point.id}`}
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
