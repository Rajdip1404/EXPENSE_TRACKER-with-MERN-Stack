import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0] || "",
    icon: "",
  });

  // Handles input changes
  const handleChange = (field, value) => {
    // console.log("Field:", field, "Value:", value); // Debugging output
    setIncome((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Form Inputs */}
      <Input
        name="source"
        value={income.source}
        onchange={(e) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder="Salary, Freelance, etc."
        type="text"
      />
      <Input
        name="amount"
        value={income.amount}
        onchange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />
      <Input
        name="date"
        value={income.date}
        onchange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
      />

      {/* Submit Button */}
      <button
        type="button"
        className="add-btn add-btn-fill"
        onClick={() => onAddIncome(income)} // Debugging output
      >
        Add Income
      </button>
    </div>
  );
};

export default AddIncomeForm;
