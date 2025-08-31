import { NextResponse } from "next/server"
import { auth } from "@/libs/auth"

export async function POST() {
  await auth.destroySession()
  return NextResponse.json({ success: true })
}
