import { JWT } from 'next-auth/jwt'
import { Octokit } from 'octokit'

export const createOctokitClient = (token: JWT | null) => {
  const octokit = new Octokit({ auth: token?.accessToken })
  return octokit
}
