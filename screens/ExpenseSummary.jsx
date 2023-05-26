import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { clearBuddies, clearExpense } from "../actions"
import { useNavigation } from "@react-navigation/native"

export default function ExpenseSummary() {

    const expenseList = useSelector((state) => state.handleExpenseList)
    const buddiesList = useSelector((state) => state.handleBuddiesList)
    
    const dispatch = useDispatch()

    const navigator = useNavigation()

    const totalExpense = expenseList.reduce((accumulator, data) => accumulator + Number(data.amount), 0)

    const contribution = totalExpense / buddiesList.length

    const payReceiveList = buddiesList.map((data) => {
        return { name: data.name, amount: Number(data.amount) - contribution  }
    })

    const clear = () => {
        dispatch(clearExpense())
        dispatch(clearBuddies())
        navigator.navigate("ExpenseEntry")
    }

    return (
        <View style={styles.screen}>

            <View style={styles.expensediv}>
                <Text style={styles.totalExpense}>Total Expense</Text>
                <Text style={styles.expenseAmount}>₹ {totalExpense}</Text>
            </View>

            <View style={styles.contributiondiv}>
                <Text style={styles.contribution}>Per head Contribution</Text>
                <Text style={styles.contributionAmount}>₹ {contribution}</Text>
            </View>

            <View style={styles.flatlistcss}>
                <FlatList
                    data={payReceiveList}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.card}>
                                {
                                    Number(item.amount) > 0 ? (
                                        <Text style={styles.statement}>
                                            {item.name} should receive -
                                            <Text style={styles.credit}> ₹ {item.amount}</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.statement}>
                                            {item.name} should pay -
                                            <Text style={styles.debit}> ₹ { item.amount*-1 }</Text>
                                        </Text>
                                    )
                                }
                            </View>
                        )
                    }} 
                />
            </View>
            <TouchableOpacity onPress={clear} style={styles.nextbtn}>
                <Text style={styles.btntext}>CLEAR</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        height: "100%",
        backgroundColor: "white"
    },
    totalExpense: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "800"
    },
    expenseAmount: {
        textAlign: "center",
        color: "red",
        fontSize: 20,
        fontWeight: "800"
    },
    expensediv: {
        paddingTop: 30
    },
    contributiondiv: {
        padding: 30,
    },
    contribution: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "800"
    },
    contributionAmount: {
        textAlign: "center",
        color: "dodgerblue",
        fontSize: 20,
        fontWeight: "800"
    },
    flatlistcss: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "gray",
        borderTopWidth: 0.5,
        paddingTop: 20
    },
    card: {
        padding: 10
    },
    statement: {
        fontSize: 18,
        fontWeight: "500"
    },
    credit: {
        color: "green"
    },
    debit: {
        color: "tomato"
    },
    nextbtn: {
        backgroundColor: "orangered",
        position: "absolute",
        left: 10,
        right: 10,
        borderRadius: 10,
        bottom: 10,
        padding: 15
    },
    btntext: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
})
