"use client"

import type React from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGoogle, IconHome } from "@tabler/icons-react"

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="relative w-full max-w-md rounded-2xl bg-black/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition-colors hover:border-gray-600 hover:text-white"
          >
            <IconHome className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            Welcome Back
          </h2>
          <p className="mx-auto max-w-sm text-sm text-gray-400 sm:text-base">
            Sign in to your account to continue your journey at Varnothsava
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-gray-200">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className="bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 focus:ring-offset-0 outline-none"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-11 w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.99]"
            type="submit"
          >
            <span className="relative z-10">Login</span>
            <BottomGradient />
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <span className="relative bg-black px-4 text-sm text-gray-500">or continue with</span>
          </div>

          <button
            className="group/btn relative flex h-11 w-full items-center justify-center space-x-2 rounded-lg border border-gray-800 bg-black font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.99]"
            type="button"
          >
            <IconBrandGoogle className="h-5 w-5" />
            <span>Sign in with Google</span>
            <BottomGradient />
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-white underline-offset-4 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-all duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition-all duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
}

