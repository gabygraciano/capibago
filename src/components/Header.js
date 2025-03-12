// src/components/Header.js
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ bgColor = '#FFF' }) {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Linha superior com logo e ícone de sair */}
      <View style={styles.topRow}>
        <Image
          source={require('../assets/logoLogin.png')}
          style={styles.logo}
        />

        {/* Botão de logout com marginTop */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => navigation.navigate('TelaLogin')}
        >
          <Ionicons name="log-out-outline" size={40} color="#122C4F" />
        </TouchableOpacity>
      </View>

      {/* Linha inferior com foto e texto de boas-vindas */}
      <View style={styles.profileRow}>
        <Image
          source={require('../assets/fotoLucas.png')}
          style={styles.profilePic}
        />

        <View style={styles.profileTextContainer}>
          <Text style={styles.greeting}>
            <Text style={styles.boldText}>Olá, Lucas!</Text>
          </Text>
          <Text style={styles.welcome}>Seja bem-vindo.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  // Botão de logout com marginTop
  logoutButton: {
    marginTop: 50,
  },
  logo: {
    width: 160,
    height: 70,
    resizeMode: 'contain',
    marginTop: -10,
    marginBottom: -80,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 16,
    resizeMode: 'cover',
    marginTop: 5,
  },
  profileTextContainer: {
    marginLeft: 12,
    marginTop: 27,
  },
  greeting: {
    color: '#122C4F',
    fontSize: 20,
    lineHeight: 26,
  },
  boldText: {
    fontWeight: 'bold',
  },
  welcome: {
    color: '#122C4F',
    fontSize: 22,
  },
});
