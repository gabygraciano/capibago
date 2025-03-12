// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar as telas
import TelaLogin from '../screens/TelaLogin';
import TelaHome from '../screens/TelaHome';
import TelaRota from '../screens/TelaRota';
import TelaGrupo from '../screens/TelaGrupo';
import TelaGrupoInter from '../screens/TelaGrupoInter';
import TelaCarteira from '../screens/TelaCarteira';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        {/* Tela de Login */}
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />

        {/* Tela Home */}
        <Stack.Screen
          name="TelaHome"
          component={TelaHome}
          options={{ headerShown: false }}
        />

        {/* Tela Rota */}
        <Stack.Screen
          name="TelaRota"
          component={TelaRota}
          options={{ headerShown: false }}
        />

        {/* Tela Grupo */}
        <Stack.Screen
          name="TelaGrupo"
          component={TelaGrupo}
          options={{ headerShown: false }}
        />

        {/* Tela Grupo Intermediária */}
        <Stack.Screen
          name="TelaGrupoInter"
          component={TelaGrupoInter}
          options={{ headerShown: false }}
        />

        {/* Tela Carteira */}
        <Stack.Screen
          name="TelaCarteira"
          component={TelaCarteira}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
