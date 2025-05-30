import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { createTheme } from '@mui/material/styles'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import Dashboard from '../../../pages/admin/Dashboard'
import Inventory from '../../../pages/admin/Inventory'
import top_right from '../../../assets/top-right.png'
import bottom_left from '../../../assets/bottom-left.png'
import bottom_right from '../../../assets/bottom-right.png'
import building from '../../../assets/building.png'

export default function Tasetemco({ isAdmin }) {

  const [view, setView] = React.useState('dashboard')

  const greetings = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Morning, "
    if (hour < 18) return "Afternoon, "
    return "Evening, "
  }

  const tableTheme = createTheme({
    shadows: [
      'none',
      '0px rgba(0, 0, 0), 0px rgba(0, 0, 0), 0px rgba(0, 0, 0)',
      '0px rgba(0, 0, 0), 0px rgba(0, 0, 0), 0px rgba(0, 0, 0)',
    ]
  })

  return (
    <Chakra.Box w='100%' h='100%' display='flex'>

      {/* Navbar */}
      <Chakra.Box w='17%' h='100%' borderRight='2px solid green'>
        <Navbar isAdmin={isAdmin} view={view} setView={setView} />
      </Chakra.Box>
      <Chakra.Box w='83%' h='100%' display='flex' flexDirection='column'>

        {/* Header */}
        <Chakra.Box zIndex='1' w='83%' position='absolute'>
          <Header />
        </Chakra.Box>

        {/* background */}
        <Chakra.Box zIndex='-1' bg='white' w='83%' h='100%' position='absolute'>
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
        </Chakra.Box>

        {/* contents */}
        <Chakra.Box w='100%' h='100%' p='6vw 1vw 1vw' overflow='auto' scrollbar="hidden">
          {
            view === 'dashboard' ? (
              <Dashboard greetings={greetings} tableTheme={tableTheme} />
            ) : view === 'inventory' ? (
              <Inventory greetings={greetings} />
            ) : (
              <></>
            )
          }
        </Chakra.Box>
      </Chakra.Box>
    </Chakra.Box>
  )
}
