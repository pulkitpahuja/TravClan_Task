import React, { useState } from 'react'
import './Expenses.css'
import Card from '../UI/Card'
import ExpensesFilter from '../ExpenseFilter/ExpensesFilter'
import ExpensesList from './ExpensesList'
import ExpensesChart from './ExpensesChart'
const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2021')

    const setExpenseFilterHandler = (filterYear) => {
        setFilteredYear(filterYear)
    }

    const filteredExpenses = props.expenses.filter(e =>
        e.date.getFullYear().toString() === filteredYear);

    return (
        <Card className='expenses'>
            <ExpensesFilter selected={filteredYear} setExpenseFilterHandler={setExpenseFilterHandler} />
            <ExpensesChart expenses={filteredExpenses} />
            <ExpensesList items={filteredExpenses} />
        </Card>
    )
}

export default Expenses
