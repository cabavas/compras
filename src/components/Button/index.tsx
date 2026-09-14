import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
    title: string
}
export function Button({ title }: Props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}