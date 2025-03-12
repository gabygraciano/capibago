// src/screens/TelaHome.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import { supabase } from '../services/supabaseClient';

export default function TelaHome({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [capipoints, setCapipoints] = useState([]);

  // useFocusEffect: toda vez que a tela "Home" volta a ficar em foco, re-rodamos a lógica
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      (async () => {
        // 1) Pedir permissão de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (isActive) {
            setErrorMsg('Permissão de localização não concedida');
          }
          return;
        }

        // 2) Obter localização atual
        const currentLocation = await Location.getCurrentPositionAsync({});
        if (isActive) {
          setLocation(currentLocation.coords);
        }

        // 3) Buscar capipoints do Supabase
        if (isActive) {
          await fetchCapipoints();
        }
      })();

      // Se o usuário sair da tela antes de terminar, cancelamos
      return () => {
        isActive = false;
      };
    }, []) // sem dependências => só roda quando tela fica em foco
  );

  async function fetchCapipoints() {
    const { data, error } = await supabase
      .from('capipoints')
      .select('*');

    if (error) {
      console.log('Erro ao buscar capipoints:', error);
      setErrorMsg('Erro ao buscar pontos do banco');
      return;
    }
    console.log('capipoints => data:', data);
    setCapipoints(data);
  }

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
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            {capipoints.map((point) => {
              const lat = parseFloat(point.latitude);
              const lng = parseFloat(point.longitude);
              if (!isNaN(lat) && !isNaN(lng)) {
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
              }
              return null;
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
