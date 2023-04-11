import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth/next'
import { NextRequest } from 'next/server'
import { authOptions } from '~/pages/api/auth/[...nextauth]'

// Getting the session in Next13 app/ directory
// https://next-auth.js.org/configuration/nextjs#in-app-directory
export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function getGithubToken(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  return token
}
