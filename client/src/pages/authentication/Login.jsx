import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiArrowRightCircle, HiEnvelope, HiLockClosed } from "react-icons/hi2"
import { login } from '@/api/Requests'
import Toast from '../../components/toast/Toast'
import top_right from '../../assets/top-right.png'
import bottom_left from '../../assets/bottom-left.png'
import bottom_right from '../../assets/bottom-right.png'
import building from '../../assets/building.png'
import tasetemco_md from '../../assets/icons/tasetemco-md.png'
import pftec from '../../assets/icons/pftec.png'

export default function Login() {

  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const showToast = Toast()

  const handleLogin = async (e) => {
    e.preventDefault()
    login(emailRef.current.value, passwordRef.current.value, setLoading, showToast)
  }

  return (
    <Chakra.Box w='100%' h='100%' bg='#f5f3f4' display='flex' flexDirection='column' userSelect='none'>
      <Chakra.Box w='100%' h='25%' display='flex' justifyContent='right'>
        <Chakra.Image src={top_right} alt='tasetemco' h='100%' objectFit='fill' />
      </Chakra.Box>
      <Chakra.Box w='100%' h='50%' display='flex' alignItems='center' justifyContent='right'>
        <Chakra.Image src={building} alt='building' w='22vw' mt='5vw' mr='12vw' />
      </Chakra.Box>
      <Chakra.Box w='100%' h='25%'>
        <Chakra.Image src={bottom_left} alt='tasetemco' h='100%' objectFit='fill' />
      </Chakra.Box>
      <Chakra.Box w='50%' h='5vw' mb='2vw' position='absolute' bottom='0%' right='0%'>
        <Chakra.Image src={bottom_right} alt='tasetemco' w='100%' h='100%' objectFit='cover' />
      </Chakra.Box>
      {/* Contents */}
      <Chakra.Box position='absolute' m='2vw 2vw'>
        <Chakra.Box display='flex' alignItems='center' justifyContent='space-between'>
          <Chakra.Image src={tasetemco_md} alt='tasetemco' w='5vw' />
          <Chakra.Box w='25vw' p='0 1vw'>
            <Chakra.Text variant='heading' textAlign='center'>Tabon Secondary Teachers, Employees and <br /> Community Multi-purpose Cooperative <br /> (TASETEMCO MPC)</Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>
        <Chakra.Box mt='1.5vw' display='flex' alignItems='center' justifyContent='space-between'>
          <Chakra.Image src={pftec} alt='pftec' w='5vw' />
          <Chakra.Box w='24vw' p='0 1vw'>
            <Chakra.Text textAlign='center'>Registered under the Laws of the Philippines <br /> RN: CARA-0146, 02.16.97 RN: RA9520-13005802, 01.07.10 <br /> CIN: 0104130163 TIN: 004-393-599</Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>
      </Chakra.Box>
      {/* Login Form */}
      <Chakra.Card.Root zIndex='1' w='30%' position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
        <form onSubmit={handleLogin}>
          <Chakra.Box display='flex' flexDirection='column'>
            <Chakra.Text display='flex' alignItems='center'>Email:</Chakra.Text>
            <Chakra.InputGroup startElement={<HiEnvelope />}>
              <Chakra.Input required type='email' ref={emailRef} placeholder='Enter email' />
            </Chakra.InputGroup>
            <Chakra.Text mt='1.2vw'>Password:</Chakra.Text>
            <Chakra.InputGroup startElement={<HiLockClosed/>}>
              <Chakra.Input required type='password' ref={passwordRef} placeholder='Enter password' />
            </Chakra.InputGroup>
          </Chakra.Box>
          <Chakra.Button type='submit' loading={loading} disabled={loading} w='100%' mt='2.3vw'>Login <Chakra.Icon as={HiArrowRightCircle} boxSize='sm' /></Chakra.Button>
        </form>
      </Chakra.Card.Root>
    </Chakra.Box>
  )
}
