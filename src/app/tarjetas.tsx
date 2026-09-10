import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';


type Props = {
  texto: string;
};

function Tarjeta({ texto }: Props) {
  const [esSeleccionada, setEsSeleccionada] = useState(false);

  return (
    <Pressable
      onPress={() => setEsSeleccionada(!esSeleccionada)}
      style={[
        styles.tarjeta, esSeleccionada && styles.tarjetaSeleccionada,
      ]}
    >
      <Text style={[styles.texto, esSeleccionada && styles.textoSeleccionado]}>
        {texto}
      </Text>
    </Pressable>
  );
}


export default function App() {
  const items = ['Tarjeta 1', 'Tarjeta 2', 'Tarjeta 3', 'Tarjeta 4'];

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
      {items.map((item) => (
        <Tarjeta key={item} texto={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: '90%',
    backgroundColor: '#ecb6c9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 16,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  tarjetaSeleccionada: {
    borderColor: '#e2e2e2',
    backgroundColor: '#8e2e36',
  },
  texto: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8e2e36',
  },
  textoSeleccionado: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ecb6c9',
  },
});