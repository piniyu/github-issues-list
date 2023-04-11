import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createOctokitClient } from '~/utils/create-octokit-client'

const per_page = '10'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const url = new URL(request.url)
  const pageParam = url.searchParams.get('page')
  const page = pageParam ? parseInt(pageParam) : 1

  const octokit = createOctokitClient(token)
  const res = await octokit.rest.repos.listForAuthenticatedUser({ page })
  // const res = await fetch('https://api.github.com/user/repos', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token?.accessToken}`,
  //     page: page,
  //     // per_page: per_page,
  //   },
  // })

  // const data = await res.json()

  return NextResponse.json(res.data)
}
