import { motion } from "framer-motion";
import { Shield, Lock, Zap, Key, RefreshCw, Smartphone, Globe, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
          >
            Enterprise Grade Authentication
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            A complete identity solution built with modern security standards and seamless user experience in mind.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-indigo-500" />}
            title="Spring Security 6"
            description="Robust authentication flow built on Spring Security 6 filter chains with stateless session management."
            variants={item}
          />
          <FeatureCard 
            icon={<Lock className="h-8 w-8 text-purple-500" />}
            title="JWT & Refresh Rotation"
            description="RS256 signed Access Tokens with rotating Refresh Tokens stored in httpOnly cookies for maximum security."
            variants={item}
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-yellow-500" />}
            title="Stateless Architecture"
            description="Fully stateless REST API design. Horizontal scaling ready with no server-side session state."
            variants={item}
          />
          <FeatureCard 
            icon={<Key className="h-8 w-8 text-green-500" />}
            title="RBAC & Permissions"
            description="Fine-grained Role-Based Access Control @PreAuthorize annotations on API endpoints."
            variants={item}
          />
          <FeatureCard 
            icon={<RefreshCw className="h-8 w-8 text-blue-500" />}
            title="Reuse Detection"
            description="Advanced refresh token reuse detection mechanism to invalidate compromised token families immediately."
            variants={item}
          />
          <FeatureCard 
            icon={<Smartphone className="h-8 w-8 text-pink-500" />}
            title="Modern Stack"
            description="Spring Boot 3.2 backend paired with a React + Vite + Tailwind CSS frontend."
            variants={item}
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8 text-cyan-500" />}
            title="OAuth2 / OIDC"
            description="Standardized OAuth2 client implementation for Google & GitHub providers using Spring Security OAuth2."
            variants={item}
          />
          <FeatureCard 
            icon={<Code2 className="h-8 w-8 text-orange-500" />}
            title="OpenAPI 3.0"
            description="Full API documentation auto-generated with Swagger UI for easy integration and testing."
            variants={item}
          />
          <FeatureCard 
            icon={<div className="relative">

              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>}
            title="Email Verification"
            description="Mandatory email account verification workflow to ensure user authenticity and prevent spam."
            variants={item}
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, variants }: any) {
  return (
    <motion.div variants={variants}>
      <Card className="h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
