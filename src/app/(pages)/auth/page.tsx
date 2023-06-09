"use client"

import Input from "@/components/input";
import Image from "next/image";
import { useCallback, useState } from "react";
import axios from "axios";

export default function MyPage() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, [])

  const register = useCallback(async () => {

    //provavel erro aqui 01:14:00
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password])

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" className="h-12" width={180} height={60} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 
          lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Entrar' : 'Cria sua conta'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Nome"
                  onChange={(e: any) => { setName(e.target.value) }}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => { setEmail(e.target.value) }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Senha"
                onChange={(e: any) => { setPassword(e.target.value) }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition">
              {variant === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'Novo por aqui?' : 'Já possui conta?'}

              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Crie sua conta' : 'Acessar'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}