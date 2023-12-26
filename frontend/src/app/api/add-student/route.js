import { NextResponse } from "next/server";
import { OpenSearchService } from "@/lib/opensearch/service";

// Do a named export
export async function POST(req) {
  const student = await req.json();

  // Backend Validation
  if (
    !student.firstName.trim() ||
    student.firstName.length > 50 ||
    !student.lastName.trim() ||
    student.lastName.length > 50 ||
    !student.email.trim() ||
    student.email.length > 100 ||
    student.linkedinUrl.length > 100 ||
    !student.description.trim() ||
    student.description.length > 500
  ) {
    return NextResponse.json({
      error:
        "Invalid input. Fields cannot be empty and must be within character limits.",
    });
  }

  // need to instantiate a new OpenSearchService object with every API call to access
  // AWS Elastic Beanstalk environment properties at runtime for correct instantiation,
  // otherwise the credentials will be taken from the default values at build time
  const opensearchService = new OpenSearchService();

  try {
    if (
      await opensearchService.checkStudentExists(
        student.firstName,
        student.lastName
      )
    ) {
      console.log("Student with the same name already exists");
      return NextResponse.json({
        error: "Student with the same name already exists",
      });
    }

    const response = await opensearchService.addStudent(student);
    return NextResponse.json({ message: "Student added", response });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Error processing request" });
  }
}
