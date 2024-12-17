import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "HR",
    doj: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [dateError, setDateError] = useState(""); // State for date validation message
  const navigate = useNavigate();

  // Calculate minimum date: January 1st of the year - 18
  const today = new Date();
  const year = today.getFullYear();
  const minDate = new Date(year - 18, 0, 1); // January 1st of 18 years ago

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Date validation for "doj" field
    if (name === "doj") {
      const selectedDate = new Date(value);
      if (selectedDate > today) {
        setDateError("Date cannot be in the future.");
      } else if (selectedDate > minDate) {
        setDateError("Employee must be at least 18 years old.");
      } else {
        setDateError(""); // Clear the error if the date is valid
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateError) {
      alert("Please correct the date field before submitting.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      alert("Error registering user.");
    }
  };

  return (
    <div className="rbody">
    <div className="rcard-container">
      <h1>Employee Management System</h1>
      <p>Enter employee Details to add to the system</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d{0,10}$/.test(value)) {
              setFormData((prevData) => ({
                ...prevData,
                employeeId: value,
              }));
            }
          }}
          placeholder="Employee ID"
          maxLength="10"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone (10 digits)"
          pattern="\d{10}"
          required
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="HR">HR</option>
          <option value="Engineering">DevOps Engineer</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">EnjOps Engineer</option>
          <option value="Engineering">Intern</option>
          <option value="Engineering">Mainframe Engineer</option>
        </select>
        <input
          type="date"
          name="doj"
          value={formData.doj}
          onChange={handleChange}
          max={today.toISOString().split("T")[0]}
          required
        />
        {dateError && <p className="date-error">{dateError}</p>} {/* Date validation message */}
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>
        Already have an account? Login
      </button>
    </div>
    </div>
  );
};

export default Register;
