import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CircleCheck, CircleDashed, Trash2 } from "lucide-react-native";
import { styles } from './styles';
import { ItemType } from '../../types/Item';
import { FilterStatus } from '../../types/FilterStatus';

type Props = TouchableOpacityProps & {
    item: ItemType;
    onRemove: () => void;
};

export function Item({ item, onRemove, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={styles.container} {...rest}>
            {item.status === FilterStatus.DONE
                ? <CircleCheck />
                : <CircleDashed />}
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>
                {item.status === FilterStatus.DONE
                    ? `R$ ${item.total.toFixed(2)}`
                    : 'Comprar'}
            </Text>
            <TouchableOpacity
                style={styles.clearButton}
                onPress={(event) => {
                    event.stopPropagation();
                    onRemove();
                }}
                accessibilityLabel={`Remover ${item.name}`}
                accessibilityRole="button">
                <Trash2 />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
