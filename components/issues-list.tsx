import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { fetcher } from '~/utils/fetcher'
import { Endpoints } from '@octokit/types'
import InfiniteLoaderComoponent from '~/components/infinite-loader-component'

import { Flex, Heading, Link, Tag } from '@chakra-ui/react'

const PAGE_SIZE = 10
enum COLOR_SCHEME {
  open = 'red',
  in_progress = 'blue',
  done = 'green',
}

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

  let flatData = data?.flat()
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
  /** infinity loader item function to render per item */
  const Item = ({ index, style }: { index: number; style: any }) => {
    let content
    let labels
    let issueNum
    if (!isItemLoaded(index)) {
      content = 'Loading...'
    } else {
      content = flatData ? flatData[index].title : null
      labels = flatData ? flatData[index].labels : null
      issueNum = flatData ? flatData[index].number : null
    }
    return (
      <Flex
        style={style}
        borderBottom="1px"
        borderColor="gray.200"
        align="center"
        gap="4"
      >
        {content !== 'Loading...' ? (
          <Link href={`/repo/${owner}/${repoName}/${issueNum}`}>{content}</Link>
        ) : (
          content
        )}
        {labels?.map(label => {
          let tagKey
          let tagValue = ''
          let colorScheme = 'gray'
          if (typeof label === 'string') {
            tagKey = label
            tagValue = label
          } else {
            tagKey = label.id
            tagValue = label.name ?? ''
            colorScheme
          }
          return (
            <Tag
              key={tagKey}
              borderRadius="full"
              variant="solid"
              colorScheme={
                COLOR_SCHEME[
                  tagValue.replaceAll(' ', '_') as keyof typeof COLOR_SCHEME
                ]
              }
            >
              {tagValue}
            </Tag>
          )
        })}
      </Flex>
    )
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
            item={Item}
          />
        </div>
      )}
    </>
  )
}
