import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
const books = [
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
];

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'ReadAI',
} as const;

export default function AllBooks() {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2} // Her satırda 2 öğe
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
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
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
