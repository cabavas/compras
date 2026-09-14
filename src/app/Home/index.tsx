import { Image, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Filter } from '../../components/Filter';
import { FilterStatus } from '../../types/FilterStatus';
import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];



export default function Home() {

  const [item, setItem] = useState('');
  const [itens, setItens] = useState(Item[]);
  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    const itensSalvos = await AsyncStorage.getItem('itens');

    if (itensSalvos) {
      setItens(JSON.parse(itensSalvos));
    }
  }

  async function adicionarItem() {
    if (!item.trim()) {
      return;
    }

    const itensSalvos = await AsyncStorage.getItem('itens');

    const itens = itensSalvos ? JSON.parse(itensSalvos) : [];

    const novoItem = {
      id: Date.now().toString(),
      name: item.trim(),
      status: FilterStatus.PENDING
    }

    itens.push(novoItem);

    await AsyncStorage.setItem('itens', JSON.stringify(itens));

    setItens(itens);
    setItem('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={item}
          onChangeText={setItem}
        />
        <Button
          title="Adicionar"
          onPress={adicionarItem} />
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

        {itens.map((item) => (
          <Text key={item.id}>{item.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
