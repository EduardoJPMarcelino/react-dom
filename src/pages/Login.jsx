import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault()
    setError(null)
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    }catch(err){
      console.error(err)
      setError('Usuário não cadastrado ou credenciais inválidas.')
    }
  }

  return (
    <div className="page login">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <label>E-mail
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Senha
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>

        {error && <div className="error">{error}</div>}

        <button type="submit">Acessar a página Principal</button>
      </form>

      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  )
}