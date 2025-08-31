import { NextResponse } from "next/server"
import { auth } from "@/libs/auth"
import { ldap } from "@/libs/ldapts"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const result = await ldap.authenticate(username, password)

  if (!result) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const isAdmin = await ldap.isInAdminGroup(username)

  if (!isAdmin) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
  }

  await auth.createSession(username, isAdmin)

  return NextResponse.json({ success: true })
}
