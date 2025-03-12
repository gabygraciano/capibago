import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

import iconMoeda from "../assets/icon-moeda.png";
import imgMinhaSemana from "../assets/minha-semana.png";

export default function TelaCarteira() {
  const [selectedDate, setSelectedDate] = useState("");

  // Definir a data atual ao iniciar a tela
  useEffect(() => {
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA"); // "YYYY-MM-DD" no formato correto
    setSelectedDate(localDate);
  }, []);

  return (
    <View style={styles.container}>
      <Header bgColor="#E1F44B" />

      {/* Conteúdo com Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Seção de saldo */}
        <View style={styles.saldoSection}>
          <Text style={styles.saldoText}>Saldo</Text>
          <View style={styles.saldoContainer}>
            <View style={styles.saldoLeft}>
              <Image source={iconMoeda} style={styles.icon} />
              <Text style={styles.saldoValor}>450 Capibas</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                Ir para <Text style={styles.boldText}>feirinha</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção "Minha semana" */}
        <Text style={styles.minhaSemanaTitulo}>Minha semana</Text>
        <Image source={imgMinhaSemana} style={styles.minhaSemanaImage} />

        {/* Calendário */}
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#4A90E2" },
            }}
            theme={{
              backgroundColor: "#E1F44B",
              calendarBackground: "#F9F9F9",
              todayTextColor: "#4A90E2",
              selectedDayBackgroundColor: "#4A90E2",
              arrowColor: "#4A90E2",
            }}
          />
        </View>

        {/* Texto final */}
        <Text style={styles.textoFinal}>
          Nenhuma atividade registrada nesta data.
        </Text>

        {/* Espaço extra para evitar sobreposição com a navbar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Barra de navegação fixa */}
      <BottomNavBar currentScreen="TelaCarteira" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F44B",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Pequeno espaçamento extra para segurança
  },
  saldoSection: {
    backgroundColor: "#d4ec4f",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
  },
  saldoText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left",
  },
  saldoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saldoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  saldoValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007f00",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginTop: -20,
  },
  buttonText: {
    color: "#000",
  },
  minhaSemanaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  minhaSemanaImage: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    resizeMode: "contain",
    marginTop: -100,
  },
  calendarContainer: {
    marginHorizontal: 20,
    marginTop: -90,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
  },
  textoFinal: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});
