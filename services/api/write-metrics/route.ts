import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { metrics } = await req.json();
    const filePath = path.join(process.cwd(), "data", "fetched-metrics.json");
    await writeFile(filePath, JSON.stringify(metrics, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() });
  }
}
