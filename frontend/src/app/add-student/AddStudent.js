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
      if (response.ok) {
        alert("Student added successfully");
        setStudentData({
          firstName: "",
          lastName: "",
          email: "",
          linkedinUrl: "",
          description: "",
        });
      } else {
        alert("Failed to add student");
      }
    } catch (error) {
      alert("An error occurred");
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          name="firstName"
          value={studentData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border border-gray-300 p-2 w-full rounded text-black mb-4"
          required
        />
        <input
          type="text"
          name="lastName"
          value={studentData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border border-gray-300 p-2 w-full rounded text-black mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 p-2 w-full rounded text-black mb-4"
          required
        />
        <input
          type="text"
          name="linkedinUrl"
          value={studentData.linkedinUrl}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="border border-gray-300 p-2 w-full rounded text-black mb-4"
        />
        <textarea
          name="description"
          value={studentData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 p-2 w-full rounded text-black mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
