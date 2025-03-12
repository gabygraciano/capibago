import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

// Ícones de exemplo (Ionicons, MaterialCommunityIcons)
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TelaRota({ route, navigation }) {
  const { point } = route.params; // { latitude, longitude, nome, etc. }

  const [userLocation, setUserLocation] = useState(null);
  const [rotaCoords, setRotaCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para saber qual modal (car, walk, bike) está ativo
  const [activeTransport, setActiveTransport] = useState('walk');

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização não concedida');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (userLocation) {
      criarRotaManual();
    }
  }, [userLocation, activeTransport]);

  function criarRotaManual() {
    // Gera rota curva manual com 10 segmentos
    const coords = gerarRotaCurva(
      userLocation.latitude,
      userLocation.longitude,
      parseFloat(point.latitude),
      parseFloat(point.longitude),
      10
    );

    // Distância "reta" via haversine
    const dist = haversineDist(
      userLocation.latitude,
      userLocation.longitude,
      parseFloat(point.latitude),
      parseFloat(point.longitude)
    );
    setDistance(dist);

    // Exemplo: se for 'car', definimos velocidade 40 km/h
    // se 'walk', 5 km/h, se 'bike', 15 km/h
    let speed = 5; // default walk
    if (activeTransport === 'car') speed = 40;
    if (activeTransport === 'bike') speed = 15;

    // tempo em horas = dist / speed
    // converter p/ minutos
    const tempoMin = (dist / speed) * 60;
    setDuration(tempoMin);

    setRotaCoords(coords);
    setLoading(false);
  }

  // Ajustar mapa p/ caber a rota
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

  // Função p/ trocar modal ativo
  function handleTransportChange(mode) {
    setActiveTransport(mode);
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
      {/* Mapa */}
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
        {/* Marcador do usuário */}
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Você"
        />

        {/* Marcador do destino */}
        <Marker
          coordinate={{
            latitude: parseFloat(point.latitude),
            longitude: parseFloat(point.longitude),
          }}
          title={point.nome || 'Destino'}
          description={point.descricao || ''}
        />

        {/* Rota manual */}
        {rotaCoords.length > 0 && (
          <Polyline
            coordinates={rotaCoords}
            strokeColor="#E1F44B" 
            strokeWidth={5}
          />
        )}
      </MapView>

      {/* Componente branco embaixo */}
      <View style={styles.footerContainer}>
        {/* Título */}
        <Text style={styles.footerTitle}>Sua rota</Text>

        {/* Linha com botões de modal + botão Escanear */}
        <View style={styles.transportRow}>
          {/* Botão carro */}
          <TouchableOpacity
            style={[
              styles.transportButton,
              activeTransport === 'car'
                ? styles.transportButtonActive
                : styles.transportButtonInactive,
            ]}
            onPress={() => handleTransportChange('car')}
          >
            <MaterialCommunityIcons
              name="car"
              size={24}
              color="#5B88B2"
            />
          </TouchableOpacity>

          {/* Botão caminhada */}
          <TouchableOpacity
            style={[
              styles.transportButton,
              activeTransport === 'walk'
                ? styles.transportButtonActive
                : styles.transportButtonInactive,
            ]}
            onPress={() => handleTransportChange('walk')}
          >
            <MaterialCommunityIcons
              name="walk"
              size={24}
              color="#5B88B2"
            />
          </TouchableOpacity>

          {/* Botão bike */}
          <TouchableOpacity
            style={[
              styles.transportButton,
              activeTransport === 'bike'
                ? styles.transportButtonActive
                : styles.transportButtonInactive,
            ]}
            onPress={() => handleTransportChange('bike')}
          >
            <MaterialCommunityIcons
              name="bike"
              size={24}
              color="#5B88B2"
            />
          </TouchableOpacity>

          {/* Botão Escanear */}
          <TouchableOpacity style={styles.scanButton}>
            <Ionicons
              name="qr-code"
              size={20}
              color="#3C3A3A"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.scanButtonText}>Escanear CapiPoint</Text>
          </TouchableOpacity>
        </View>

        {/* Box cinza p/ dist e tempo */}
        <View style={styles.infoBox}>
          <Text style={styles.infoDistance}>
            Distância: <Text style={styles.infoNumber}>{distance?.toFixed(2)}</Text> km
          </Text>
          <Text style={styles.infoTime}>
            Você chegará em: <Text style={styles.infoNumber}>{Math.round(duration || 0)}</Text> min
          </Text>
        </View>
      </View>
    </View>
  );
}

/** Rota Curva Manual */
function gerarRotaCurva(lat1, lon1, lat2, lon2, segments) {
  const coords = [];
  const amplitude = 0.001; 
  const freq = 2;         

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    let lat = lat1 + (lat2 - lat1) * t;
    let lon = lon1 + (lon2 - lon1) * t;

    // offset sinusoidal
    lat += amplitude * Math.sin(freq * Math.PI * t);
    lon += amplitude * Math.cos(freq * Math.PI * t);

    coords.push({ latitude: lat, longitude: lon });
  }
  return coords;
}

/** Distância Haversine */
function haversineDist(lat1, lon1, lat2, lon2) {
  const R = 6371; 
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
  loadingContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  map: { flex: 1 },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Aumentar altura e bordas
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
    marginLeft: 'auto', // empurra p/ direita
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
    fontSize: 28,
  },
});
