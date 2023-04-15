'use client'
import {
  Badge,
  Box,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { Endpoints } from '@octokit/types'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { fetcher } from '~/utils/fetcher'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  return `/api/repos?page=${pageIndex + 1}`
}

export default function ReposList() {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<Endpoints['GET /user/repos']['response']['data']>(
      getKey,
      fetcher,
    )
  if (!data) {
    return <div>loading</div>
  }

  let totalRepos = 0

  for (let i = 0; i < data.length; i++) {
    totalRepos += data[i].length
  }

  console.log(data)

  return (
    <VStack spacing="10">
      <Heading size="lg">{totalRepos} repositories listed</Heading>
      <SimpleGrid w="100%" minChildWidth="60" spacing="6">
        {data?.map(repos => {
          if (Array.isArray(repos)) {
            return repos.map((repo, index) => (
              <Card key={index}>
                <CardHeader>
                  <Badge colorScheme={repo.private ? 'red' : 'green'}>
                    {repo.private ? 'Private' : 'Public'}
                  </Badge>
                  <Link href={`/repo/${repo.name}?owner=${repo.owner.login}`}>
                    <Heading size="md">{repo.name}</Heading>
                  </Link>
                </CardHeader>
                <CardBody py="0">
                  {repo.private ? (
                    <Text color="gray.400">
                      Private repo does not provide issue count.
                    </Text>
                  ) : (
                    <Text fontWeight="bold">
                      {repo.open_issues_count} issues
                    </Text>
                  )}
                </CardBody>
                <CardFooter>
                  <Link href={repo.html_url} isExternal>
                    Github <ExternalLinkIcon mx="2px" />
                  </Link>
                </CardFooter>
              </Card>
            ))
          }
          return null
        })}
      </SimpleGrid>
    </VStack>
  )
}
