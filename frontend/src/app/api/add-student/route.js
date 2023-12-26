import { Client } from "@opensearch-project/opensearch";
import { NextResponse } from "next/server";
import { getOpenSearchClient } from "@/lib/opensearch/client";

async function addStudent(student) {
  try {
    const opensearchClient = getOpenSearchClient();
    const response = await opensearchClient.index({
      index: "students",
      body: student,
    });
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
