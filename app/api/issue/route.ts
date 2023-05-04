import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { createOctokitClient } from '~/utils/create-octokit-client'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const owner = searchParams.get('owner') ?? ''
  const repoName = searchParams.get('repo_name') ?? ''
  const issueNumber = searchParams.get('issue_number')
  const issueNumberInt = issueNumber ? parseInt(issueNumber) : 0

  const octokit = createOctokitClient(token)
  const res = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    {
      owner: owner,
      repo: repoName,
      issue_number: issueNumberInt,
    },
  )

  return NextResponse.json(res.data)
}
