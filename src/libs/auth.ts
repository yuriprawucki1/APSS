import { cookies } from "next/headers"

class Auth {
  async createSession(username: string, isAdmin: boolean) {
    const cookieStore = await cookies()
    cookieStore.set("session", `${username}|${isAdmin ? "admin" : "user"}`, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600, // 10 minutos
    })
  }

  async destroySession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
  }
}

export const auth = new Auth()
