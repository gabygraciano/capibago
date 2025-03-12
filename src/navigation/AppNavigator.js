<<<<<<< HEAD
// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
>>>>>>> 4d4130498473ac539bff00b0525a4ddfd5b9f843

import TelaLogin from "../screens/TelaLogin";
import TelaHome from "../screens/TelaHome";
import TelaRota from "../screens/TelaRota";
import TelaGrupo from "../screens/TelaGrupo";
import TelaCarteira from "../screens/TelaCarteira";
import TelaGrupoInter from "../screens/TelaGrupoInter";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
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

        {/* Tela Carteira */}
        <Stack.Screen 
          name="TelaCarteira" 
          component={TelaCarteira} 
          options={{ title: 'Carteira' }}
        />
=======
      <Stack.Navigator initialRouteName="TelaCarteira">
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TelaHome" component={TelaHome} />
        <Stack.Screen name="TelaRota" component={TelaRota} />
        <Stack.Screen name="TelaGrupo" component={TelaGrupo} />
        <Stack.Screen name="TelaGrupoInter" component={TelaGrupoInter} />
        <Stack.Screen name="TelaCarteira" component={TelaCarteira} />
>>>>>>> 4d4130498473ac539bff00b0525a4ddfd5b9f843
      </Stack.Navigator>
    </NavigationContainer>
  );
}
