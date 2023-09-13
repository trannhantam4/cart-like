import { useContext, useEffect, useState, useRef } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../uti/Date";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpense } from "../uti/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/auth";
// import Swiper from "react-native-swiper";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { GlobalStyles } from "../constant/styles";
export default function RecentExpenses() {
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
  // const ViewPagerScreen = () => {
  //   return (
  //     <View style={styles.swiperContainer}>
  //       <Swiper style={styles.wrapper} showsButtons={true}>
  //         {imageUrls.map((imageUrl, index) => (
  //           <View key={index} style={styles.slide}>
  //             <Image
  //               source={{ uri: imageUrl }}
  //               style={styles.image}
  //               resizeMode="cover"
  //             />
  //           </View>
  //         ))}
  //       </Swiper>
  //     </View>
  //   );
  // };

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: GlobalStyles.colors.primary700,
        }}
      >
        <Image
          style={{
            width: 51,
            height: 51,
            resizeMode: "contain",
            borderRadius: 10,
          }}
          source={{ uri: user.photoURL }}
        ></Image>
        <Text style={{ padding: 16, color: "white", fontWeight: "bold" }}>
          {user.displayName}
        </Text>
      </View>

      {/* <ViewPagerScreen /> */}
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
