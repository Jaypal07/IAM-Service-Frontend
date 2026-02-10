
import {
    Code2,
    Database,
    Globe,
    Server,
    Terminal,
    ShieldCheck,
    Cpu,
} from "lucide-react";

export const ABOUT_DATA = {
    hero: {
        name: "Jaypal Koli",
        title: "Java Full Stack Engineer",
        summary: "Backend-focused Engineer utilizing a failure-first approach to build scalable, secure, and production-grade systems. Specialized in Spring Boot, React, and Identity & Access Management (IAM).",
        social: {
            github: "https://github.com/Jaypal07",
            linkedin: "https://www.linkedin.com/in/jaypal-koli",
            email: "mailto:kolijaypal77@gmail.com",
            phone: "+91 9172230125"
        }
    },
    skills: [
        {
            category: "Backend Engineering",
            icon: Server,
            items: ["Java", "Spring Boot", "Spring Security", "Microservices", "RESTful APIs", "AOP", "Transaction Management", "PostgreSQL", "Redis", "System Design"]
        },
        {
            category: "Identity & Security",
            icon: ShieldCheck,
            items: ["OAuth 2.0", "OIDC", "JWT Implementation", "RBAC", "Refresh Token Rotation", "Cryptographic Hashing", "Top 10 OWASP", "Audit Logging"]
        },
        {
            category: "Frontend",
            icon: Globe,
            items: ["React.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Vite", "Responsive Design", "Axios"]
        },
        {
            category: "DevOps & Tools",
            icon: Database,
            items: ["Docker", "AWS", "Basic Linux", "CI/CD", "Git/GitHub", "JIRA", "Postman", "JUnit", "Mockito"]
        }
    ],
    experience: [
        {
            id: 1,
            role: "Associate Engineer",
            company: "Jio Platforms Limited (JPL)",
            period: "Sep 2024 - Present",
            description: "Testing backend microservices with a strong focus on API correctness, edge cases, and failure scenarios. validating REST API endpoints for the JioAICloud platform and reporting detailed defect analysis to improve system robustness."
        },
        {
            id: 2,
            role: "Graduate Engineering Trainee",
            company: "Jio Platforms Limited (JPL)",
            period: "Jan 2024 - Aug 2024",
            description: "Supported QA activities including functional testing, regression testing, and test case execution within Agile teams. Validated features before release, focusing on user experience and application stability."
        },
        {
            id: 3,
            role: "Placement Coordinator",
            company: "R. C. Patel Institute of Technology",
            period: "Aug 2022 - July 2023",
            description: "Coordinated placement activities, managing communication between the institute and recruiting companies."
        },
        {
            id: 4,
            role: "Web Developer",
            company: "Sumago Infotech Pvt. Ltd.",
            period: "Jan 2022 - Mar 2022",
            description: "Developed and maintained web applications, gaining hands-on experience in frontend technologies and web development lifecycles."
        }
    ],
    projects: [
        {
            id: "iam-service",
            title: "Scalable IAM Service",
            description: "A production-grade Identity & Access Management system featuring stateless JWT security, OAuth2 (Google/GitHub), refresh token rotation, and audit logging.",
            tags: ["Spring Boot", "Spring Security", "OAuth2", "PostgreSQL", "Docker"],
            link: "https://github.com/Jaypal07/IAM-Service"
        },
        {
            id: "iam-service-frontend",
            title: "IAM Service Frontend",
            description: "Modern, secure React frontend for the IAM system. Features split-screen auth layouts, dashboard visualization, and seamless OAuth2 integration.",
            tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Axios"],
            link: "https://github.com/Jaypal07/IAM-Service-Frontend"
        },
        {
            id: "order-management",
            title: "Order Management System",
            description: "Standard order processing system demonstrating clean architecture and solid database design principles. Handles complex data relationships.",
            tags: ["Java", "Spring Boot", "JPA", "MySQL", "REST API"],
            link: "https://github.com/Jaypal07/OrderManagementSytem"
        }
    ],
    values: [
        {
            title: "Failure-First Design",
            description: "Designing systems by anticipating edge cases, abuse scenarios, and failure modes rather than just happy paths.",
            icon: Terminal
        },
        {
            title: "Security By Default",
            description: "Implementing strict validation, sanitization, and least-privilege access controls at the core of the application.",
            icon: ShieldCheck
        },
        {
            title: "Clean Architecture",
            description: "Building maintainable, testable systems using SOLID principles and keeping domain logic pure.",
            icon: Code2
        },
        {
            title: "Testing Mindset",
            description: "Ensuring reliability through comprehensive validation of API correctness and data integrity.",
            icon: Cpu
        }
    ],
    education: [
        {
            degree: "Bachelor of Engineering (Computer Science)",
            institution: "R. C. Patel Institute of Technology, Shirpur",
            year: "June 2023"
        }
    ],
    certifications: [
        "Java Programming",
        "Introduction to Software Engineering",
        "Git and GitHub Fundamentals",
        "Java: Testing with JUnit",
        "Postman Essential Training",
        "JPMorgan Software Engineering Virtual Experience"
    ]
};
