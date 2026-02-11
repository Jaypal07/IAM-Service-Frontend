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
      <section className="relative overflow-hidden pt-8 pb-32 md:pt-12 md:pb-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.1),transparent_70%)]" />
        
        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
                Production Ready Architecture
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Spring Boot & React <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                  Authentication System
                </span>
              </h1>
              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                A comprehensive identity solution showcasing <strong>JWT</strong> security, <strong>OAuth2</strong> integration, 
                <strong>RBAC</strong>, and <strong>HttpOnly</strong> cookies. Built to demonstrate enterprise-grade security patterns.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={handleGetStartedClick}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-500 text-white h-12 px-8 text-base shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
              >
                Try Live Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                onClick={() => window.open('https://github.com/Jaypal07/IAM-Service', '_blank')}
              >
                View Source Code
              </Button>
            </motion.div>

            {/* Tech Stack Mini-bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-8 border-t border-zinc-200 dark:border-zinc-800"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Built With Modern Stack</p>
              <div className="flex flex-wrap gap-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Simple text labels for cleanliness, or we could use icons if available in lucide (limited) */}
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <Zap className="h-4 w-4 text-green-500" /> Spring Boot 3.2
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <ShieldCheck className="h-4 w-4 text-blue-500" /> Spring Security 6
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <Lock className="h-4 w-4 text-cyan-500" /> React + TS
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <Fingerprint className="h-4 w-4 text-purple-500" /> OAuth2 / OIDC
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Recruiter Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 dark:opacity-40 animate-pulse" />
            <Card className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Zap className="h-5 w-5 text-indigo-500" fill="currentColor" />
                      Recruiter Fast Track
                    </CardTitle>
                    <p className="text-sm text-zinc-500 mt-1">Skip registration and test immediately</p>
                  </div>
                  <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded uppercase tracking-wide">
                    Live Demo
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Admin Access</label>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 group hover:border-indigo-500 transition-colors cursor-pointer"
                       onClick={() => { navigator.clipboard.writeText('admin@example.com'); }}>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">admin@example.com</div>
                        <div className="text-xs text-zinc-500">Role: Admin</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
                      pass: Admin@123
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">User Access</label>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 group hover:border-indigo-500 transition-colors cursor-pointer"
                       onClick={() => { navigator.clipboard.writeText('user@example.com'); }}>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                        <Fingerprint className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">user@example.com</div>
                        <div className="text-xs text-zinc-500">Role: Regular User</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
                      pass: Password@123
                    </div>
                  </div>
                </div>

                <Button onClick={() => navigate("/login", { state: { demo: 'admin' } })} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Login to Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Technical Highlights
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A deep dive into the security architecture and implementation details.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure Registration"
            desc="Jakarta Validation API & BCrypt encryption ensuring data integrity and password security."
          />
          <FeatureCard
            icon={<Lock />}
            title="JWT Architecture"
            desc="Stateless security with short-lived access tokens and secure, httpOnly refresh cookie rotation."
          />
          <FeatureCard
            icon={<Zap />}
            title="Reuse Detection"
            desc="Advanced token family tracking to detect and block compromised refresh tokens immediately."
          />
          <FeatureCard
            icon={<Fingerprint />}
            title="RBAC Authorization"
            desc="Granular method-level security using Spring's @PreAuthorize and custom permission evaluators."
          />
          <FeatureCard
            icon={<Lock />}
            title="Session Control"
            desc="Concurrent session management to prevent multiple simultaneous logins."
          />
          <FeatureCard
            icon={<Lock />}
            title="Security Headers"
            desc="Helmet-equivalent implementation in Spring Security specifically for React frontends."
          />
          <FeatureCard
            icon={<Fingerprint />}
            title="OAuth2 / OIDC"
            desc="Seamless social login integration with automatic account linking and consistency."
          />
          <FeatureCard
            icon={<Zap />}
            title="Rate Limiting"
            desc="Bucket4j Implementation to protect public authentication endpoints from abuse."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-black py-8 sm:py-4 text-center text-sm text-zinc-600 dark:text-zinc-500">
        © {new Date().getFullYear()} AuthX. All rights reserved.
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
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


