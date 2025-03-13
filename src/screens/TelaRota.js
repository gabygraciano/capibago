// src/screens/TelaRota.js
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TelaRota({ route, navigation }) {
  const { point } = route.params || {};

  const [userLocation, setUserLocation] = useState(null);
  const [rotaCoords, setRotaCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTransport, setActiveTransport] = useState('walk');

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização não concedida');
        setLoading(false);
        return;
      }
      // Obtém a localização atual
      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (userLocation) {
      criarRotaManual();
    }
  }, [userLocation, activeTransport]);

  // Função para criar rota manual, calcular distância e duração
  function criarRotaManual() {
    if (!userLocation || !point) {
      setLoading(false);
      return;
    }

    const latOri = userLocation.latitude;
    const lonOri = userLocation.longitude;
    const latDest = parseFloat(point.latitude);
    const lonDest = parseFloat(point.longitude);

    if (isNaN(latDest) || isNaN(lonDest)) {
      console.log('Coordenadas inválidas do destino:', point);
      setLoading(false);
      return;
    }

    // Gera uma rota curva "falsa"
    const coords = gerarRotaCurva(latOri, lonOri, latDest, lonDest, 10);
    setRotaCoords(coords);

    // Calcula a distância em km
    const dist = haversineDist(latOri, lonOri, latDest, lonDest);
    setDistance(dist);

    // Ajusta a velocidade de acordo com o transporte
    let speed = 5; // 5 km/h para "walk"
    if (activeTransport === 'car') speed = 40; // 40 km/h para "car"
    if (activeTransport === 'bike') speed = 15; // 15 km/h para "bike"

    // Tempo em minutos
    const tempoMin = (dist / speed) * 60;
    setDuration(tempoMin);

    setLoading(false);
  }

  // Ajusta o zoom do mapa para abranger todos os pontos
  useEffect(() => {
    if (rotaCoords.length > 0 && mapRef.current) {
      setTimeout(() => {
        mapRef.current.fitToCoordinates(rotaCoords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }, 500);
    }
  }, [rotaCoords]);

  // Alterar o modo de transporte (car, walk, bike)
  function handleTransportChange(mode) {
    setActiveTransport(mode);
  }

  // Botão de escanear -> navega para a CameraScreen
  function handleScanPress() {
    navigation.navigate('CameraScreen');
  }

  if (loading && !userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('TelaHome')}
      >
        <Ionicons name="arrow-back" size={28} color="#FFF" />
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Marker do usuário */}
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Você"
        />

        {/* Marker do destino, se existir */}
        {point && point.latitude && point.longitude && (
          <Marker
            coordinate={{
              latitude: parseFloat(point.latitude),
              longitude: parseFloat(point.longitude),
            }}
            title={point.nome || 'Destino'}
          />
        )}

        {/* Rota manual */}
        {rotaCoords.length > 0 && (
          <Polyline
            coordinates={rotaCoords}
            strokeColor="#E1F44B"
            strokeWidth={5}
          />
        )}
      </MapView>

      <View style={styles.footerContainer}>
        <Text style={styles.footerTitle}>Sua rota</Text>

        <View style={styles.transportRow}>
          <TouchableOpacity
            style={[
              styles.transportButton,
              activeTransport === 'car'
                ? styles.transportButtonActive
                : styles.transportButtonInactive,
            ]}
            onPress={() => handleTransportChange('car')}
          >
            <MaterialCommunityIcons name="car" size={24} color="#5B88B2" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.transportButton,
              activeTransport === 'walk'
                ? styles.transportButtonActive
                : styles.transportButtonInactive,
            ]}
            onPress={() => handleTransportChange('walk')}
          >
            <MaterialCommunityIcons name="walk" size={24} color="#5B88B2" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.transportButton,
              activeTransport === 'bike'
                ? styles.transportButtonActive
                : styles.transportButtonInactive,
            ]}
            onPress={() => handleTransportChange('bike')}
          >
            <MaterialCommunityIcons name="bike" size={24} color="#5B88B2" />
          </TouchableOpacity>

          {/* Botão para escanear */}
          <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <Ionicons
              name="qr-code"
              size={20}
              color="#3C3A3A"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.scanButtonText}>Escanear CapiPoint</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoDistance}>
            Distância: <Text style={styles.infoNumber}>{distance?.toFixed(2) || '0.00'}</Text> km
          </Text>
          <Text style={styles.infoTime}>
            Você chegará em: <Text style={styles.infoNumber}>{Math.round(duration || 0)}</Text> min
          </Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Função que gera coordenadas de rota curva "fake"
 */
function gerarRotaCurva(lat1, lon1, lat2, lon2, segments) {
  const coords = [];
  const amplitude = 0.001;
  const freq = 2;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    let lat = lat1 + (lat2 - lat1) * t;
    let lon = lon1 + (lon2 - lon1) * t;
    lat += amplitude * Math.sin(freq * Math.PI * t);
    lon += amplitude * Math.cos(freq * Math.PI * t);
    coords.push({ latitude: lat, longitude: lon });
  }
  return coords;
}

/**
 * Calcula a distância em km usando a fórmula de haversine
 */
function haversineDist(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  footerTitle: {
    color: '#3C3A3A',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  transportButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transportButtonActive: {
    backgroundColor: '#122C4F',
  },
  transportButtonInactive: {
    backgroundColor: '#D9D9D9',
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#E1F44B',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#3C3A3A',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    padding: 16,
  },
  infoDistance: {
    fontSize: 16,
    color: '#3C3A3A',
    marginBottom: 8,
    fontWeight: '600',
  },
  infoTime: {
    fontSize: 16,
    color: '#3C3A3A',
    fontWeight: '600',
  },
  infoNumber: {
    color: '#122C4F',
    fontWeight: 'bold',
    fontSize: 23,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
