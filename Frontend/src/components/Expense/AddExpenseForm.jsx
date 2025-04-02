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
    <div className="space-y-4">
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Form Inputs */}
      <Input
        name="source"
        value={expense.category}
        onchange={(e) => handleChange("category", e.target.value)}
        label="Expense category"
        placeholder="Grocery, Entertainment, etc."
        type="text"
      />
      <Input
        name="amount"
        value={expense.amount}
        onchange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />
      <Input
        name="date"
        value={expense.date}
        onchange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
      />

      {/* Submit Button */}
      <div className='flex justify-end mt-6'>
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)} // Debugging output
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm