import React from 'react'
import * as Chakra from '@chakra-ui/react'

export default function Inventory({ greetings }) {
    return (
        <Chakra.Box w='100%'>

            {/* Greetings */}
            <Chakra.Box w='100%' display='flex' alignItems='center'>
                <Chakra.Box w='50%' display='flex' flexDirection='column'>
                    <Chakra.Heading fontSize='1.5vw' display='flex'>
                        Good {greetings()}
                        <Chakra.Highlight query="Admin" styles={{ ml: '.3vw', color: "secondary" }}>Admin</Chakra.Highlight>
                    </Chakra.Heading>
                    <Chakra.Text>May your {greetings()} be filled with positive thoughts.</Chakra.Text>
                </Chakra.Box>
            </Chakra.Box>

            {/* Message */}
            <Chakra.Card.Root w='100%' mt='1vw' p='1vw' display='flex' alignItems='center' justifyContent='center' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                <Chakra.Text>Currently unavailable.</Chakra.Text>
            </Chakra.Card.Root>
        </Chakra.Box>
    )
}
