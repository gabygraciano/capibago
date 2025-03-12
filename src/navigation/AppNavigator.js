// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaLogin from '../screens/TelaLogin';
import TelaHome from '../screens/TelaHome';
import TelaRota from '../screens/TelaRota';
import TelaGrupo from '../screens/TelaGrupo';
import TelaCarteira from '../screens/TelaCarteira';
import TelaGrupoInter from '../screens/TelaGrupoInter';

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

        {/* Tela Home (mapa, capipoints) */}
        <Stack.Screen 
          name="TelaHome" 
          component={TelaHome} 
          options={{ title: 'Home' }}
        />

        {/* Tela Rota (exibe rota do usuário até o ponto) */}
        <Stack.Screen 
          name="TelaRota" 
          component={TelaRota} 
          options={{ title: 'Rota' }}
        />

        {/* Tela Grupo */}
        <Stack.Screen 
          name="TelaGrupo" 
          component={TelaGrupo} 
          options={{ title: 'Grupo' }}
        />

        {/* Tela Grupo Inter (nova) */}
        <Stack.Screen 
          name="TelaGrupoInter" 
          component={TelaGrupoInter} 
          options={{ title: 'Grupo Inter' }}
        />

        {/* Tela Carteira */}
        <Stack.Screen 
          name="TelaCarteira" 
          component={TelaCarteira} 
          options={{ title: 'Carteira' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
