import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { createOctokitClient } from '~/utils/create-octokit-client'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const url = new URL(request.url)
  const owner = url.searchParams.get('owner') ?? ''
  const repoName = url.searchParams.get('repo-name') ?? ''
  const page = url.searchParams.get('page')
  const pageNum = page ? parseInt(page) : 1

  const octokit = createOctokitClient(token)
  const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: owner,
    repo: repoName,
    page: pageNum,
  })

  console.log(res)

  return NextResponse.json(res.data)
}
