import { Client } from "@opensearch-project/opensearch";
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenSearch client
const opensearchClient = new Client({
  node: process.env.OPENSEARCH_ENDPOINT || "https://localhost:9200",
  auth: {
    username: process.env.OPENSEARCH_USERNAME || "admin",
    password: process.env.OPENSEARCH_PASSWORD || "admin",
  },
  ssl: {
    rejectUnauthorized: true, // Disable SSL verification (set to false) for communication between frontend and OpenSearch locally
  },
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "OPENAI_API_KEY",
});

export async function POST(req) {
  try {
    const { query } = await req.json();

    // Description of your OpenSearch data structure
    const dataStructureDescription = `
        The OpenSearch index 'students' contains documents representing students.
        Each document has the following fields: firstName, lastName, email, linkedInProfile, description.
        The 'description' field contains information about the student's major and graduation year.
        
        Here's an example query for a prompt of "computer science students graduating in 2025":
        {
          "query": {
            "bool": {
              "must": [
                {
                  "bool": {
                    "should": [
                      { "match": { "description": "computer science" } },
                      { "match": { "description": "CS" } },
                      { "match": { "description": "COS" } },
                    ]
                  }
                },
                {
                  "match": {
                    "description": "2025"
                  }
                }
              ]
            }
          }
        }
      `;

    // Prompt for GPT-4
    const prompt = `
        ${dataStructureDescription}
        Translate the following natural language query into an OpenSearch structured query:
        "${query}"
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
      model: "gpt-4",
    });

    const searchQuery = JSON.parse(completion.choices[0].message.content);

    // Execute the query in OpenSearch
    const response = await opensearchClient.search({
      index: "students",
      body: searchQuery,
    });

    // Format and return results
    const results = response.body.hits.hits.map((hit) => hit._source);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing search:", error);
    return NextResponse.json({ error: "Error executing search" });
  }
}
