import { Client } from "@opensearch-project/opensearch";

export function getOpenSearchClient() {
  return new Client({
    node: process.env.OPENSEARCH_ENDPOINT || "https://localhost:9200",
    auth: {
      username: process.env.OPENSEARCH_USERNAME || "admin",
      password: process.env.OPENSEARCH_PASSWORD || "admin",
    },
    ssl: {
      rejectUnauthorized: true, // Adjust as necessary
    },
  });
}
