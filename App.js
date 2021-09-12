import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppStack from './src/routes/AppStack';
import UserProvider from './src/context/Users';

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <AppStack />
        <StatusBar style="auto" />
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
