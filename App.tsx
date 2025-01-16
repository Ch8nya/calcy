import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Calculator from './components/Calculator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Calculator />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Calc by Chaitanya</Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

