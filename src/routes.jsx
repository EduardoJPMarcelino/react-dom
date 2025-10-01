import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function AppRoutes(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      setUser(u)
      setLoading(false)
    })
    return ()=> unsub()
  },[])

  if(loading) return <div>Carregando...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={user ? <Home user={user}/> : <Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes