import { Client } from "@opensearch-project/opensearch";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getOpenSearchClient } from "@/lib/opensearch/client";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "OPENAI_API_KEY",
});

export async function POST(req) {
  try {
    console.log("creating client");
    const opensearchClient = getOpenSearchClient();
    console.log("client created");
    const { query } = await req.json();
    console.log("Received query:", query);

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
    console.log("Prompt:", prompt);

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
    console.log("GPT-4 response:", completion);

    const searchQuery = JSON.parse(completion.choices[0].message.content);
    console.log("Search query:", searchQuery);

    // Execute the query in OpenSearch
    const response = await opensearchClient.search({
      index: "students",
      body: searchQuery,
    });
    console.log("Search response:", response);

    // Format and return results
    const results = response.body.hits.hits.map((hit) => hit._source);
    console.log("Results:", results);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error executing search:", error);
    return NextResponse.json({ error: "Error executing search" });
  }
}
