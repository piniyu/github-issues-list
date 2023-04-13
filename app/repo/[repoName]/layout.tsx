'use client'
import { Card, CardHeader, Heading } from '@chakra-ui/react'

export default function Repo({ children }: { children: React.ReactNode }) {
  return <Card bg="white">{children}</Card>
}
