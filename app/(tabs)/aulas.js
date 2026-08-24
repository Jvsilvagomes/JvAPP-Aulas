import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessons = [
  "Criar componentes reutilizáveis",
  "Consumir APIs com fetch",
  "Organizar navegação por arquivos",
  "Trabalhar com estado e formulários",
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sugestão de trilha</Text>
        <Text style={styles.description}>
          Esta aba já pode servir como ponto de partida para exercícios e
          atividades práticas.
        </Text>

        <View style={styles.list}>
          {lessons.map((lesson, index) => (
            <View key={lesson} style={styles.listItem}>
              <Text style={styles.badge}>{index + 1}</Text>
              <Text style={styles.listText}>{lesson}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffdf7",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3d2c00",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#5f4b1b",
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 32,
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    backgroundColor: "#f59e0b",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: "#3d2c00",
  },
});
