import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Loader2,
  LogIn,
  Mail,
  Lock,
  Shield,
} from "lucide-react";

export default function Home() {
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
              Your presence matters. Sign in to help coordinate emergency
              responses and save lives.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-destructive/30 via-destructive/20 to-destructive/30 rounded-2xl blur-2xl opacity-50"></div>
          <div className="relative bg-card rounded-2xl shadow-xl border p-8 space-y-8">
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl border border-destructive/10">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-destructive shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground mb-2">
                      Secure & Private Access
                    </h3>
                    <p className="text-base text-muted-foreground/90 leading-relaxed">
                      Your information is protected with enterprise-grade
                      encryption. We prioritize the security of emergency
                      responders.
                    </p>
                  </div>
                </div>
              </div>

              {/* <button 
                onClick={() => signIn()}
                className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 font-display font-bold tracking-wide text-base shadow-lg hover:shadow-xl group"
              >
                <LogIn className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                Access Emergency Platform
              </button> */}

              <Link href="/login" className="w-1/2">
                <Button
                  className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 font-display font-bold tracking-wide text-base shadow-lg hover:shadow-xl group"
                  variant="outline"
                >
                  Log In
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground/80">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*

<CardFooter className="flex gap-2">
          <Link href="/signup" className="w-1/2">
            <Button className="w-full">Sign Up</Button>
          </Link>
          <Link href="/login" className="w-1/2">
            <Button className="w-full" variant="outline">
              Log In
            </Button>
            
            */
