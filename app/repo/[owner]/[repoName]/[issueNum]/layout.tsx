'use client'
import { Card, CardHeader, Heading } from '@chakra-ui/react'
import { Endpoints } from '@octokit/types'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '~/utils/fetcher'

export async function generateStaticParams({
  params,
}: {
  params: { repoName: string }
}) {}

export default function Repo({
  children,
  params,
}: {
  children: React.ReactNode
  params: { repoName: string; owner: string; issueNum: string }
}) {
  const { data } = useSWR<
    Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data']
  >(
    `/api/issue?repo_name=${params.repoName}&owner=${params.owner}&issue_number=${params.issueNum}`,
    fetcher,
  )
  return (
    <>
      <CardHeader>
        <Heading size="xl">{data?.title}</Heading>
      </CardHeader>
      {children}
    </>
  )
}
