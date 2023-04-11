import { Inter } from 'next/font/google'
import styles from './page.module.css'
import AuthBtn from '~/components/auth-btn'
import { getSession } from '~/utils/get-server-side-props'
import ReposList from '~/components/repos-list'
// import { getSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const session = await getSession()

  return (
    <main>
      <AuthBtn session={session} />
    </main>
  )
}
