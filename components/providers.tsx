'use client'
import { ReactNode } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendBaseTheme, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        bg: mode('gray.100', 'gray.800')(props),
        width: '100vw',
        minHeight: '100vh !important',
        lineHeight: 'base',
      },
      h1: {
        fontSize: '4xl',
      },
      h2: {
        fontSize: '3xl',
      },
      h3: {
        fontSize: '2xl',
      },
      h4: {
        fontSize: 'xl',
      },
      // '*::placeholder': {
      //   color: mode('gray.400', 'whiteAlpha.400')(props),
      // },
      // '*, *::before, &::after': {
      //   borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      //   wordWrap: 'break-word',
      // },
    }),
  },
})
export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
