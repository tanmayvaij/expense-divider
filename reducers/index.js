import { combineReducers } from "redux";

const handleExpenseList = (state = [], action) => {
    switch (action.type) {
        case "ADD_EXPENSE": 
            return [ ...state, action.payload  ]
        case "REMOVE_EXPENSE":
            return state.filter((item) => item.id != action.payload)
        case "CLEAR_EXPENSE":
            return []
        default: 
            return state
    }
}

const handleBuddiesList = (state = [], action) => {
    switch (action.type) {
        case "ADD_BUDDY":
            return [ ...state, action.payload ]
        case "REMOVE_BUDDY":
            return state.filter((item) => item.id != action.payload)
        case "CLEAR_BUBBIES":
            return []
        default: 
            return state
    }
}

export const rootReducer = combineReducers({ handleExpenseList, handleBuddiesList })
