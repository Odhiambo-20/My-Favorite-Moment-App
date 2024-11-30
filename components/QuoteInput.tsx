import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface QuoteInputProps {
    quote: string;
    setQuote: (text: string) => void; // Function to update the quote
}

const QuoteInput: React.FC<QuoteInputProps> = ({ quote, setQuote }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder="Enter your favorite quote"
            value={quote}
            onChangeText={setQuote}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default QuoteInput;
