import { Animated, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ScrollView = Animated.ScrollView;

export default function ProfilScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={ styles.container } edges={ ['top'] }>
				<ScrollView style={ styles.scrollView }>
					<ThemedView style={ styles.titleContainer }>
						<ThemedText type="title">Profil</ThemedText>
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
