// src/screens/TestCameraPermission.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function TestCameraPermission() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log('Solicitando permissão inicial da câmera...');
        const result = await Camera.requestCameraPermissionsAsync();
        console.log('Resultado inicial da permissão:', result);
        setStatus(result.status);
        Alert.alert('Status da Câmera', result.status);
      } catch (error) {
        console.error('Erro ao solicitar permissão inicial:', error);
        Alert.alert('Erro', 'Não foi possível solicitar a permissão da câmera.');
      }
    })();
  }, []);

  const requestPermission = async () => {
    try {
      console.log('Re-solicitando permissão da câmera...');
      const result = await Camera.requestCameraPermissionsAsync();
      console.log('Resultado da permissão:', result);
      setStatus(result.status);
      Alert.alert('Status da Câmera', result.status);
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      Alert.alert('Erro', 'Não foi possível solicitar a permissão da câmera.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Status da Permissão: {status || 'nenhum'}</Text>
      <Button title="Re-solicitar permissão" onPress={requestPermission} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  text: { 
    fontSize: 18, 
    marginBottom: 12 
  }
});
