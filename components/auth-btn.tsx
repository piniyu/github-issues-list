'use client'

import { Session } from 'next-auth'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'

export default function AuthBtn({ session }: { session: Session | null }) {
  // const session =await getSession()
  // console.log(session);
  // console.log(process.env)
  return (
    <>
      {!session ? (
        <button onClick={() => signIn()}>Sign in with github</button>
      ) : null}
      {session ? <button onClick={() => signOut()}>Sign out</button> : null}
    </>
  )
}
