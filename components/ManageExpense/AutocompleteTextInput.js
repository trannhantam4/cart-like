import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../../constant/styles";

const AutocompleteTextInput = ({ inputValue, onInputChange }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (text) => {
    // Remove non-numeric characters from the input
    const numericText = text.replace(/[^\d]/g, "");

    // Format the text with dots every three characters
    const formattedValue = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    onInputChange(formattedValue);

    // Generate suggestions based on the input
    const generatedSuggestions = generateSuggestions(numericText);
    setSuggestions(generatedSuggestions);
  };

  // Function to generate autocomplete suggestions
  const generateSuggestions = (text) => {
    const suggestions = [];

    // Remove non-numeric characters from the input
    const numericText = text.replace(/[^\d]/g, "");

    // Add suggestions with additional zeros
    if (!isNaN(numericText)) {
      suggestions.push(`${numericText}.000`);
      suggestions.push(`${numericText}0.000`);
    }

    return suggestions;
  };

  // Function to handle suggestion press
  const handleSuggestionPress = (suggestion) => {
    // Remove any existing dots from the suggestion and format it with dots
    const formattedSuggestion = suggestion
      .replace(/\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    onInputChange(formattedSuggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is pressed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Enter a number..."
      />
      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion}
            onPress={() => handleSuggestionPress(suggestion)}
          >
            <Text style={styles.suggestion}>
              {suggestion.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    color: GlobalStyles.colors.primary500,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestion: {
    fontSize: 16,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary500,
    padding: 8,
    borderRadius: 5,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});

export default AutocompleteTextInput;
