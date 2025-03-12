// src/screens/TelaGrupo.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

// Importando imagens dos assets
import Grupo1 from "../assets/grupo1.png";
import Grupo2 from "../assets/grupo2.png";
import AddGrupoIcon from "../assets/addGrupo.png";
import WhatsAppIcon from "../assets/whatsapp.png";
import InstagramIcon from "../assets/instagram.png";
import TwitterIcon from "../assets/twitter.png";
import ShareIcon from "../assets/share.png";
import CopyIcon from "../assets/copy.png";

export default function TelaGrupo() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCopyCode = () => {
    console.log("Código copiado!");
  };

  return (
    <View style={styles.container}>
      <Header bgColor="#FBF9E4" />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Competição de Capibas</Text>

        {/* Grupos */}
        <View style={styles.groupsContainer}>
          <Text style={styles.subTitle}>Grupos</Text>
          <View style={styles.groupsList}>
            <TouchableOpacity
              onPress={() => navigation.navigate("TelaGrupoInter")}
            >
              <Image source={Grupo1} style={styles.groupIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Grupo2} style={styles.groupIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addGroupButton}>
              <Image source={AddGrupoIcon} style={styles.addGroupIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Posição no placar */}
        <Text style={styles.subTitle}>Sua posição no placar</Text>
        <View style={styles.rankContainer}>
          <TouchableOpacity
            style={[styles.rankItem, styles.rankBorder]}
            onPress={() => navigation.navigate("TelaGrupoInter")}
          >
            <Image source={Grupo1} style={styles.groupIcon} />
            <View>
              <Text style={styles.rankText}>Nuvens do Ibura</Text>
              <Text style={styles.rankSubtext}>2º Lugar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rankItem}>
            <Image source={Grupo2} style={styles.groupIcon} />
            <View>
              <Text style={styles.rankText}>Capibanos de Casa Forte</Text>
              <Text style={styles.rankSubtext}>5º Lugar</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Criar Grupo e Entrada de Código */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.createGroupButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.createGroupText}>Criar Grupo</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Código do Grupo"
              placeholderTextColor="#999" // Define a cor do placeholder
            />
            <TouchableOpacity style={styles.enterButton}>
              <Text style={styles.enterText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomNavBar currentScreen="TelaGrupo" />

      {/* MODAL DO GRUPO CRIADO */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Grupo Criado</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.groupCode}>786XT</Text>
              <TouchableOpacity onPress={handleCopyCode}>
                <Image source={CopyIcon} style={styles.copyIcon} />
              </TouchableOpacity>
            </View>

            {/* Botões de Compartilhamento */}
            <View style={styles.shareButtons}>
              <TouchableOpacity>
                <Image source={WhatsAppIcon} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={InstagramIcon} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={TwitterIcon} style={styles.shareIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={ShareIcon} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>

            {/* Link de convite */}
            <View style={styles.linkContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.linkText}
              >
                https://capibago.com/grupo/786XT
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyCode}
              >
                <Text style={styles.copyButtonText}>Copiar</Text>
              </TouchableOpacity>
            </View>

            {/* Fechar Modal */}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9E4",
    paddingBottom: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  groupsContainer: {
    marginBottom: 20,
  },
  groupsList: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  addGroupIcon: {
    width: 40,
    height: 40,
  },
  rankContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  rankBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  actionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  createGroupButton: {
    backgroundColor: "#D9ED3A",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  createGroupText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  enterButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: -7.5,
  },
  enterText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  groupCode: {
    fontSize: 24,
    fontWeight: "bold",
  },
  copyIcon: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  shareButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  shareIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    color: "rgba(0, 0, 0, 0.6)", // Reduzindo opacidade
  },
  copyButton: {
    backgroundColor: "#D9ED3A",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  copyButtonText: {
    fontWeight: "bold",
  },
  closeModalButton: {
    marginTop: 10,
  },
});
