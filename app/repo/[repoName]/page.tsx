'use client'
import {
  Button,
  CardBody,
  CardHeader,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { fetcher } from '~/utils/fetcher'
import { Endpoints } from '@octokit/types'
import { useSearchParams } from 'next/navigation'
import { ChevronDownIcon } from '@chakra-ui/icons'

const PAGE_SIZE = 10

export default function RepoPage({ params }: { params: { repoName: string } }) {
  const owner = useSearchParams()?.get('owner') ?? ''

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    // return `/api/issues?repo-name=${params.repoName}&page=${pageIndex+1}&owner=${owner}`
    return `https://api.github.com/repos/${owner}/${
      params.repoName
    }/issues?per_page=${PAGE_SIZE}&page=${pageIndex + 1}`
  }
  const { data, error, isLoading } = useSWRInfinite<
    Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']
  >(getKey, fetcher)

  if (isLoading) {
    return <div>Loading</div>
  } else if (!data) {
    return <div>No data found</div>
  }
  console.log(data)
  let totalOpenIssues = 0

  for (let i = 0; i < data?.length; i++) {
    totalOpenIssues += data[i].length
  }
  return (
    <>
      <CardHeader>{params.repoName}</CardHeader>
      <CardBody>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Open
          </MenuButton>
          <MenuList>
            <MenuItem>In Progress</MenuItem>
            <MenuItem>Done</MenuItem>
          </MenuList>
        </Menu>
        {
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>{totalOpenIssues} issues</Th>
                  <Th>Label</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(issues => {
                  if (Array.isArray(issues)) {
                    return issues.map((issues, index) => (
                      <Tr key={index}>
                        <Td>{issues.title}</Td>
                      </Tr>
                    ))
                  }
                  return (
                    <Tr>
                      <Td>'No issues'</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        }
      </CardBody>
    </>
  )
}
