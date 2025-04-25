import React from 'react'
import * as Chakra from '@chakra-ui/react'
import {
    HiSquares2X2, HiMiniRectangleGroup,
    HiMiniInboxStack, HiMiniCircleStack, HiMiniUsers,
    HiCog6Tooth, HiArchiveBox
} from "react-icons/hi2"
import tasetemco_md from '../../../assets/icons/tasetemco-md.png'
import tasetemco from '../../../assets/tasetemco.png'

export default function Navbar({ isAdmin }) {
    return (
        <Chakra.Box w='100%' h='100%' p='1vw' display='flex' flexDirection='column' bg='base'>
            <Chakra.Box w='100%' h='2.2vw' mb='1vw' display='flex' alignItems='center'>
                <Chakra.Image src={tasetemco_md} alt='tasetemco' h='100%' mr='.8vw' />
                <Chakra.Image src={tasetemco} alt='tasetemco' w='9vw' />
            </Chakra.Box>
            <Chakra.Box w='100%' h='.1px' bg='rgba(136, 136, 136, 0.14)' />
            <Chakra.Box w='100%' h='100%' mt='1.5vw' pl='2vw'>
                <Chakra.Button variant='selected_left' w='100%' fontWeight='400'><Chakra.Icon as={HiSquares2X2} boxSize='sm' />Dashboard</Chakra.Button>
                <Chakra.Button variant='unselected_left' w='100%' mt='.3vw' fontWeight='400'><Chakra.Icon as={HiArchiveBox} boxSize='sm' />Inventory</Chakra.Button>
                <Chakra.Button variant='unselected_left' w='100%' mt='.3vw' fontWeight='400'><Chakra.Icon as={HiMiniCircleStack} boxSize='sm' />Lending</Chakra.Button>
                <Chakra.Button variant='unselected_left' w='100%' mt='.3vw' fontWeight='400'><Chakra.Icon as={HiMiniRectangleGroup} boxSize='sm' />Canteen</Chakra.Button>
                <Chakra.Button variant='unselected_left' w='100%' mt='.3vw' fontWeight='400'><Chakra.Icon as={HiMiniInboxStack} boxSize='sm' />Water Refilling</Chakra.Button>
                <Chakra.Button variant='unselected_left' w='100%' mt='.3vw' fontWeight='400'><Chakra.Icon as={HiMiniUsers} boxSize='sm' />Members</Chakra.Button>
                <Chakra.Button variant='unselected_left' w='100%' mt='6vw' fontWeight='400'><Chakra.Icon as={HiCog6Tooth} boxSize='sm' />Settings</Chakra.Button>
                <Chakra.Text>{String(isAdmin)}</Chakra.Text>
                <Chakra.Text>Dashboard <br/> Payment History <br/> Payment <br/> Loan Application</Chakra.Text>
            </Chakra.Box>
        </Chakra.Box>
    )
}
