// src/components/BottomNavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Ícones do @expo/vector-icons
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomNavBar({ currentScreen }) {
  const navigation = useNavigation();

  // Define cor do item conforme a tela atual
  const getColor = (screenName) => {
    return currentScreen === screenName ? '#E1F44B' : '#5B88B2';
  };

  return (
    <View style={styles.container}>

      {/* Botão Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('TelaHome')}
      >
        <Ionicons 
          name="home" 
          size={32}  // Ícone maior
          color={getColor('TelaHome')}
        />
        <Text style={[styles.label, { color: getColor('TelaHome') }]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Botão Grupo */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('TelaGrupo')}
      >
        <MaterialCommunityIcons 
          name="account-group" 
          size={32} 
          color={getColor('TelaGrupo')}
        />
        <Text style={[styles.label, { color: getColor('TelaGrupo') }]}>
          Grupo
        </Text>
      </TouchableOpacity>

      {/* Botão Carteira */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('TelaCarteira')}
      >
        <MaterialCommunityIcons 
          name="wallet" 
          size={32} 
          color={getColor('TelaCarteira')}
        />
        <Text style={[styles.label, { color: getColor('TelaCarteira') }]}>
          Carteira
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#122C4F',
    // Espaçamento maior em cima e embaixo
    paddingVertical: 25,
    // Espaçamento maior nas laterais
    paddingHorizontal: 40,
    
    // Maior espaço entre os 3 botões
    justifyContent: 'space-between',
    alignItems: 'center',

    // Fixar no rodapé
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,      // Texto um pouco maior
    marginTop: 8,      // Espaço maior entre ícone e texto
  },
});
