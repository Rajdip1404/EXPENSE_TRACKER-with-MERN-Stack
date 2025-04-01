import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0] || '',
        icon: ''
    });
    // Add handlers for input change and form submission
    const handleChange = (field, value) => {
        setExpense((prev) => ({...prev, [field]: value }));
    }
  return (
    <div>AddExpenseForm</div>
  )
}

export default AddExpenseForm