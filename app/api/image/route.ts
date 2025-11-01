// app/api/image-to-base64/route.ts
import { NextRequest, NextResponse } from "next/server";

// Helper to convert image URL to Base64
async function imageUrlToBase64(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch image");
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  // Infer content type from URL
  const ext = url.split(".").pop()?.toLowerCase();
  let mimeType = "image/png";
  if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
  if (ext === "gif") mimeType = "image/gif";
  if (ext === "webp") mimeType = "image/webp";

  return `data:${mimeType};base64,${base64}`;
}

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
  }

  try {
    const base64Image = await imageUrlToBase64(imageUrl);
    return NextResponse.json({ base64Image }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch image" }, { status: 500 });
  }
}
