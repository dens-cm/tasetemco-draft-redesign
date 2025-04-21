import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiMiniMagnifyingGlass, HiBell, HiMiniChevronDown, HiCog6Tooth, HiArrowRightOnRectangle, HiMiniUser } from "react-icons/hi2"
import admin from '../../assets/icons/icon-admin.png'

export default function Header() {
    return (
        <Chakra.Box w='100%' p='1vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .5vw 0 rgba(153, 153, 153, 0.18)' backdropFilter='blur(1vw)'>
            <Chakra.Box w='100%' h='2.2vw' display='flex' alignItems='center'>
                <Chakra.Box w='70%' h='100%'>
                    <Chakra.InputGroup h='100%' display='flex' startElement={<HiMiniMagnifyingGlass />}>
                        <Chakra.Input variant='search_bar' h='100%' fontSize='xsm' placeholder='Search' />
                    </Chakra.InputGroup>
                </Chakra.Box>
                <Chakra.Box w='30%' h='100%' display='flex' justifyContent='right'>
                    {/* Notification button */}
                    <Chakra.IconButton variant='button_icon' mr='.7vw'>
                        <Chakra.Icon as={HiBell} boxSize='xlg' />
                    </Chakra.IconButton>
                    {/* Account Avatar */}
                    <Chakra.Menu.Root>
                        <Chakra.Menu.Trigger outline='none'>
                            <Chakra.Card.Root variant='account' h='100%' p='.8vw' display='flex' flexDirection='row' alignItems='center' justifyContent='center' borderRadius='.7vw'>
                                <Chakra.Avatar.Root variant='solid' mr='.2vw' bg='none' boxSize='xlg'>
                                    <Chakra.AvatarFallback name='Admin' />
                                    <Chakra.AvatarImage src={admin} alt='admin' />
                                </Chakra.Avatar.Root>
                                <Chakra.Text m='0 .5vw'>Admin</Chakra.Text>
                                <Chakra.Icon as={HiMiniChevronDown} color='black' boxSize='xlg' />
                            </Chakra.Card.Root>
                        </Chakra.Menu.Trigger>
                        <Chakra.Portal>
                            <Chakra.Menu.Positioner>
                                <Chakra.Menu.Content p='.5vw' bg='white' borderRadius='.8vw' boxShadow='0vw 0vw .4vw rgba(49, 49, 49, 0.29)'>
                                    <Chakra.Menu.Item mb='.5vw' cursor='pointer' _hover={{ bg: 'hover', borderRadius: '.7vw' }} transition='.3s'>
                                        <Chakra.Text><Chakra.Icon mr='.3vw' as={HiMiniUser} color='black' boxSize='sm' /> Account</Chakra.Text>
                                    </Chakra.Menu.Item>
                                    <Chakra.Menu.Item mb='.5vw' cursor='pointer' _hover={{ bg: 'hover', borderRadius: '.7vw' }} transition='.3s'>
                                        <Chakra.Text><Chakra.Icon mr='.3vw' as={HiCog6Tooth} color='black' boxSize='sm' /> Settings</Chakra.Text>
                                    </Chakra.Menu.Item>
                                    <Chakra.Box h='.1px' m='0 .5vw' bg='rgba(136, 136, 136, 0.42)' />
                                    <Chakra.Menu.Item mt='.5vw' cursor='pointer' _hover={{ bg: 'hover', borderRadius: '.7vw' }} transition='.3s'>
                                        <Chakra.Text fontWeight='bold'><Chakra.Icon mr='.3vw' as={HiArrowRightOnRectangle} color='black' boxSize='sm' /> Logout</Chakra.Text>
                                    </Chakra.Menu.Item>
                                </Chakra.Menu.Content>
                            </Chakra.Menu.Positioner>
                        </Chakra.Portal>
                    </Chakra.Menu.Root>
                </Chakra.Box>
            </Chakra.Box>
        </Chakra.Box>
    )
}
