import { useState, useEffect } from "react";
import { ABOUT_DATA } from "./about.data";
import { AboutSection } from "@/components/about/AboutSection";
import { SectionTitle } from "@/components/about/SectionTitle";
import { ProjectCard } from "@/components/about/ProjectCard";
import { SkillGroup } from "@/components/about/SkillGroup";
import { ExperienceItem } from "@/components/about/ExperienceItem";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const { hero, skills, experience, projects, values } = ABOUT_DATA;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-page-gradient overflow-x-hidden">
      {/* Hero Section */}
      <AboutSection className="pt-32 pb-20 text-center relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent dark:from-indigo-900/20 dark:via-transparent dark:to-transparent pointer-events-none" />
        
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mx-auto max-w-4xl space-y-8"
        >
          {/* ... existing hero content ... */}
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="px-4 py-1.5 text-base border-indigo-200/60 bg-indigo-50/50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-900/20 dark:text-indigo-300 backdrop-blur-sm shadow-sm gap-2">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               Open to Work
            </Badge>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 relative">
              {hero.name}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 dark:text-indigo-900/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            {hero.title}
          </motion.p>
          
          <motion.p variants={fadeInUp} className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {hero.summary}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-6">
            <Button size="lg" className="h-14 px-8 text-base bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </AboutSection>

      {/* Skills Section */}
      <AboutSection className="relative">
         <SectionTitle title="Technical Expertise" subtitle="A breakdown of my core technical skills and tools." />
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
         >
            {skills.map((skill, index) => (
              <SkillGroup 
                key={index}
                category={skill.category}
                items={skill.items}
                icon={skill.icon}
              />
            ))}
         </motion.div>
      </AboutSection>

      {/* Values Section */}
      <AboutSection>
        <SectionTitle title="Engineering Values" subtitle="The core principles that drive my development process." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {values.map((value, index) => (
             <motion.div 
               key={index} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="space-y-3 p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1"
             >
               <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 mb-2">
                 <value.icon className="h-6 w-6" />
               </div>
               <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{value.title}</h3>
               <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                 {value.description}
               </p>
             </motion.div>
           ))}
        </div>
      </AboutSection>

      {/* Projects Section - Wide Cards */}
      <AboutSection id="projects">
         <SectionTitle title="Featured Projects" subtitle="Highlights of my engineering work." />
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="grid grid-cols-1 gap-8 max-w-5xl mx-auto"
         >
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
              />
            ))}
         </motion.div>
      </AboutSection>

      {/* Experience Section - Resume Style */}
      <AboutSection>
        <SectionTitle title="Professional Journey" subtitle="My path from Quality Assurance to Fullstack Development." />
        <div className="max-w-4xl mx-auto">
           <div className="space-y-0">
             {experience.map((exp, index) => (
               <motion.div 
                 key={exp.id} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 <ExperienceItem 
                   role={exp.role}
                   company={exp.company}
                   period={exp.period}
                   description={exp.description}
                   isLast={index === experience.length - 1} 
                 />
               </motion.div>
             ))}
           </div>
        </div>
      </AboutSection>



      {/* Education & Certifications */}
      <AboutSection className="relative">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle title="Education" className="mb-8" />
            <div className="space-y-6">
              {ABOUT_DATA.education.map((edu, idx) => (
                <div key={idx} className="bg-zinc-50/80 dark:bg-zinc-900/80 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{edu.degree}</h3>
                  <div className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">{edu.institution}</div>
                  <div className="text-sm text-zinc-500 mt-2">{edu.year}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle title="Certifications" className="mb-8" />
            <div className="flex flex-wrap gap-3">
              {ABOUT_DATA.certifications.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 shadow-sm flex items-center gap-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-default"
                >
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </AboutSection>
      
      {/* Contact Section */}
      <AboutSection id="contact" className="pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center space-y-8 py-12 px-6"
        >
          <div className="space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">Ready to Collaborate?</h2>
             <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
               I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
             </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
             <Button 
               size="lg" 
               variant="outline"
               className="h-14 px-8 text-base border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => (window.location.href = hero.social.email)}
             >
               <Mail className="mr-2 h-5 w-5" /> Get in Touch
             </Button>
             <Button 
               size="lg" 
               variant="outline" 
               className="h-14 px-8 text-base border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
               onClick={() => window.open(hero.social.linkedin, '_blank')}
             >
               <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
             </Button>
             <Button 
               size="lg" 
               variant="outline" 
               className="h-14 px-8 text-base border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
               onClick={() => window.open(hero.social.github, '_blank')}
             >
               <Github className="mr-2 h-5 w-5" /> GitHub
             </Button>
          </div>
        </motion.div>
      </AboutSection>
     {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 text-indigo-600 dark:text-indigo-400 backdrop-blur-md shadow-lg shadow-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:shadow-indigo-500/20 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
