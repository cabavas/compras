import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/app/Home';

export default function App() {
    return (
        <SafeAreaProvider>
            <Home />
        </SafeAreaProvider>
    )
}