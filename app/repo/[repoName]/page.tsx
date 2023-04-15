'use client'
import {
  Box,
  Button,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  VStack,
} from '@chakra-ui/react'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { fetcher } from '~/utils/fetcher'
import { Endpoints } from '@octokit/types'
import { useSearchParams } from 'next/navigation'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import InfiniteLoaderComoponent from '~/components/infinite-loader-component'

const PAGE_SIZE = 10

export default function RepoPage({ params }: { params: { repoName: string } }) {
  const owner = useSearchParams()?.get('owner') ?? ''
  const [issueState, setIssueState] = useState('all')

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    return `/api/issue/?owner=${owner}&repo-name=${
      params.repoName
    }&per_page=${PAGE_SIZE}&page=${pageIndex + 1}&labels=${
      issueState !== 'all' ? issueState : ''
    }`
  }
  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite<
    Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']
  >(getKey, fetcher)

  if (isLoading) {
    return <div>Loading</div>
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
    if (!isItemLoaded(index)) {
      content = 'Loading...'
    } else {
      content = flatData ? flatData[index].title : null
      labels = flatData ? flatData[index].labels : null
    }
    return (
      <Flex
        style={style}
        borderBottom="1px"
        borderColor="gray.200"
        align="center"
        gap="4"
      >
        {content}
        {labels?.map(label => {
          let tagKey
          let tagValue
          if (typeof label === 'string') {
            tagKey = label
            tagValue = label
          } else {
            tagKey = label.id
            tagValue = label.name
          }
          return (
            <Tag key={tagKey} borderRadius="full">
              {tagValue}
            </Tag>
          )
        })}
      </Flex>
    )
  }

  // const stateFilter = (state: 'open' | 'in progress' | 'done' | 'all') => {
  //   const containLabel = (labels: typeof data[0][0]['labels']) => {
  //     return !!labels.find(e => {
  //       if (typeof e === 'string') return e === state
  //       return e.name === state
  //     })
  //   }
  //   if (state === 'all') {
  //     flatData = flatData = data.flat()
  //   } else {
  //     flatData = flatData?.filter(e => containLabel(e.labels))
  //   }
  //   mutate()
  //   console.log(flatData)
  //   setIssueState(state)
  // }

  return (
    <>
      <CardHeader>
        <Heading size="2xl">{params.repoName}</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="stretch" spacing="6">
          <Box>
            <Menu matchWidth>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                textTransform="capitalize"
              >
                {issueState}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setIssueState('all')}>All</MenuItem>
                <MenuItem onClick={() => setIssueState('open')}>Open</MenuItem>
                <MenuItem onClick={() => setIssueState('in progress')}>
                  In Progress
                </MenuItem>
                <MenuItem onClick={() => setIssueState('done')}>Done</MenuItem>
              </MenuList>
            </Menu>
          </Box>
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
        </VStack>
      </CardBody>
    </>
  )
}
