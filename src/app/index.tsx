import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.numero}>{contador}</Text>

      <Pressable style={styles.boton} onPress={() => setContador(contador + 1)}>
        <Text style={styles.textoBoton}>Sumar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numero: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#ecb6c9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#8e2e36',
    fontSize: 16,
  },
});