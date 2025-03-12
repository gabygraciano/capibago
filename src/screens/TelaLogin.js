// src/screens/TelaLogin.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput,
  Alert
} from 'react-native';

// Importe seu supabaseClient
import { supabase } from '../services/supabaseClient';

export default function TelaLogin({ navigation }) {
  const [cpf, setCpf] = useState('');

  async function handleLogin() {
    if (!cpf) {
      Alert.alert('CPF obrigatório', 'Por favor, digite seu CPF antes de entrar.');
      return;
    }

    try {
      // 1) Verificar se o CPF já existe no Supabase
      let { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('cpf', cpf)
        .single();

      // Se houver um erro que não seja "No rows", exibir alerta
      if (error && !error.message.includes('No rows')) {
        console.log('Erro ao buscar usuário:', error);
        Alert.alert('Erro', 'Falha ao verificar CPF. Tente novamente.');
        return;
      }

      let userId = null;

      // 2) Se não encontrou o usuário (existingUser = undefined), criar
      if (!existingUser) {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{ cpf }])
          .single();

        if (insertError) {
          console.log('Erro ao criar usuário:', insertError);
          Alert.alert('Erro', 'Falha ao criar usuário. Tente novamente.');
          return;
        }
        userId = newUser.id;
      } else {
        // Já existe
        userId = existingUser.id;
      }

      // 3) Navegar para TelaHome passando userId e cpf (se quiser usar lá)
      navigation.navigate('TelaHome', { userId, cpf });

    } catch (err) {
      console.log('Erro geral:', err);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    }
  }

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

      {/* Input para CPF */}
      <TextInput
        style={styles.inputCPF}
        placeholder="Digite seu CPF"
        placeholderTextColor="#25367399"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      {/* Botão de Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
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
    marginBottom: -10, 
  },
  inputCPF: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: 280,
    height: 43,
    marginBottom: 70,
    textAlign: 'center',
    fontSize: 15,
    color: '#253673',
  },
  loginButton: {
    backgroundColor: '#253673',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: -50,
  },
  loginButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
