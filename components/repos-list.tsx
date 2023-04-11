'use client'
import { Link } from '@chakra-ui/react'
// import { ReactNode, useState } from 'react'
// import useSWR from 'swr'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { fetcher } from '~/utils/fetcher'

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  return `/api/repos?page=${pageIndex}`
}

export default function ReposList({}: // onClickPage,
{
  // onClickPage: (page: number) => void
}) {
  // const [pageIndex, setPageIndex] = useState(0)
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(getKey, fetcher)
  if (!data) {
    return <div>loading</div>
  }

  let totalRepos = 0

  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    totalRepos += data[i].length
  }

  console.log(data)

  return (
    <div>
      <p>{totalRepos} repositories listed</p>

      {data?.map((repos, index) => {
        if (Array.isArray(repos)) {
          return repos.map((repo: any) => (
            <Link key={repo.id} href={repo.html_url} isExternal>
              {repo.name}
            </Link>
          ))
        }
        return null
      })}
      {/* <button onClick={() => onClickPage(1)}>1</button>
      <button onClick={() => onClickPage(2)}>2</button> */}
    </div>
  )
}
