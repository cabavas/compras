import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D0D2D8',

    },
    logo: {
        height: 34,
        width: 134
    },
    form: {
        width: '100%',
        paddingHorizontal: 16,
        gap: 7,
        marginTop: 42
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingTop: 32,
        marginTop: 24
    },
    totalContainer: {
        backgroundColor: '#F1F5F0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        gap: 4,
    },
    totalLabel: {
        fontSize: 14,
        color: '#52634F',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#245C2A',
    },
    filters: {
        width: '100%',
        flexDirection: 'row',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6EC",
        paddingBottom: 12,
    },
    clearButton: {
        marginLeft: 'auto',
    },
    clearButtonText: {
        fontSize: 12,
        color: "#828282",
        fontWeight: 600
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    purchaseForm: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
        borderRadius: 16,
        padding: 24,
        gap: 12,
        backgroundColor: '#fff',
    },
    purchaseTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#245C2A',
    },
    cancelButton: {
        alignItems: 'center',
        padding: 12,
    },
})
