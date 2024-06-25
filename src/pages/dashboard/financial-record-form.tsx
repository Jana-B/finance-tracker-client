import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { BsQuestionCircle } from "react-icons/bs";
export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { addRecord } = useFinancialRecords();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
    };

    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="amount-label">
            Amount:{" "}
            <div className="tooltip">
              <BsQuestionCircle />
              <span className="tooltiptext">
                {" "}
                Please enter the amount in euros. Please use a dot (.) for
                decimals. For expenses, add minus (-) in front of the amount.
                For income, just enter the amount.
              </span>
            </div>
          </label>{" "}
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
            <option value="Holiday">Holiday</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="button add-button">
          Add record
        </button>
      </form>
    </div>
  );
};
