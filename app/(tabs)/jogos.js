import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import { SafeAreaView } from "react-native-safe-area-context"

const API_KEY = "cv_Bud-N0aj7kbrbc9yCPKsTQBum7XD0EElCyLbT2K7E8D5SYdh47pazcV8wgRt4_fU"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY
    }
})

export default function JogosListarScreen() {
    const [jogos, setJogos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarJogos() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/jogos", {
                params: { limit: 50 }
            })
            setJogos(resposta.data.data)
        } catch (error) {
            setErro("Não foi possivel carregar jogos. Tente novamente mais tarde.")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarJogos()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar jogos</Text>
                    <Text style={styles.subtitulo}>GET /api/jogos</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    jogos.map((jogo) => (
                        <View key={jogo.id} style={styles.card}>
                            <Image source={{ uri: jogo.imageUrl }} style={styles.imagem} height={64} width={64} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{jogo.title}</Text>
                                <Text style={styles.categoria}>
                                    {jogo.category} · {jogo.year}
                                </Text>
                            </View>
                        </View>
                    ))}
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
    erro: {
        color: "#a52a2a",
        marginTop: 12,
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#fee2e2",
    },
    card: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
        minHeight: 88,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d9e3e9",
        shadowColor: "#12304a",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    imagem: { width: 88, height: 88, backgroundColor: "#dbe5f0" },
    info: { flex: 1, justifyContent: "center", paddingVertical: 12, paddingRight: 14 },
    titulo: { fontSize: 16, fontWeight: "800", color: "#183247" },
    categoria: { fontSize: 13, color: "#647b89", marginTop: 5 },
});