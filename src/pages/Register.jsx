import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        firstName,
        lastName,
        birthdate,
        createdAt: new Date().toISOString()
      })

      navigate('/home')
    }catch(err){
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <div className="page register">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>E-mail
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Senha
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
        </label>
        <label>Nome
          <input value={firstName} onChange={e=>setFirstName(e.target.value)} required />
        </label>
        <label>Sobrenome
          <input value={lastName} onChange={e=>setLastName(e.target.value)} required />
        </label>
        <label>Data de nascimento
          <input type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} required />
        </label>

        {error && <div className="error">{error}</div>}

        <button type="submit">Cadastrar</button>
      </form>

      <p>Já tem conta? <Link to="/login">Entrar</Link></p>
    </div>
  )
}