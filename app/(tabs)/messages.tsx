import { ScrollView, StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MessageScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={ styles.container } edges={ ['top'] }>
				<ScrollView style={ styles.scrollView }>
					<ThemedView style={ styles.titleContainer }>
						<ThemedText type="title">Message</ThemedText>
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
