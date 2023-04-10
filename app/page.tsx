import { Inter } from 'next/font/google'
import styles from './page.module.css'
import AuthBtn from '~/components/auth-btn'
import { getSession } from '~/utils/get-server-side-props'
// import { getSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const session = await getSession()
  // const data = await fetch(`${process.env.NEXT_BASE_URL}/get-repos`)

  console.log(session)
  return (
    <main>
      <AuthBtn session={session} />
      {session ? (
        <div>
          tasks
          {/* <button
            // onClick={async () => {
            //   data = await onFetch()
            // }}
          >
            fetch
          </button> */}
          {/* <ul>{data}</ul> */}
        </div>
      ) : null}
    </main>
  )
}
