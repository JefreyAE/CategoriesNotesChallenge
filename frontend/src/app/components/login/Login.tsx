
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn, signUp } from '@/services/auth/authService'
import IsLoading from '../IsLoading'
import { toast } from 'react-toastify'
import { toastConfigCenter } from '@/app/constants/toatsconfig'

export default function Login({ searchParams, }: { searchParams?: { message: string } }) {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  const login = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    if (!email || !password) {
      setIsLoading(false)
      toast.warning("Please complete all the fields", toastConfigCenter);
      return;
    }

    if (!isValidEmail(email)) {
      toast.warning("Please enter a valid email", toastConfigCenter);
      setIsLoading(false);
      return;
    }

    signIn(email, password)
      .then((data) => {
        router.push('/notes')
      }).catch((error => {

      }))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const register = (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      setIsLoading(false)
      toast.warning("Please complete all the fields", toastConfigCenter);
      return;
    }

    signUp(email, password)
      .then((data) => {
      }).catch((error => {

      }))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <label className="text-md" htmlFor="email"> Email </label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="you@example.com"
          type='email'
          required
        />
        <label className="text-md" htmlFor="password"> Password </label>
        <div className="flex row relative">
          <input className="rounded-md w-full px-4 py-2 bg-inherit border mb-6"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Type your password"
            required
          />
          <div
            className="absolute top-1/2 right-2 transform -translate-y-6 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {!showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 4h20M8 11l4 4 4-4M7 16h10"
                />
              </svg>
            )}
          </div>
        </div>
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          onClick={(e) => login(e)}>
          Sign In
        </button>
        <button className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          onClick={register}>
          Sign Up
        </button>
        {searchParams?.message}
      </form>
      {isLoading && <IsLoading message='Sending' />}
    </div>
  )
}
