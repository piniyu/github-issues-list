import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { fetcher } from '~/utils/fetcher'
import { Endpoints } from '@octokit/types'
import InfiniteLoaderComoponent from '~/components/infinite-loader-component'

import { Flex, Heading, Link, Tag } from '@chakra-ui/react'
import IssuesListItem from './issues-list-item'

const PAGE_SIZE = 10

export default function IssuesList({
  issueState,
  repoName,
  owner,
}: {
  issueState: string
  repoName: string
  owner: string
}) {
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    return `/api/list-issue?owner=${owner}&repo_name=${repoName}&per_page=${PAGE_SIZE}&page=${
      pageIndex + 1
    }&labels=${issueState !== 'all' ? issueState : ''}`
  }
  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite<
    Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']
  >(getKey, fetcher)

  if (isLoading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>something went wrong!</div>
  } else if (!data) {
    return <div>No data found</div>
  }

  // let flatData = data?.flat()
  console.log(data)

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  /** count total items */
  let totalOpenIssues = 0
  for (let i = 0; i < data?.length; i++) {
    totalOpenIssues += data[i].length
  }

  /** check if index is loaded */
  const isItemLoaded = (index: number) => {
    return isReachingEnd || index < totalOpenIssues
  }

  return (
    <>
      {data[0].length === 0 ? (
        <Heading size="md">No issue!</Heading>
      ) : (
        <div
          style={{
            height: 60 * totalOpenIssues,
            maxHeight: '70vh',
            flex: '1 1 auto',
          }}
        >
          <InfiniteLoaderComoponent
            isReachingEnd={isReachingEnd}
            totalItems={totalOpenIssues}
            isLoading={isLoading}
            loadMoreFn={() => setSize(prev => prev + 1)}
            item={IssuesListItem({ repoName, owner, isItemLoaded, data })}
          />
        </div>
      )}
    </>
  )
}
