'use client'
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Endpoints } from '@octokit/types'
import { getToken } from 'next-auth/jwt'
import useSWR from 'swr'
import { fetcher } from '~/utils/fetcher'
export default function IssuePage({
  params,
}: {
  params: { repoName: string; owner: string; issueNum: string }
}) {
  const { data: issue } = useSWR<
    Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data']
  >(
    `/api/issue?repo_name=${params.repoName}&owner=${params.owner}&issue_number=${params.issueNum}`,
    fetcher,
  )
  const { data: comments } = useSWR<
    Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}/comments']['response']['data']
  >(
    `/api/issue/comments?repo_name=${params.repoName}&owner=${params.owner}&issue_number=${params.issueNum}`,
    fetcher,
  )
  console.log(issue, comments)
  return (
    <CardBody>
      <Text mb="10">{issue?.body}</Text>
      {/* <Divider /> */}
      <Heading size="md" mb="4">
        Comments
      </Heading>
      {comments?.map((e, i) => (
        <HStack key={i} alignItems="start">
          <Avatar src={e.user?.avatar_url} size="md" />
          <Card variant="outline" boxShadow="none" size="sm" flex="1">
            <CardHeader display="flex" alignItems="center" bg="gray.50">
              {/* TODO:add date. ex: commented 2 days ago */}
              <Text fontWeight="bold">{e.user?.login}</Text>
            </CardHeader>

            <CardBody>{e.body}</CardBody>
          </Card>
        </HStack>
      ))}
    </CardBody>
  )
}
