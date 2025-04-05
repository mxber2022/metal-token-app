"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle, Loader2, Mail, Lock, Shield } from "lucide-react"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        toast({
          title: "Success!",
          description: "You've successfully logged in.",
        })

        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setErrorMessage(error.message || "Failed to log in. Please check your credentials.")
      toast({
        title: "Error",
        description: error.message || "Failed to log in",
        variant: "destructive",
      })
      setIsLoading(false)
    }
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
                Welcome Back
              </span>
            </h1>

            <p className="text-lg text-muted-foreground/90 max-w-sm mx-auto leading-relaxed">
              Your presence matters. Sign in to help coordinate emergency responses and save lives.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-destructive/30 via-destructive/20 to-destructive/30 rounded-2xl blur-2xl opacity-50"></div>
          <Card className="relative bg-card rounded-2xl shadow-xl border">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-2xl">Secure Access</CardTitle>
                </div>
                <CardDescription>Enter your credentials to continue</CardDescription>
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
                      placeholder="Enter your password"
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
                      Authenticating...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-destructive hover:underline font-medium">
                    Sign up
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