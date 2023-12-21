import { Client } from "@opensearch-project/opensearch";
import { NextResponse } from "next/server";

// Initialize OpenSearch client
const opensearchClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "admin",
    password: "admin",
  },
  ssl: {
    rejectUnauthorized: false, // Disable SSL verification for communication between frontend and OpenSearch
  },
});

async function addStudent(student) {
  try {
    const response = await opensearchClient.index({
      index: "students",
      body: student,
    });
    console.log("Student added:", response);
    return response;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
}

// Do a named export
export async function POST(req) {
  const student = await req.json();
  try {
    const response = await addStudent(student);
    return NextResponse.json({ message: "Student added", response });
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({ error: "Error adding student" });
  }
}
