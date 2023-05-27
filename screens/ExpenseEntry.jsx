import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';
import { addExpense, removeExpense } from "../actions";

export default function ExpenseEntry() {

    const navigator = useNavigation()
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({ id: Date.now(), title: "", amount: "", type: "" })
    const [value, setValue] = useState(null)

    function isNumeric(string) {
        return !isNaN(parseFloat(string)) && isFinite(string);
    }

    const data = [
        { label: "Travel", value: "Travel" },
        { label: "Food", value: "Food" },
        { label: "Stay", value: "Stay" },
        { label: "Amusement", value: "Amusement" },
        { label: "Other", value: "Other" }
    ]

    const addExpenseToList = () => {
        if ( formState.title == "" || formState.amount == "" || formState.type == ""  ) return 
        dispatch(addExpense(formState))
        setFormState({ id: Date.now(), title: "", amount: "", type: "" })
        setValue(null)
    }
    
    const myState = useSelector((state) => state.handleExpenseList)
   
    return (
        <View style={styles.screen}>

            <View style={styles.keyboardInputView}>
                <TextInput
                    onChangeText={(item) => setFormState({ ...formState, title: item })}
                    value={formState.title}
                    style={styles.keyboardInput}
                    placeholder="Enter Title"
                />
            </View>

            <View style={styles.keyboardInputView}>
                <TextInput
                    onChangeText={(item) => { 
                        if (isNumeric(item) || item == "") setFormState({ ...formState, amount: item })
                    }}
                    value={formState.amount}
                    style={styles.keyboardInput}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                />
            </View>

            <Dropdown
                style={styles.dropdown}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={value}
                onChange={item => {
                    setValue(item.value)
                    setFormState({ ...formState, type: item.value })
                }}
            />

            <View style={styles.flatlistcss}>
            <FlatList
                data={myState}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return (
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.cardtitle}>
                                    { item.title } 
                                    <Text style={styles.cardcategory}> ( {item.type} )</Text>
                                </Text>
                                <Text style={styles.cardamount}>💰 {item.amount}</Text>
                            </View>
                            <TouchableOpacity onPress={() => dispatch(removeExpense(item.id))}>
                                <Text>❌</Text>
                            </TouchableOpacity>
                        </View>
                        
                    )
                }}  
            />
            </View>

            <TouchableOpacity onPress={()=>addExpenseToList()} style={styles.addexpensebtn}>
                <Text style={styles.addexpensetext}>ADD EXPENSE</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigator.navigate("BuddiesEntry")} style={styles.nextbtn}>
                <Text style={styles.btntext}>NEXT</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        backgroundColor: "white"
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
    keyboardInputView: {
        marginTop: 10,
        marginHorizontal: 10
    },
    keyboardInput: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10
    },
    addexpensebtn: {
        backgroundColor: "dodgerblue",
        padding: 18,
        position: "absolute",
        bottom: 70,
        left: 10,
        right: 10,
        borderRadius: 10
    },
    addexpensetext: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "600"
    },
    dropdown: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        height: 50,
        backgroundColor: "white"
    },
    card: {
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardtitle: {
        fontWeight: "600",
        fontSize: 20,
        color: "orangered"
    },
    cardcategory: {
        color: "gray",
        fontSize: 14,
        fontWeight: "300"
    },
    cardamount: {
        color: "green",
        marginTop: 5,
        fontSize: 16
    },
    flatlistcss: {
        marginTop: 10,
        height: 320
    }
})
