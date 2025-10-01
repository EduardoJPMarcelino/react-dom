import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Home({ user }){
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    async function fetchProfile(){
      try{
        const ref = doc(db, 'users', user.uid)
        const snap = await getDoc(ref)
        if(snap.exists()){
          setProfile(snap.data())
        }else{
          setProfile(null)
        }
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
    fetchProfile()
  },[user])

  const handleLogout = async ()=>{
    await signOut(auth)
    navigate('/login')
  }

  if(loading) return <div>Carregando perfil...</div>

  return (
    <div className="page home">
      <h2>Página Principal</h2>
      {profile ? (
        <div className="profile">
          <p><strong>Nome:</strong> {profile.firstName}</p>
          <p><strong>Sobrenome:</strong> {profile.lastName}</p>
          <p><strong>Data de Nascimento:</strong> {profile.birthdate}</p>
          <p><strong>UID:</strong> {profile.uid}</p>
        </div>
      ) : (
        <div>Perfil não encontrado.</div>
      )}

      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}