'use client'
import { Center, Container } from '@chakra-ui/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxW="6xl" pt="20">
      {children}
    </Container>
  )
}
