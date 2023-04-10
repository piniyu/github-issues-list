import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })

  // const token = cookies()

  console.log('token', token)
  const res = await fetch('https://api.github.com/user/repos', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
  })
  const data = await res.json()
  // return NextResponse.json({ data })

  // return data
  return NextResponse.json({ data })
}
