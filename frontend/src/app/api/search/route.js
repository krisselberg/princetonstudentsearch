import { Client } from "@opensearch-project/opensearch";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { OpenSearchService } from "@/lib/opensearch/service";
import { OpenAIService } from "@/lib/openai/service";

export async function POST(req) {
  const { query } = await req.json();

  // need to instantiate a new objects with every API call to access
  // AWS Elastic Beanstalk environment properties at runtime for correct instantiation,
  // otherwise the credentials will be taken from the default values at build time
  const opensearchService = new OpenSearchService();
  const openaiService = new OpenAIService();

  try {
    const searchQuery = await openaiService.translateQuery(query);
    const searchResults = await opensearchService.search(searchQuery);

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Error executing search:", error);
    return NextResponse.json({ error: "Error executing search" });
  }
}
