import { Alert, Image, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Filter } from '../../components/Filter';
import { FilterStatus } from '../../types/FilterStatus';
import { useEffect, useState } from 'react';
import { ItemType } from '../../types/Item';
import { Item as ItemComponent } from '../../components/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];



export default function Home() {

  const [item, setItem] = useState('');
  const [itens, setItens] = useState<ItemType[]>([]);
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [filtro, setFiltro] = useState<FilterStatus>(FilterStatus.PENDING);

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
    const quantity = Number(quantidade.trim().replace(',', '.'));
    const price = Number(preco.trim().replace(',', '.'));
    if (!item.trim()) {
      Alert.alert('Nome obrigatório', 'Por favor, insira o nome do item.');
      return;
    }

    if (
      !quantidade || isNaN(quantity) || quantity <= 0
    ) {
      Alert.alert('Quantidade inválida', 'Por favor, insira uma quantidade válida.');
      return;
    }

    if (
      !preco || isNaN(price) || price <= 0
    ) {
      Alert.alert('Preço inválido', 'Por favor, insira um preço válido.');
      return;
    }

    const novoItem: ItemType = {
      id: new Date().getTime().toString(),
      name: item,
      quantity: quantity,
      price: price,
      total: quantity * price,
      status: FilterStatus.PENDING,
    };

    const itensAtualizados = [...itens, novoItem];

    try {
      await AsyncStorage.setItem('itens', JSON.stringify(itensAtualizados));
      setItens(itensAtualizados);
      setItem('');
      setQuantidade('');
      setPreco('');
    } catch {
      Alert.alert('Erro ao adicionar item', 'Não foi possível adicionar o item. Tente novamente.');
    }
  }

  async function removerItem(id: string) {
    const itensAtualizados = itens.filter((item) => item.id !== id);

    await AsyncStorage.setItem('itens', JSON.stringify(itensAtualizados));
    setItens(itensAtualizados);
  }

  async function marcarComoFeito(id: string) {
    const itensAtualizados = itens.map((item) => {
      if (item.id === id) {
        return { ...item, status: FilterStatus.DONE };
      }
      return item;
    });

    await AsyncStorage.setItem('itens', JSON.stringify(itensAtualizados));
    setItens(itensAtualizados);
  }

  async function limparItens() {
    try {
      await AsyncStorage.removeItem('itens');
      setItens([]);
    } catch {
      Alert.alert('Erro ao limpar', 'Não foi possível excluir os itens. Tente novamente.');
    }
  }

  function confirmarLimpeza() {
    Alert.alert(
      'Limpar lista?',
      'Todos os itens, comprados e pendentes, serão excluídos. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir todos', style: 'destructive', onPress: limparItens },
      ],
      { cancelable: true },
    );
  }

  const itensFiltrados = itens.filter((item) => item.status === filtro);
  const totalComprado = itens.reduce((total, item) => {
    if (item.status !== FilterStatus.DONE) return total;

    const subtotal = item.quantity * item.price;
    return Number.isFinite(subtotal) ? total + Math.round(subtotal * 100) : total;
  }, 0) / 100;

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={item}
          onChangeText={setItem}
        />
        <View style={styles.inputRow}>
          <Input
            style={styles.input}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="decimal-pad"
          />

          <Input
            style={styles.input}
            placeholder="Preço unitário (R$)"
            value={preco}
            onChangeText={setPreco}
            keyboardType="decimal-pad"
          />
        </View>
        <Button
          title="Adicionar"
          onPress={adicionarItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total comprado</Text>
          <Text style={styles.totalValue}>
            {totalComprado.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        </View>
        <View style={styles.filters}>
          {
            FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={status === filtro}
                onPress={() => setFiltro(status)}
              />
            ))
          }

          <TouchableOpacity style={styles.clearButton}
            onPress={confirmarLimpeza}
            accessibilityLabel="Limpar itens"
            accessibilityRole="button">
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {itensFiltrados.map((item) => (
          <ItemComponent
            key={item.id}
            item={item}
            onRemove={() => removerItem(item.id)}
            onPress={() => marcarComoFeito(item.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
