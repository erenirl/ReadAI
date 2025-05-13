/* eslint-disable prettier/prettier */
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function ModalScreen() {
  const pdfUrl =
    'https://gimiep.az/uploads/documents/2022/02/21/39_george-orwell-1984.pdf';
  
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
