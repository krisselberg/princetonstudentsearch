import { Client } from "@opensearch-project/opensearch";

export class OpenSearchService {
  constructor() {
    this.client = new Client({
      node: process.env.OPENSEARCH_ENDPOINT || "https://localhost:9200",
      auth: {
        username: process.env.OPENSEARCH_USERNAME || "admin",
        password: process.env.OPENSEARCH_PASSWORD || "admin",
      },
      ssl: {
        rejectUnauthorized: false, // Use "false" for local development and "true" for production
      },
    });
  }

  async addStudent(student) {
    try {
      return await this.client.index({
        index: "students",
        body: student,
      });
    } catch (error) {
      console.error("Error in addStudent:", error);
      throw error;
    }
  }

  async checkStudentExists(firstName, lastName) {
    try {
      const response = await this.client.search({
        index: "students",
        body: {
          query: {
            bool: {
              must: [{ match: { firstName } }, { match: { lastName } }],
            },
          },
        },
      });

      return response.body.hits.total.value > 0;
    } catch (error) {
      console.error("Error in checkStudentExists:", error);
      throw error;
    }
  }

  async search(query) {
    try {
      const response = await this.client.search({
        index: "students",
        body: query,
      });
      return response.body.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  }
}
