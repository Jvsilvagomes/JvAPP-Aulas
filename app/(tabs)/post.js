import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_4Wzbmq_cSP52WLG8CRjj1ipOGbM4G0kFgT-e39euq91PKudf84jTsW3omAWsBsIO";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [estudio, setEstudio] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarJogo() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/jogos", {
        title: titulo,
        description: descricao,
        imageUrl: imagemUrl,
        estudio,
        plataforma,
        genero,
      });

      Alert.alert("Jogo criado!", resposta.data.title);
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setEstudio("");
      setPlataforma("");
      setGenero("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o jogo",
        "A API respondeu com erro. Confere se todos os campos estão corretos e tenta de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar jogo</Text>
          <Text style={styles.subtitulo}>POST /api/jogos</Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Run Simulator"
        />

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={styles.campo}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Jogo de corrida de carros"
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/jogoCorrida.jpg"
        />

        <Text style={styles.secao}>Campos específicos do tema "jogos"</Text>

        <Text style={styles.rotulo}>Estúdio</Text>
        <TextInput
          style={styles.campo}
          value={estudio}
          onChangeText={setEstudio}
          placeholder="Ex: Ubisoft"
        />

        <Text style={styles.rotulo}>Gênero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Simulação"
        />

        <Text style={styles.rotulo}>Plataforma</Text>
        <TextInput
          style={styles.campo}
          value={plataforma}
          onChangeText={setPlataforma}
          placeholder="Ex: PlayStation 5"
        />

        <Pressable style={styles.botao} onPress={criarJogo} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar jogo"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#eef4f8" },
  conteudo: { padding: 22, paddingBottom: 52 },
  header: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#12304a",
    borderBottomWidth: 4,
    borderBottomColor: "#f28f3b",
  },
  tituloPagina: { fontSize: 28, fontWeight: "800", color: "#ffffff" },
  subtitulo: { fontSize: 14, color: "#b9d1df", marginTop: 6 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#12304a",
    marginTop: 12,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#c8d7df",
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#29465a",
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  campo: {
    borderWidth: 1,
    borderColor: "#c4d3dc",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    color: "#183247",
    fontSize: 15,
    minHeight: 48,
  },
  botao: {
    backgroundColor: "#e76f2f",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#12304a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  botaoTexto: { color: "#ffffff", fontWeight: "800", fontSize: 15 },
});