import { NextRequest, NextResponse } from 'next/server'
import { createOctokitClient } from '~/utils/create-octokit-client'
import { getGithubToken } from '~/utils/get-server-side-props'

export async function GET(request: NextRequest) {
  const token = await getGithubToken(request)
  const octokit = createOctokitClient(token)
  const user = await octokit.rest.users.getAuthenticated()
  return NextResponse.json(user)
}
