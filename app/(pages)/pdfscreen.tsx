/* eslint-disable prettier/prettier */
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


export default function PdfScreen() {
  
  const { pdfUrl } = useLocalSearchParams();
  return (
    <>
      <StatusBar style="auto" hidden animated/>
      <SafeAreaView style={styles.container}>
        <WebView
          source={{
            uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`,
          }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
