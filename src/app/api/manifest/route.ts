import { NextResponse } from "next/server";
import manifest from "@/app/manifest";

export function GET() {
  return NextResponse.json(manifest());
}
