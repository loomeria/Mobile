import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
      <SafeAreaProvider>
          <SafeAreaView style={ styles.container } edges={ ['top'] }>
              <ScrollView style={ styles.scrollView }>
                  <ThemedView style={ styles.titleContainer }>
                      <ThemedText type="title">Home</ThemedText>
                  </ThemedView>
              </ScrollView>
          </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        margin: 20,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 42,
        padding: 12,
    },
});
