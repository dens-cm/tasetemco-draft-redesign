'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider({ children, theme }) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
