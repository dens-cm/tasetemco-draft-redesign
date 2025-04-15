import React from 'react'
import { Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/authentication/Login'

export default function App() {
  return (
    <Box w='100vw' h='100vh'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
        </Routes>
      </Router>
    </Box>
  )
}
