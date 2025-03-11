import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaLogin({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Ícone no topo direito */}
      <Image
        source={require('../assets/iconeLogin.png')}
        style={styles.topIcon}
      />

      {/* Logo centralizada */}
      <Image
        source={require('../assets/logoLogin.png')}
        style={styles.logo}
      />

      {/* Botão de Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          // Exemplo: navega para TelaHome
          navigation.navigate('TelaHome');
        }}
      >
        <Text style={styles.loginButtonText}>
          ENTRAR COM <Text style={styles.boldText}>CONECTA RECIFE</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F44B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 110,
    height: 110,
    marginTop: 40,
    resizeMode: 'contain',
  },
  logo: {
    width: 280,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 60, 
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: -66,
  },
  loginButtonText: {
    fontSize: 15,
    color: '#253673',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
