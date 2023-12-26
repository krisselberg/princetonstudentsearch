import OpenAI from "openai";

export class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "OPENAI_API_KEY",
    });
  }

  async translateQuery(query) {
    // Description of the OpenSearch data structure
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

    const prompt = `
      ${dataStructureDescription}
      Translate the following natural language query into an OpenSearch structured query:
      "${query}"
      Structured Query:
    `;

    const completion = await this.openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an OpenSearch query assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4",
    });

    return JSON.parse(completion.choices[0].message.content);
  }
}
