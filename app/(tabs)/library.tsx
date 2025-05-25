import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function AllBooks() {
  const [books, setBooks] = useState([
    {
      id: '1',
      image: 'https://img.kitapyurdu.com/v1/getImage/fn:11484453/wh:true/miw:200/mih:200',
    },
    {
      id: '2',
      image: 'https://img.kitapyurdu.com/v1/getImage/fn:4060202/wh:true/wi:800',
    },
    {
      id: '3',
      image:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg',
    },
    {
      id: '4',
      image: 'https://m.media-amazon.com/images/I/81ANaVZk5LL._AC_UF1000,1000_QL80_.jpg',
    },
  ]);

  const handleAddBook = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newBook = {
          id: Date.now().toString(),
          image: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
          pdfUri: file.uri,
          name: file.name,
        };

        setBooks((prevBooks) => [...prevBooks, newBook]);
      }
    } catch (error) {
      console.error('Dosya seçimi başarısız:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      {/* + Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
