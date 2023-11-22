import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  // State to manage input values
  const [expense, setExpense] = useState('');
  const [Amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('food'); // default to 'food'

  // Function to handle the button press
  const handleAddExpense = () => {
    // Perform any logic you need with the expense and Amount values
    if (expense && Amount) {
        setExpenses([...expenses, { id: Date.now().toString(), expense, Amount ,  category}]);
        setExpense('');
        setAmount('');
      }

    // Clear the input fields after adding the expense
    setExpense('');
    setAmount('');
  };
  const saveExpensesToStorage = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving data", error);
    }
  };
  const loadExpensesFromStorage = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpense(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  return (
    
    <View style={styles.container}>
    
      <Text style={styles.title}>Expense Tracker</Text>
      <Picker
      selectedValue={category}
      onValueChange={(itemValue) => setCategory(itemValue)}
      >
      <Picker.Item label="Food" value="food" />
      <Picker.Item label="Travel" value="travel" />
      <Picker.Item label="Entertainment" value="entertainment" />
      <Picker.Item label="Other" value="other" />
      {/* Add more categories as needed */}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Enter Expense"
        value={expense}
        onChangeText={(text) => setExpense(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={Amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      {/* Display Expenses */}
      <View>
  {expenses.map((item) => (
    <View key={item.id}>
      <Text>{item.expense}: ${item.Amount} ({item.category})</Text>
    </View>
  ))}
</View>
      

      <Button title="Add" onPress={handleAddExpense} />
    </View>
    
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  picker: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  expenseList: {
    marginTop: 20,
  },
  expenseListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expenseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
