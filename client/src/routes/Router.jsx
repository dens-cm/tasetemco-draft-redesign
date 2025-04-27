import React from 'react'
import { Toaster } from '../components/ui/toaster'
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, Image, Spinner, Text } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../config/AuthContext'
import LoginPage from '../pages/authentication/Login'
import Tasetemco from '../components/layout/container/Tasetemco'
import tasetemco_image from '../assets/tasetemco.png'

export default function Router() {

  function Protected({ children, requireAuth }) {
    const { user, isAdmin, loading } = useAuth()

    if (loading) {
      return (
        <Box h='100%' bg='base' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Image w='8vw' src={tasetemco_image} alt='Tasetemco' />
          <Text mt='.5vw' fontSize='xsm' display='flex' alignItems='center'><Spinner w='1.2vw' h='1.2vw' mr='.5vw' thickness='.2vw' speed='0.65s' />Please wait...</Text>
        </Box>
      )
    }

    if (requireAuth && !user) {
      return <Navigate to="/login" replace />
    }

    if (!requireAuth && user) {
      return <Navigate to="/" replace />
    }

    return children || <Tasetemco isAdmin={isAdmin} />
  }

  return (
    <AuthProvider>
      <Box w='100vw' h='100vh'>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Protected requireAuth />} />
            <Route path="/login" element={<Protected requireAuth={false}><LoginPage /></Protected>} />
          </Routes>
        </BrowserRouter>
      </Box>
    </AuthProvider>
  )
}
