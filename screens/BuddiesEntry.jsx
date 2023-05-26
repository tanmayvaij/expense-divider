import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addBuddy, removeBuddy } from "../actions";

export default function BuddiesEntry() {

    const navigator = useNavigation()
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({ id: Date.now(), name: "", amount: "" })

    const addBuddiesToList = () => {
        if ( formState.amount == "" || formState.name == "" ) return 
        dispatch(addBuddy(formState))
        setFormState({ id: Date.now(), name: "", amount: "" })
    }
    
    const myState = useSelector((state) => state.handleBuddiesList)
   
    return (
        <View style={styles.screen}>

            <View style={styles.keyboardInputView}>
                <TextInput
                    onChangeText={(item) => setFormState({ ...formState, name: item })}
                    value={formState.name}
                    style={styles.keyboardInput}
                    placeholder="Enter Name"
                />
            </View>

            <View style={styles.keyboardInputView}>
                <TextInput
                    onChangeText={(item) => setFormState({ ...formState, amount: item })}
                    value={formState.amount}
                    style={styles.keyboardInput}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.flatlistcss}>
                <FlatList 
                    data={myState}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.card}>
                                <View>
                                    <Text style={styles.cardtitle}>👦 {item.name}</Text>
                                    <Text style={styles.cardamount}>💰 {item.amount}</Text>
                                </View>
                                <TouchableOpacity onPress={() => dispatch(removeBuddy(item.id))}>
                                    <Text>❌</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}  
                />
            </View>

            <TouchableOpacity onPress={()=>addBuddiesToList()} style={styles.addbuddybtn}>
                <Text style={styles.addbuddytext}>ADD BUDDY</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigator.navigate("ExpenseSummary")} style={styles.nextbtn}>
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
    addbuddybtn: {
        backgroundColor: "dodgerblue",
        padding: 18,
        position: "absolute",
        bottom: 70,
        left: 10,
        right: 10,
        borderRadius: 10
    },
    addbuddytext: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "600"
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
        alignItems: "center"
    },
    cardtitle: {
        fontWeight: "600",
        fontSize: 20,
        color: "orangered"
    },
    cardamount: {
        color: "green",
        marginTop: 5,
        fontSize: 16
    },
    flatlistcss: {
        marginTop: 10,
        height: 400
    }
})
