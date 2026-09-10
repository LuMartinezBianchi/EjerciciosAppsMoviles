import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Perfil() {
  const [nombre, setNombre] = useState('Lucia Martinez Bianchi');
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreInput, setNombreInput] = useState(nombre);

  function abrirModal() {
    setNombreInput(nombre);
    setModalVisible(true);
  }

  function guardarNombre() {
    setNombre(nombreInput);
    setModalVisible(false);
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.nombre}>{nombre}</Text>

      <Pressable style={styles.boton} onPress={abrirModal}>
        <Text style={styles.textoBoton}>Cambiar nombre</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.fondoModal}>
          <View style={styles.caja}>
            <TextInput
              style={styles.input}
              value={nombreInput}
              onChangeText={setNombreInput}
              placeholder="Escribí tu nombre"
            />
            <Pressable style={styles.boton} onPress={guardarNombre}>
              <Text style={styles.textoBoton}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#ecb6c9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#8e2e36',
    fontSize: 16,
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  caja: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});