'use client'
import { CardHeader, Heading } from '@chakra-ui/react'

export default function Repo({
  children,
  params,
}: {
  children: React.ReactNode
  params: { repoName: string; owner: string }
}) {
  return (
    <>
      <CardHeader>
        <Heading size="2xl">
          {params.owner}/{params.repoName}
        </Heading>
      </CardHeader>
      {children}
    </>
  )
}
