import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import React from "react";
import { GlobalStyles } from "../../constant/styles";
import { getDateFormat } from "../../uti/Date";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
export default function ExpenseItem({ id, des, price, date, type }) {
  const navigation = useNavigation();

  // Format the price with dots every three digits
  const formattedPrice = price.toLocaleString();

  function pressHandler() {
    navigation.navigate("ManageExpense", { expenseId: id });
  }
  return (
    <TouchableOpacity onPress={pressHandler} activeOpacity={0.7}>
      <View style={styles.item}>
        <View
          style={{
            borderRightColor: GlobalStyles.colors.primary500,
            borderRightWidth: 2,
            width: "58%",
          }}
        >
          <Text style={[styles.textBase, styles.des]}>{des}</Text>
          <Text style={styles.textBase}>{type}</Text>
          <Text style={styles.textBase}>{getDateFormat(date)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}> {formattedPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    padding: 16,
    margin: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
    elevation: 8,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
  },
  textBase: {
    paddingLeft: 6,
    color: GlobalStyles.colors.primary500,
  },
  des: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: width * 0.3,
    elevation: 7,
  },
  price: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 17,
  },
});
