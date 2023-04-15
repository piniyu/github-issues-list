import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { createOctokitClient } from '~/utils/create-octokit-client'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const url = new URL(request.url)
  const pageParam = url.searchParams.get('page')
  const page = pageParam ? parseInt(pageParam) : 1

  const octokit = createOctokitClient(token)
  const res = await octokit.rest.repos.listForAuthenticatedUser({ page })

  return NextResponse.json(res.data)
}
