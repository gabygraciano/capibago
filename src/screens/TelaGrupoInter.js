import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'; // Ícone de setinha

const membros = [
  {
    id: "1",
    nome: "Miguel",
    pontos: 100,
    imagem: require("../assets/miguel.png"),
  },
  {
    id: "2",
    nome: "Lucas",
    pontos: 90,
    imagem: require("../assets/lucas.png"),
  },
  {
    id: "3",
    nome: "Joana",
    pontos: 65,
    imagem: require("../assets/joana.png"),
  },
  {
    id: "4",
    nome: "Nicoly",
    pontos: 62,
    imagem: require("../assets/nicoly.png"),
  },
  {
    id: "5",
    nome: "Cláudio",
    pontos: 54,
    imagem: require("../assets/claudio.png"),
  },
  {
    id: "6",
    nome: "Raphael",
    pontos: 50,
    imagem: require("../assets/raphael.png"),
  },
  {
    id: "7",
    nome: "Clara",
    pontos: 48,
    imagem: require("../assets/clara.png"),
  },
  {
    id: "8",
    nome: "Isabela",
    pontos: 45,
    imagem: require("../assets/isabela.png"),
  },
];

const TelaGrupoInter = ({ navigation }) => {
  function handleBack() {
    // Volta para TelaGrupo
    navigation.navigate("TelaGrupo");
  }

  return (
    <View style={styles.container}>

      {/* Ícone de setinha no canto superior esquerdo */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Cabeçalho do Grupo */}
      <View style={styles.header}>
        <Image
          source={require("../assets/nuvens-do-ibura.png")}
          style={styles.grupoImagem}
        />
        <View>
          <Text style={styles.grupoNome}>Nuvens do Ibura</Text>
          <Text style={styles.grupoCodigo}>Código: XM345</Text>
        </View>
      </View>

      <Text style={styles.titulo}>Competição de Capibas</Text>

      <FlatList
        data={membros}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.membro}>
            <Text style={styles.posicao}>{index + 1}º</Text>
            <Image source={item.imagem} style={styles.membroImagem} />
            <Text style={styles.membroNome}>{item.nome}</Text>
            <View style={styles.pontosContainer}>
              <Image
                source={require("../assets/moeda.png")}
                style={styles.moeda}
              />
              <Text style={styles.pontos}>{item.pontos} capibas</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFBE6",
    padding: 20,
    // Adiciona mais espaço no topo
    paddingTop: 60, 
  },
  // Ícone de voltar (setinha)
  backButton: {
    position: 'absolute',
    top: 30, 
    left: 20,
    zIndex: 10,
    backgroundColor: '#253673',
    borderRadius: 20,
    padding: 6,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 60, // espaçamento extra
  },
  grupoImagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  grupoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E2A47",
  },
  grupoCodigo: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E2A47",
    marginBottom: 10,
  },
  membro: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  posicao: {
    fontSize: 16,
    fontWeight: "bold",
    width: 30,
    color: "#1E2A47",
  },
  membroImagem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  membroNome: {
    fontSize: 16,
    flex: 1,
    color: "#1E2A47",
  },
  pontosContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moeda: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  pontos: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2A47",
  },
});

export default TelaGrupoInter;
