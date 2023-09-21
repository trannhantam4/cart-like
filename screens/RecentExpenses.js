import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../uti/Date";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpense } from "../uti/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { firebase } from "@react-native-firebase/auth";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import Info from "../components/UI/Info";
import { PieChart } from "react-native-chart-kit";
export default function RecentExpenses() {
  const MyPieChart = () => {
    return (
      <>
        <Text style={styles.header}>Pie Chart</Text>
        <PieChart
          data={[
            {
              name: "Seoul",
              population: 21500000,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Toronto",
              population: 2800000,
              color: "#F00",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "New York",
              population: 8538000,
              color: "#ffffff",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Moscow",
              population: 11920000,
              color: "rgb(0, 0, 255)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute //for the absolute number remove if you want percentage
        />
      </>
    );
  };
  const user = firebase.auth().currentUser;
  const imageUrls = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
  ];
  const [selectedDate, setSelectedDate] = useState(7);
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense(user);
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError("Could not fetch data");
      }

      setIsFetching(false);
    }

    getExpenses();
  }, []);
  function errorHandler() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, selectedDate);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <>
      <Info />
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        selectDate={setSelectedDate}
        fromScreen={"recent"}
      />
    </>
  );
}
const windowWidth = Dimensions.get("window").width;
