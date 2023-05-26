import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux"
import { store } from './store';

import ExpenseEntry from './screens/ExpenseEntry';
import BuddiesEntry from './screens/BuddiesEntry';
import ExpenseSummary from './screens/ExpenseSummary';

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="ExpenseEntry">
					<Stack.Screen options={{ headerTitleAlign: "center", title: "💸 Expense Entry 💸" }} name="ExpenseEntry" component={ExpenseEntry} />
					<Stack.Screen options={{ headerTitleAlign: "center", title: "👦 Buddies Entry 👦" }} name="BuddiesEntry" component={BuddiesEntry} />
					<Stack.Screen options={{ headerTitleAlign: "center", title: "📁 Expense Summary 📁" }} name="ExpenseSummary" component={ExpenseSummary} />
				</Stack.Navigator>
			</NavigationContainer>	
		</Provider>
  	)
}
