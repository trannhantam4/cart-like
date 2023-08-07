import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";
import { getDateFormat } from "../../uti/Date";

import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
export default function ExpenseItem({ id, des, price, date }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("ManageExpense", { expenseId: id });
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.des]}>{des}</Text>
          <Text style={styles.textBase}>{getDateFormat(date)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}> {price.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressed: { opacity: 0.8 },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 8,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  des: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: width * 0.2,
  },
  price: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
