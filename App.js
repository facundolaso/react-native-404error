import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/features/store'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNav'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
