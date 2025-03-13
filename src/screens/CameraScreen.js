// src/screens/CameraScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../services/supabaseClient';

export default function CameraScreen({ navigation }) {
  const [loading, setLoading] = useState(true);     // Exibe "Aguardando captura..."
  const [scanning, setScanning] = useState(false);  // Exibe "Escaneando..."

  // user_id como texto
  const userId = "11395297495";

  async function atualizarCarteira() {
    try {
      // Exemplo de update com increment ou valores fixos
      const { data: carteiraAtual, error: errorSelect } = await supabase
        .from('carteira')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (errorSelect) {
        console.error('Erro ao buscar carteira:', errorSelect);
        Alert.alert('Erro', 'Não foi possível carregar a carteira atual.');
        return;
      }

      // Exemplo: incrementando valores (ou use fixos se preferir)
      const novoKm = (carteiraAtual?.km_andados || 0) + 1;
      const novoCapipontos = (carteiraAtual?.capipontos || 0) + 2;
      const novoCapiba = (carteiraAtual?.capiba || 0) + 10;

      const { data, error } = await supabase
        .from('carteira')
        .update({
          km_andados: novoKm,
          capipontos: novoCapipontos,
          capiba: novoCapiba,
          co2_evitados: '0.8kg', // Pode ser fixo ou calculado
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Erro ao atualizar carteira:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a carteira.');
      } else {
        console.log('Carteira atualizada com sucesso:', data);
      }
    } catch (err) {
      console.error('Exceção ao atualizar carteira:', err);
      Alert.alert('Erro', 'Ocorreu um problema ao atualizar a carteira.');
    }
  }

  useEffect(() => {
    async function openCamera() {
      // 1. Solicita permissão
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de câmera não concedida');
        navigation.goBack();
        return;
      }
      
      // 2. Abre a câmera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      
      // 3. Câmera retornou (usuário tirou foto ou cancelou)
      setLoading(false);     // Para de exibir "Aguardando captura..."
      setScanning(true);     // Inicia "Escaneando..."

      // 4. Aguarda 3 segundos de cooldown
      setTimeout(async () => {
        await atualizarCarteira();
        setScanning(false);  // Para de exibir "Escaneando..."
        navigation.goBack();
        Alert.alert(
          'QR Code validado com sucesso',
          'Suas capibas foram adicionadas à carteira.'
        );
      }, 3000);
    }

    openCamera();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Overlay de "Aguardando captura..." */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.text}>Aguardando captura...</Text>
        </View>
      )}

      {/* Overlay de "Escaneando..." */}
      {scanning && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.text}>Escaneando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { 
    marginTop: 16, 
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
});
