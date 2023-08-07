import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";

export default function ManageExpense({ route, navigation }) {
  const id = route.params?.expenseId;
  const isEditing = !!id;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>ManageExpense</Text>
    </View>
  );
}
