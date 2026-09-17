import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Producto = {
  id: string;
  titulo: string;
  precio: string;
  descripcion: string;
  imagen: ImageSourcePropType;
};

const productos: Producto[] = [
  {
    id: '1',
    titulo: 'L.L.Bean Boat and Tote®',
    precio: '$ 59.95',
    descripcion: 'Bolsa tote de lona resistente con cierre superior y gran capacidad, ideal para viajes o uso diario.',
    imagen: require('../../assets/images/LLBean.png'),
  },
  {
    id: '2',
    titulo: 'Lacoste Small Lenglen Bag',
    precio: '$ 250.00',
    descripcion: 'Cartera pequeña de cuero, diseño estructurado y elegante, ideal para uso diario o looks casuales.',
    imagen: {
      uri: 'https://cdn-images.farfetch-contents.com/27/30/40/05/27304005_58500988_600.jpg',
    },
  },
  {
    id: '3',
    titulo: 'Sunny Mood Vintage Patent Bag',
    precio: '$ 199.00',
    descripcion: 'Mini bolso en charol de efecto vintage con correa de hombro ajustable.',
    imagen: {
      uri: 'https://media.zadig-et-voltaire.com/product/L/W/LWBA03845_PODIUM_PACKSHOT_6943dfe7bf8d3.jpg?ixlib=js-3.3.0&auto=format%2Ccompress&q=auto&fit=crop&w=1280',
    },
  },
  {
    id: '4',
    titulo: 'Le Pliage Xtra Shoulder Bag S',
    precio: '$ 300.00',
    descripcion: 'Cartera plegable de cuero, diseño icónico de Longchamp, elegante y versátil.',
    imagen: require('../../assets/images/Longchamp.png'),
  },
];

const modos: ImageResizeMode[] = ['cover', 'contain', 'stretch'];

export default function Galeria() {
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);
  const [modo, setModo] = useState<ImageResizeMode>('cover');

  const productosFiltrados = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  function abrirProducto(producto: Producto) {
    setSeleccionado(producto);
    setModo('cover');
  }

  function toggleFavorito(id: string) {
    setFavoritos((actuales) =>
      actuales.includes(id) ? actuales.filter((favId) => favId !== id) : [...actuales, id],
    );
  }

  return (
    <View style={styles.contenedor}>
      <TextInput
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Buscar por título..."
        style={styles.buscador}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const esFavorito = favoritos.includes(item.id);

          return (
            <Pressable
              style={styles.producto}
              onPress={() => abrirProducto(item)}
              onLongPress={() => toggleFavorito(item.id)}
            >
              <Image source={item.imagen} style={styles.imagen} resizeMode="cover" />
              <View style={styles.info}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.precio}>{item.precio}</Text>
              </View>
              <Text style={[styles.favorito, esFavorito && styles.favoritoActivo]}>
                {esFavorito ? '♥' : '♡'}
              </Text>
            </Pressable>
          );
        }}
      />

      <Modal visible={seleccionado !== null} animationType="slide" transparent>
        <View style={styles.fondoModal}>
          <View style={styles.caja}>
            {seleccionado && (
              <>
                <Image source={seleccionado.imagen} style={styles.imagenGrande} resizeMode={modo} />
                <Text style={styles.tituloDetalle}>{seleccionado.titulo}</Text>
                <Text style={styles.descripcion}>{seleccionado.descripcion}</Text>

                <View style={styles.modosFila}>
                  {modos.map((m) => (
                    <Pressable
                      key={m}
                      onPress={() => setModo(m)}
                      style={[styles.modoBoton, modo === m && styles.modoBotonActivo]}
                    >
                      <Text style={[styles.modoTexto, modo === m && styles.modoTextoActivo]}>{m}</Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable style={styles.boton} onPress={() => setSeleccionado(null)}>
                  <Text style={styles.textoBoton}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
  },
  buscador: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  producto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  precio: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  favorito: {
    fontSize: 24,
    color: '#c4c4c4',
  },
  favoritoActivo: {
    color: '#8e2e36',
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  caja: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '85%',
  },
  imagenGrande: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  tituloDetalle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  },
  modosFila: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  modoBoton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#8e2e36',
    borderRadius: 8,
    paddingVertical: 8,
  },
  modoBotonActivo: {
    backgroundColor: '#8e2e36',
  },
  modoTexto: {
    textAlign: 'center',
    color: '#8e2e36',
  },
  modoTextoActivo: {
    color: 'white',
  },
  boton: {
    backgroundColor: '#ecb6c9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textoBoton: {
    color: '#8e2e36',
    fontSize: 16,
  },
});
