import { Client } from "@opensearch-project/opensearch";

// Initialize OpenSearch client
const opensearchClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "admin",
    password: "admin",
  },
  ssl: {
    rejectUnauthorized: false, // Disable SSL verification
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

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const student = req.body.student;
      const response = await addStudent(student);
      res.status(200).json({ message: "Student added", response });
    } catch (error) {
      console.error("Error adding student:", error);
      res.status(500).json({ error: "Error adding student" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
