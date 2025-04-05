"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle, Loader2, Mail, Lock, Shield, UserPlus } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [siteUrl, setSiteUrl] = useState("")
  const [isSignupComplete, setIsSignupComplete] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    setSiteUrl(window.location.origin)
  }, [])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter your email and password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      if (data.user) {
        const response = await fetch("/api/holders/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ holderId: data.user.id }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("API error:", errorData)
        }

        setIsSignupComplete(true)
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      setErrorMessage(error.message || "Failed to create your account. Please try again.")
      toast({
        title: "Error",
        description: error.message || "Failed to create your account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSignupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-green-500/10 text-green-500 font-display text-base font-bold tracking-wide">
              <UserPlus className="w-5 h-5" />
              Account Created
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 via-green-500/20 to-green-500/30 rounded-2xl blur-2xl opacity-50"></div>
            <Card className="relative bg-card rounded-2xl shadow-xl border">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
                <CardDescription className="text-center">We've sent you a confirmation link</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">
                  Please check your email ({email}) for a confirmation link. After confirming your email, you'll receive 10
                  tokens as a welcome bonus when you log in!
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Link href="/login" className="w-full">
                  <Button className="w-full" variant="outline">
                    Go to Login
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-destructive/10 text-destructive font-display text-base font-bold tracking-wide">
            <AlertTriangle className="w-5 h-5" />
            Emergency Response Platform
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-destructive via-destructive/90 to-destructive/80 text-transparent bg-clip-text">
                Join the Network
              </span>
            </h1>

            <p className="text-lg text-muted-foreground/90 max-w-sm mx-auto leading-relaxed">
              Create an account to become part of our emergency response network and make a difference.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-destructive/30 via-destructive/20 to-destructive/30 rounded-2xl blur-2xl opacity-50"></div>
          <Card className="relative bg-card rounded-2xl shadow-xl border">
            <form onSubmit={handleSignup}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                </div>
                <CardDescription>Enter your details to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                {errorMessage && (
                  <div className="text-sm text-destructive p-2 bg-destructive/10 rounded border border-destructive/20">
                    {errorMessage}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  After confirming your email, you'll receive 10 tokens as a welcome bonus!
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full bg-destructive hover:bg-destructive/90" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-destructive hover:underline font-medium">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}