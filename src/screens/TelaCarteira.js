// src/screens/TelaCarteira.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

import { supabase } from "../services/supabaseClient";
import iconMoeda from "../assets/icon-moeda.png";
import capiPointIcon from "../assets/CapiPoint.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TelaCarteira() {
  const [selectedDate, setSelectedDate] = useState("");

  // Estados que vão armazenar os valores vindos do Supabase
  const [kmAndados, setKmAndados] = useState(0);
  const [capipontos, setCapipontos] = useState(0);
  const [capiba, setCapiba] = useState(0);
  const [co2Evitados, setCo2Evitados] = useState("0kg");

  // user_id como texto
  const userId = "11395297495";

  // Carrega a data atual ao iniciar
  useEffect(() => {
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
    setSelectedDate(localDate);
  }, []);

  // useFocusEffect: recarrega a cada vez que a tela Carteira ganha foco
  useFocusEffect(
    React.useCallback(() => {
      fetchCarteira();
    }, [])
  );

  async function fetchCarteira() {
    try {
      const { data, error } = await supabase
        .from("carteira")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (error) {
        console.error("Erro ao buscar dados da carteira:", error);
        Alert.alert("Erro", "Não foi possível carregar a carteira.");
        return;
      }
      if (data) {
        // Atualiza os estados com os valores do banco
        setKmAndados(data.km_andados || 0);
        setCapipontos(data.capipontos || 0);
        setCapiba(data.capiba || 0);
        setCo2Evitados(data.co2_evitados || "0kg");
      }
    } catch (err) {
      console.error("Exceção ao buscar carteira:", err);
      Alert.alert("Erro", "Ocorreu um problema ao carregar a carteira.");
    }
  }

  function openFeirinha() {
    const url = "https://conecta.recife.pe.gov.br/servico/949";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o site.");
      }
    });
  }

  return (
    <View style={styles.container}>
      <Header bgColor="#E1F44B" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Seção de saldo */}
        <View style={styles.saldoSection}>
          <Text style={styles.saldoText}>Saldo</Text>
          <View style={styles.saldoContainer}>
            <View style={styles.saldoLeft}>
              <Image source={iconMoeda} style={styles.icon} />
              <Text style={styles.saldoValor}>{capipontos} Capipontos</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={openFeirinha}>
              <Text style={styles.buttonText}>
                Ir para <Text style={styles.boldText}>feirinha</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.minhaSemanaTitulo}>Minha semana</Text>
        <View style={styles.statsContainer}>
          {/* Km andados */}
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="run" size={32} color="#5B88B2" />
            <Text style={styles.statNumber}>{kmAndados} km</Text>
            <Text style={styles.statLabel}>andados</Text>
          </View>
          {/* Capipontos */}
          <View style={styles.statItem}>
            <Image source={capiPointIcon} style={styles.statIcon} />
            <Text style={styles.statNumber}>{capipontos}</Text>
            <Text style={styles.statLabel}>Capipontos</Text>
          </View>
          {/* Capiba */}
          <View style={styles.statItem}>
            <Image
              source={iconMoeda}
              style={[styles.statIcon, { tintColor: "#188A56" }]}
            />
            <Text style={styles.statNumber}>{capiba}</Text>
            <Text style={styles.statLabel}>capiba</Text>
          </View>
          {/* CO2 evitados */}
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#122C4F" }]}>CO2</Text>
            <Text style={styles.statNumber}>{co2Evitados}</Text>
            <Text style={styles.statLabel}>evitados</Text>
          </View>
        </View>

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

        <Text style={styles.textoFinal}>
          Nenhuma atividade registrada nesta data.
        </Text>
        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavBar currentScreen="TelaCarteira" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E1F44B" },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  saldoSection: {
    backgroundColor: "#d4ec4f",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
  },
  saldoText: {
    fontSize: 18,
    marginBottom: 8,
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
  icon: { width: 24, height: 24, marginRight: 8 },
  saldoValor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007f00",
  },
  button: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginTop: -20,
  },
  buttonText: { color: "#000", fontSize: 16 },
  boldText: { fontWeight: "bold" },
  minhaSemanaTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 20,
    marginTop: 10,
  },
  statItem: { alignItems: "center" },
  statIcon: { width: 32, height: 32, resizeMode: "contain" },
  statNumber: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: { fontSize: 16, color: "#333", marginTop: 4 },
  calendarContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
  },
  textoFinal: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
});
