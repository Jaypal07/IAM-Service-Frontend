import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NavLink } from "react-router";

export default function Pricing() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-black flex items-center py-8">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Start for free, scale as you grow. No hidden fees.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Free Tier */}
          <PricingCard 
            title="Developer"
            price="$0"
            description="Perfect for side projects."
            features={[
              "Up to 1,000 MAU",
              "Social Login",
              "Basic Support",
              "1 Project"
            ]}
            delay={0}
          />

          {/* Pro Tier */}
          <PricingCard 
            title="Startup"
            price="$29"
            period="/mo"
            description="For growing teams."
            features={[
              "Up to 10,000 MAU",
              "Unlimited Social",
              "Priority Support",
              "10 Projects",
              "Custom Domain",
              "Role Management"
            ]}
            popular
            delay={0.1}
          />

          {/* Enterprise Tier */}
          <PricingCard 
            title="Business"
            price="$99"
            period="/mo"
            description="Scale without limits."
            features={[
              "Unlimited MAU",
              "SAML & SSO",
              "Dedicated Support",
              "Unlimited Projects",
              "Audit Logs",
              "SLA Guarantee"
            ]}
            delay={0.2}
          />
        </div>
      </div>
    </div>
  );
}

function PricingCard({ title, price, period, description, features, popular, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={`h-full flex flex-col relative ${popular ? 'border-indigo-600 shadow-xl scale-105' : 'border-zinc-200 dark:border-zinc-800'}`}>
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold">{price}</span>
            {period && <span className="ml-1 text-zinc-500">{period}</span>}
          </div>
          <CardDescription className="mt-2 text-zinc-600 dark:text-zinc-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            {features.map((feature: string) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <NavLink to="/signup" className="w-full">
            <Button className={`w-full ${popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`} variant={popular ? 'default' : 'outline'}>
              Get Started
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
