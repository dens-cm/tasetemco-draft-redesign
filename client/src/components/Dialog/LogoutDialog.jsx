import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiXMark, HiArrowRightOnRectangle } from "react-icons/hi2"
import { FcHighPriority } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/config/AuthContext'
import { logout } from '@/api/Requests'
import Toast from '../toast/Toast'

export default function LogoutDialog({ logoutDialogOpen, isLogoutDialogOpen }) {

    const [loggingOut, isLoggingOut] = React.useState(false)
    const { setUser, setIsAdmin } = useAuth()
    const navigate = useNavigate()
    const showToast = Toast()

    const handleLogout = async () => {
        logout(setUser, setIsAdmin, isLoggingOut, isLogoutDialogOpen, navigate, showToast)
    }

    return (
        <Chakra.Dialog.Root open={logoutDialogOpen} onOpenChange={isLogoutDialogOpen}>
            <Chakra.Portal>
                <Chakra.Dialog.Backdrop />
                <Chakra.Dialog.Positioner>
                    <Chakra.Dialog.Content maxW='none' w='25vw' p='1vw' borderRadius='.8vw' bg='white' boxShadow='0 .4vw .8vw .4vw rgba(122, 122, 122, 0.27)' >
                        <Chakra.Dialog.Header p='0' display='flex' alignItems='center' justifyContent='space-between'>
                            <Chakra.Heading fontSize='xsm'>Confirm logout</Chakra.Heading>
                            <Chakra.IconButton onClick={() => isLogoutDialogOpen(false)} disabled={loggingOut} variant='button_icon_no_backshadow' outline='none'>
                                <Chakra.Icon as={HiXMark} boxSize='xlg' />
                            </Chakra.IconButton>
                        </Chakra.Dialog.Header>
                        <Chakra.Box h='.1px' mt='.5vw' mb='.5vw' bg='rgba(123, 123, 123, 0.25)' />
                        <Chakra.Dialog.Body m='.5vw 0' p='0'>
                            <Chakra.Text display='flex' alignItems='center'><Chakra.Icon as={FcHighPriority} boxSize='md' mr='.3vw' />Are you sure you want to logout?</Chakra.Text>
                        </Chakra.Dialog.Body>
                        <Chakra.Box h='.1px' mt='.5vw' mb='.5vw' bg='rgba(123, 123, 123, 0.25)' />
                        <Chakra.Dialog.Footer mt='.5vw' p='0'>
                            <Chakra.Button onClick={() => isLogoutDialogOpen(false)} disabled={loggingOut} variant='neutral' h='2vw' fontSize='.7vw'>Cancel</Chakra.Button>
                            <Chakra.Button onClick={handleLogout} loading={loggingOut} variant='warning' h='2vw' fontSize='.7vw' display='flex' alignItems='center'>Logout<Chakra.Icon as={HiArrowRightOnRectangle} boxSize='sm' /> </Chakra.Button>
                        </Chakra.Dialog.Footer>
                    </Chakra.Dialog.Content>
                </Chakra.Dialog.Positioner>
            </Chakra.Portal>
        </Chakra.Dialog.Root>
    )
}
