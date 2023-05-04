import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { createOctokitClient } from '~/utils/create-octokit-client'

const defaultPerPage = 10

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const owner = searchParams.get('owner') ?? ''
  const repoName = searchParams.get('repo_name') ?? ''
  const page = searchParams.get('page')
  const perPage = searchParams.get('per_page')
  const perPageNum = perPage ? parseInt(perPage) : defaultPerPage
  const pageNum = page ? parseInt(page) : 1
  const labels = searchParams.get('labels') ?? ''

  const octokit = createOctokitClient(token)
  const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: owner,
    repo: repoName,
    page: pageNum,
    per_page: perPageNum,
    labels,
  })

  return NextResponse.json(res.data)
}
