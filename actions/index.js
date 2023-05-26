export const addExpense = (expenseEntry) => {
    return {
        type: "ADD_EXPENSE",
        payload: expenseEntry
    }
}

export const removeExpense = (entryId) => {
    return {
        type: "REMOVE_EXPENSE",
        payload: entryId
    }
}

export const clearExpense = () => {
    return {
        type: "CLEAR_EXPENSE"
    }
}

export const addBuddy = (buddyDetails) => {
    return {
        type: "ADD_BUDDY",
        payload: buddyDetails
    }
}

export const removeBuddy =  (buddyId) => {
    return {
        type: "REMOVE_BUDDY",
        payload: buddyId
    }
}

export const clearBuddies = () => {
    return {
        type: "CLEAR_BUBBIES"
    }
}
