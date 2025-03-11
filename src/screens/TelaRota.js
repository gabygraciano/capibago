import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TelaRota() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Rota</Text>
      {/* Aqui você coloca o mapa e a lógica de QR Code */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  title: {
    fontSize: 24
  }
});
