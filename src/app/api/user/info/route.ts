import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const username = url.searchParams.get("username")

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Parâmetro 'username' é obrigatório",
        },
        { status: 400 },
      )
    }

    const { ldap } = await import("@/libs/ldapts")

    console.log(`🔍 Buscando informações do usuário: ${username}`)
    const userInfo = await ldap.getUserInfo(username)

    if (!userInfo) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuário não encontrado",
        },
        { status: 404 },
      )
    }

    const sanitizedUserInfo = {
      username: userInfo.username,
      displayName: userInfo.displayName,
      email: userInfo.email,
      department: userInfo.department,
      title: userInfo.title,
      groupCount: userInfo.groups.length,
    }

    return NextResponse.json({
      success: true,
      user: sanitizedUserInfo,
    })
  } catch (error) {
    console.error("Erro ao buscar informações do usuário:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
