import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
