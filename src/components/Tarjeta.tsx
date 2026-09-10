import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  titulo: string;
  descripcion: string;
  etiqueta?: string;
};

export default function Tarjeta({ titulo, descripcion, etiqueta }: Props) {
  const [esFavorito, setEsFavorito] = useState(false);

  return (
    <Pressable
      onPress={() => setEsFavorito(!esFavorito)}
      style={({ pressed }) => [
        styles.card,
        esFavorito && styles.cardFavorita,
        pressed && styles.cardPresionada,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={[styles.estrella, esFavorito && styles.estrellaActiva]}>
          {esFavorito ? '★' : '☆'}
        </Text>
      </View>

      <Text style={styles.descripcion}>{descripcion}</Text>

      {etiqueta && (
        <View style={styles.etiqueta}>
          <Text style={styles.etiquetaTexto}>{etiqueta}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardFavorita: {
    borderColor: '#f0a500',
    backgroundColor: '#fffaf0',
  },
  cardPresionada: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  estrella: {
    fontSize: 22,
    color: '#c4c4c4',
    marginLeft: 8,
  },
  estrellaActiva: {
    color: '#f0a500',
  },
  descripcion: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 20,
  },
  etiqueta: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef2ff',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  etiquetaTexto: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4353c4',
  },
});
