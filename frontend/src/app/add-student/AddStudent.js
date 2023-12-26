"use client";

import { useState } from "react";

function AddStudent() {
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedinUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      const data = await response.json();
      console.log("data", data);
      console.log("response", response);
      if (data.error) {
        alert(data.error);
        setStudentData({
          firstName: "",
          lastName: "",
          email: "",
          linkedinUrl: "",
          description: "",
        });
        return;
      }
      alert("Student added successfully");
      setStudentData({
        firstName: "",
        lastName: "",
        email: "",
        linkedinUrl: "",
        description: "",
      });
    } catch (error) {
      alert("An error occurred");
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <input
          type="text"
          name="firstName"
          value={studentData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="input-form"
          required
        />
        <input
          type="text"
          name="lastName"
          value={studentData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="input-form"
          required
        />
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-form"
          required
        />
        <input
          type="text"
          name="linkedinUrl"
          value={studentData.linkedinUrl}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="input-form"
        />
        <textarea
          name="description"
          value={studentData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input-form"
          required
        />
        <button type="submit" className="button w-full">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
