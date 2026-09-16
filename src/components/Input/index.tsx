import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

export function Input({ style, ...rest }: TextInputProps) {
    return (
        <TextInput
            {...rest}
            style={[styles.container, style]}
            placeholderTextColor="#999999"
        />
    )
}