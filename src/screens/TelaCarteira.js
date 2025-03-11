// src/screens/TelaCarteira.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function TelaCarteira() {
  return (
    <View style={styles.container}>
      {/* Passamos bgColor="#E1F44B" para a Header */}
      <Header bgColor="#E1F44B" />

      <View style={styles.content}>
        <Text style={styles.title}>Tela Carteira</Text>
      </View>

      <BottomNavBar currentScreen="TelaCarteira" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F44B',
    paddingBottom: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
});
