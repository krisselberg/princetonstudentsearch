import { Client } from "@opensearch-project/opensearch";
import OpenAI from "openai";

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

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const naturalLanguageQuery = req.body.query;

      // Description of your OpenSearch data structure
      const dataStructureDescription = `
        The OpenSearch index 'students' contains documents representing students.
        Each document has the following fields: firstName, lastName, email, linkedInProfile, description.
        The 'description' field contains information about the student's major and graduation year.
        Set very simple parameters when searching through the description field. 
        For example, if someone asks for a student who is a computer science major, you can set the 
        parameters to be "computer science" and "major", but don't exclude results that include only 
        one of the search terms.
      `;

      // Prompt for GPT-4
      const prompt = `
        ${dataStructureDescription}
        Translate the following natural language query into an OpenSearch structured query:
        "${naturalLanguageQuery}"
        Structured Query:
      `;

      // Send the query to GPT-4
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are an OpenSearch query assistant." },
          {
            role: "user",
            content: `${prompt}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const searchQuery = JSON.parse(completion.choices[0].message.content);

      // Execute the query in OpenSearch
      const response = await opensearchClient.search({
        index: "students",
        body: searchQuery,
      });

      // Format and return results
      const results = response.body.hits.hits.map((hit) => hit._source);
      res.json(results);
    } catch (error) {
      console.error("Error executing search:", error);
      res.status(500).send("Error executing search");
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
