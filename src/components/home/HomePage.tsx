import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, Zap, Fingerprint, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-zinc-50 to-white text-zinc-900 dark:from-black dark:via-zinc-900 dark:to-black dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Authentication.
            <span className="block text-indigo-400">
              Rebuilt for the Future.
            </span>
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Secure. Passwordless. Developer first. Your identity layer should
            not feel like legacy tech.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <Button
              onClick={handleGetStartedClick}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-semibold text-zinc-900 dark:text-white">
          Authentication features you actually need
        </h2>
        <p className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
          No gimmicks. Just solid, production-ready authentication flows.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure Registration"
            desc="Validated sign ups with strong hashing, email verification, and abuse protection."
          />
          <FeatureCard
            icon={<Lock />}
            title="JWT Access Tokens"
            desc="Short lived JWTs signed securely for fast, stateless authentication."
          />
          <FeatureCard
            icon={<Zap />}
            title="Refresh Tokens"
            desc="Long lived refresh tokens with automatic rotation and reuse detection."
          />
          <FeatureCard
            icon={<Fingerprint />}
            title="Token Rotation"
            desc="Every refresh invalidates the previous token to reduce blast radius."
          />
          <FeatureCard
            icon={<Lock />}
            title="Single Device Login"
            desc="Only one active session per user. New login revokes old sessions."
          />
          <FeatureCard
            icon={<Lock />}
            title="Password Login"
            desc="Industry standard password authentication using modern hashing algorithms."
          />
          <FeatureCard
            icon={<Fingerprint />}
            title="Social Login"
            desc="OAuth based login with Google and GitHub out of the box."
          />
          <FeatureCard
            icon={<Zap />}
            title="Forgot Password"
            desc="Secure reset flows using expiring tokens and verified email ownership."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-black py-8 sm:py-12 text-center text-sm text-zinc-600 dark:text-zinc-500">
        © {new Date().getFullYear()} AuthX. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="text-indigo-400">{icon}</div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-zinc-400">{desc}</CardContent>
    </Card>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 ease-in-out">
      <CardHeader>
        <p className="text-sm text-indigo-400">{step}</p>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-zinc-400">{desc}</CardContent>
    </Card>
  );
}
