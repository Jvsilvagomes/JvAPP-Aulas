import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_BdaIYmbsv9fmLguTB5L0eZ2o28n-e_pZZ-h1dPTqpGHfN2VTTjPu39xsJYABsz92";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosExcluirScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [excluindoId, setExcluindoId] = useState(null);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/jogos", {
        params: { limit: 50 },
      });
      setJogos(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os jogos. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  async function excluirJogo(id) {
      setExcluindoId(id);
      try {
          
          await api.delete(`/api/jogos/${id}`);
          
          setJogos((atual) => atual.filter((item) => item.id !== id));
        } catch (e) {
            Alert.alert(
        "Não deu pra excluir o jogo",
        "A API respondeu com erro. Tenta de novo em instantes."
    );
} finally {
    setExcluindoId(null);
}
}
function confirmarExclusao(jogo) {
  Alert.alert(
    "Excluir jogo",
    `Tem certeza que quer excluir "${jogo.title}"? Essa ação não pode ser desfeita.`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => excluirJogo(jogo.id),
      },
    ]
  );
}

return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Excluir jogo</Text>
          <Text style={styles.subtitulo}>DELETE /api/jogos/:id</Text>
        </View>

        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {!carregando &&
          jogos.map((item) => (
              <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.categoria}>
                  {item.genero} · {item.plataforma} · {item.ano_lancamento}
                </Text>
              </View>
              <Pressable
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item)}
                disabled={excluindoId === item.id}
              >
                <Text style={styles.botaoExcluirTexto}>
                  {excluindoId === item.id ? "..." : "Excluir"}
                </Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fbff" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },

  erro: { color: "#c62828", marginTop: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 12,
  },
  imagem: { width: 64, height: 64 },
  info: { flex: 1, justifyContent: "center" },
  titulo: { fontSize: 16, fontWeight: "700" },
  categoria: { fontSize: 13, color: "#64748b" },

  botaoExcluir: {
    backgroundColor: "#c62828",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botaoExcluirTexto: { color: "white", fontWeight: "700", fontSize: 13 },
});