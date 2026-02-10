import { ABOUT_DATA } from "./about.data";
import { AboutSection } from "@/components/about/AboutSection";
import { SectionTitle } from "@/components/about/SectionTitle";
import { ProjectCard } from "@/components/about/ProjectCard";
import { SkillGroup } from "@/components/about/SkillGroup";
import { ExperienceItem } from "@/components/about/ExperienceItem";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-page-gradient overflow-x-hidden">
      {/* Hero Section */}
      <AboutSection className="pt-32 pb-20 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/20 dark:via-transparent dark:to-transparent pointer-events-none" />
        
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mx-auto max-w-4xl space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="px-4 py-1.5 text-base border-indigo-200/60 bg-indigo-50/50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-900/20 dark:text-indigo-300 backdrop-blur-sm shadow-sm">
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
            <Button size="lg" className="h-14 px-8 text-base bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
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

      {/* Projects Section */}
      <AboutSection id="projects">
         <SectionTitle title="Featured Projects" subtitle="Highlights of my engineering work." />
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="grid grid-cols-1 md:grid-cols-2 gap-8"
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

      {/* Experience Section */}
      <AboutSection>
        <SectionTitle title="Professional Journey" subtitle="My path from Quality Assurance to Fullstack Development." />
        <div className="max-w-4xl mx-auto">
           <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 space-y-12">
             {experience.map((exp, index) => (
               <motion.div 
                 key={exp.id} 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="pl-8 md:pl-12 relative"
               >
                 {/* Timeline dot */}
                 <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-950 bg-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-900/20" />
                 
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
          className="bg-indigo-600 dark:bg-indigo-900/40 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative shadow-2xl shadow-indigo-900/20"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Let's Build Something Amazing</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button 
                 size="lg" 
                 className="h-14 px-8 bg-white text-indigo-600 hover:bg-indigo-50 dark:bg-white dark:text-indigo-900 border-0 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                 onClick={() => window.open(hero.social.email)}
               >
                 <Mail className="mr-2 h-5 w-5" /> Say Hello
               </Button>
               <Button 
                 size="lg" 
                 variant="outline" 
                 className="h-14 px-8 border-indigo-300 dark:border-indigo-400 text-white hover:bg-white/10 dark:hover:bg-white/5 bg-transparent text-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1"
                 onClick={() => window.open(hero.social.linkedin, '_blank')}
               >
                 <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
               </Button>
               <Button 
                 size="lg" 
                 variant="outline" 
                 className="h-14 px-8 border-indigo-300 dark:border-indigo-400 text-white hover:bg-white/10 dark:hover:bg-white/5 bg-transparent text-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1"
                 onClick={() => window.open(hero.social.github, '_blank')}
               >
                 <Github className="mr-2 h-5 w-5" /> GitHub
               </Button>
            </div>
          </div>
        </motion.div>
      </AboutSection>
    </div>
  );
}
