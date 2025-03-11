// src/screens/TelaGrupo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function TelaGrupo() {
  return (
    <View style={styles.container}>
      {/* Passamos bgColor="#FBF9E4" para a Header */}
      <Header bgColor="#FBF9E4" />

      <View style={styles.content}>
        <Text style={styles.title}>Tela Grupo</Text>
      </View>

      <BottomNavBar currentScreen="TelaGrupo" />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
});
