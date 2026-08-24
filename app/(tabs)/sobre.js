import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Olá, eu sou o João!</Text>
        <Text style={styles.subtitle}>Desenvolvedor FullStack & Apaixonado por Tecnologia e Esportes</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={require("../../assets/fotoMinha.png")} 
          style={styles.profileImage}
        />
      </View>

      <View style={styles.cardsContainer}>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Minha Trajetória 🚀</Text>
          <Text style={styles.cardText}>
            Atualmente sou estudante do curso técnico de desenvolvimento de sistemas do SENAI Valinhos-SP
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meus Hobbies 🎮</Text>
          <Text style={styles.cardText}>
            Quando não estou codando, gosto de jogar videogame e praticar qualquer tipo de esporte.
          </Text>
        </View>

      </View>

      <View style={styles.buttonsContainer}>
        
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => alert('Abrindo portfólio...')}>
          <Text style={styles.buttonPrimaryText}>Ver Meu Portfólio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => alert('Copiando email...')}>
          <Text style={styles.buttonSecondaryText}>Entrar em Contato</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9', // Cor de fundo do app
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B2D42', // Cor principal
  },
  subtitle: {
    fontSize: 16,
    color: '#8D99AE',
    marginTop: 5,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Deixa a imagem redonda
    borderWidth: 3,
    borderColor: '#EF233C', // Cor de destaque
  },
  cardsContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  buttonsContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#EF233C', // Botão preenchido com a cor de destaque
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF233C', // Botão apenas com contorno
  },
  buttonSecondaryText: {
    color: '#EF233C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});