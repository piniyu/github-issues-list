'use client'
import { Card, CardHeader, Heading } from '@chakra-ui/react'

export default function Repo({
  children,
  params,
}: {
  children: React.ReactNode
  params: { issueTitle: string }
}) {
  return (
    <Card bg="white" size="lg">
      {children}
    </Card>
  )
}
