import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "3vt3orre",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Create a client for preview mode (includes drafts)
export const previewClient = createClient({
  projectId: "3vt3orre",
  dataset: "production", 
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN, // Add this to your .env.local
  perspective: 'previewDrafts',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// Helper function to get the right client based on preview mode
export function getClient(preview = false) {
  return preview ? previewClient : client;
}