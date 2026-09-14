import { Image, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Filter } from '../../components/Filter';
import { FilterStatus } from '../../types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];
export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.filters}>
        {
        FILTER_STATUS.map((status) => (
          <Filter key={status} status={status} isActive={status === FilterStatus.DONE} />
        ))
        }

        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

