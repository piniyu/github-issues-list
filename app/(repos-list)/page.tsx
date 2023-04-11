import { NextResponse } from 'next/server'
import ReposList from '~/components/repos-list'
import { getSession } from '~/utils/get-server-side-props'

const onFetch = async (page: number) => {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/repos/${page}`)
  return NextResponse.json({ res })
}

export default async function ReposPage() {
  const session = await getSession()

  return (
    <>
      <ReposList />
      {/* {session ? <ul>{}</ul> : <p>Please login!</p>} */}
      {/* </ReposList> */}
    </>
  )
}
