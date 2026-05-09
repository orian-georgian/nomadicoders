import type { TeamMemberProfileData } from "@/features/team/types/profile";

export const teamMembers: TeamMemberProfileData[] = [
  {
    slug: "georgian",
    name: "Georgian",
    imageSrc: "/images/georgian.jfif",
    role: "Senior Frontend Engineer",
    tagline:
      "Design-minded frontend engineer focused on product quality and smooth UX.",
    intro:
      "I build modern, resilient frontend applications with a strong focus on usability, maintainability, and delivery speed.",
    principles: [
      "Build for clarity first, then optimize.",
      "Treat accessibility and performance as defaults.",
      "Keep UI systems consistent and reusable.",
    ],
    expertise: [
      {
        title: "Frontend Architecture",
        description:
          "Design and implement scalable, maintainable component systems",
        tech: ["React", "Next.js", "TypeScript"],
      },
      {
        title: "Performance & UX",
        description:
          "Optimize applications for speed and deliver smooth user experiences",
        tech: ["Web Performance", "Accessibility", "Design Systems"],
      },
      {
        title: "Product Polish",
        description:
          "Attention to detail in interfaces, animations, and user interactions",
        tech: ["Framer Motion", "Tailwind CSS", "UI/UX Principles"],
      },
    ],
    experienceTimeline: [
      {
        period: "Sep 2023 - Jul 2024",
        title: "Senior Frontend Developer / Frontend Architect",
        company: "Fujitsu",
        employmentType: "Contract",
        duration: "11 mos",
        location: "Machelen, Belgium · Remote",
        project: "BWX - Water Exchange Trade Platform",
        description:
          "As a Senior Frontend Developer on the BWX application, I was brought on board to address critical performance and security issues in a complex trading platform. Leveraging 11 years of frontend development experience, I played a pivotal role in optimizing application performance, enhancing security, and improving code quality and team processes. The work significantly improved the user experience and established a stronger foundation for ongoing development and maintenance.",
        achievementSections: [
          {
            title: "Optimized Performance",
            items: [
              "Reduced initial app load time by over 90% through strategic code and resource optimizations.",
              "Eliminated circular dependencies between micro-frontends.",
              "Replaced Material UI with Tailwind CSS, leveraging purging capabilities to optimize CSS performance.",
              "Cleaned up state management by retaining only essential data and refactoring local code to reduce memory usage.",
            ],
          },
          {
            title: "Enhanced Security",
            items: [
              "Improved application security by moving Redis storage behind the API, mitigating direct access risks.",
            ],
          },
          {
            title: "Dependency Management",
            items: [
              "Minimized third-party dependencies to create a more stable and maintainable codebase.",
            ],
          },
          {
            title: "Team Processes and Quality Improvement",
            items: [
              "Established and enforced coding standards and a clear Definition of Done.",
              "Implemented a rigorous code review process to enhance code quality and team collaboration.",
            ],
          },
        ],
        impact: [
          "Reduced initial load time by over 90%",
          "Improved platform security and frontend maintainability",
          "Established stronger engineering standards and review practices",
        ],
        skills: [
          "React.js",
          "MobX",
          "Tailwind CSS",
          "Micro-frontends",
          "Frontend Architecture",
          "Performance Optimization",
          "Security Improvements",
          "Code Review",
          "State Management",
          "Dependency Management",
          "Material UI",
          "TypeScript",
          "API Integration",
          "Redis",
          "Trading Platforms",
          "Definition of Done",
          "Refactoring",
          "Team Processes",
        ],
      },
      {
        period: "2019 - 2022",
        title: "Frontend Engineer",
        company: "Product & Agency Teams",
        employmentType: "Full-time",
        duration: "3 yrs",
        location: "Remote",
        impact: [
          "Built responsive platforms serving 100K+ concurrent users",
          "Implemented design systems that reduced component development time by 40%",
          "Improved Core Web Vitals scores, increasing conversion rates by 18%",
        ],
        skills: [
          "React",
          "TypeScript",
          "Responsive UI",
          "Design Systems",
          "Core Web Vitals",
          "Performance Optimization",
        ],
      },
      {
        period: "2017 - 2019",
        title: "UI Developer",
        company: "Digital Agency",
        employmentType: "Full-time",
        duration: "2 yrs",
        location: "Remote",
        impact: [
          "Delivered 25+ client projects with pixel-perfect UI implementations",
          "Established component library standards adopted across 4 teams",
          "Reduced page load times by 48% through performance optimization",
        ],
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "Component Libraries",
          "Cross-browser Compatibility",
          "Web Performance",
        ],
      },
      {
        period: "2016 - 2017",
        title: "Frontend Specialist",
        company: "Startup (Series A)",
        employmentType: "Full-time",
        duration: "1 yr",
        location: "Remote",
        impact: [
          "Built interactive dashboards processing real-time data visualization",
          "Implemented accessibility features achieving WCAG 2.1 AA compliance",
          "Led frontend migration from jQuery to React, improving code maintainability",
        ],
        skills: [
          "React",
          "jQuery Migration",
          "Data Visualization",
          "Accessibility",
          "WCAG",
          "Dashboard UI",
        ],
      },
      {
        period: "2015 - 2016",
        title: "Junior Frontend Developer",
        company: "Web Development Studio",
        employmentType: "Full-time",
        duration: "1 yr",
        location: "Remote",
        impact: [
          "Contributed to 15+ client websites and web applications",
          "Mastered responsive design principles and cross-browser compatibility",
          "Built custom jQuery plugins for interactive components",
        ],
        skills: [
          "JavaScript",
          "jQuery",
          "HTML",
          "CSS",
          "Responsive Design",
          "Interactive UI",
        ],
      },
    ],
    education: [
      {
        period: "2015 - 2019",
        degree: "BSc in Computer Science",
        institution: "Technical University",
        details:
          "Focused on software engineering fundamentals and web technologies.",
      },
      {
        period: "2021",
        degree: "Advanced Frontend Architecture Certification",
        institution: "Frontend Masters",
        details:
          "Expanded practical knowledge in scalable React architecture, performance, and maintainable UI systems.",
      },
    ],
    finalCta: {
      title: "Need a frontend that feels premium and scales cleanly?",
      description:
        "Let us turn your product direction into a fast, reliable experience users trust.",
      actionLabel: "Start a project",
      actionHref: "/#contact",
    },
  },
  {
    slug: "andreea",
    name: "Andreea Orian",
    imageSrc: "/images/andreea.jfif",
    role: "Senior Full-Stack Engineer",
    tagline:
      "Full-stack engineer shaping scalable systems with practical product thinking.",
    intro:
      "I help teams move faster by designing robust architectures, implementing reliable backend services, and connecting them to polished frontend experiences.",
    principles: [
      "Design for long-term maintainability.",
      "Prefer simplicity over accidental complexity.",
      "Measure and improve continuously.",
    ],
    expertise: [
      {
        title: "Backend Systems",
        description:
          "Build reliable, scalable APIs and microservices architecture",
        tech: ["Node.js", ".NET", "TypeScript"],
      },
      {
        title: "Cloud Infrastructure",
        description:
          "Design and deploy production systems across cloud providers",
        tech: ["AWS", "Azure", "Docker"],
      },
      {
        title: "Database Design",
        description:
          "Optimize data storage and query performance for high-scale applications",
        tech: ["MySQL", "MongoDB", "System Architecture"],
      },
    ],
    experienceTimeline: [
      {
        period: "2022 - Present",
        title: "Senior Full-Stack Engineer",
        company: "Nomadicoders",
        employmentType: "Founder / Partner",
        duration: "Present",
        location: "Remote",
        impact: [
          "Designed cloud architectures supporting 10M+ monthly API requests",
          "Reduced infrastructure costs by 45% through optimization and auto-scaling",
          "Led migration from monolith to microservices, enabling 3x faster feature delivery",
        ],
        skills: [
          "Node.js",
          ".NET",
          "TypeScript",
          "AWS",
          "Azure",
          "Docker",
          "Microservices",
          "Cloud Architecture",
        ],
      },
      {
        period: "2018 - 2022",
        title: "Full-Stack Engineer",
        company: "SaaS & Enterprise Teams",
        employmentType: "Full-time",
        duration: "4 yrs",
        location: "Remote",
        impact: [
          "Scaled database performance to handle 50x growth without downtime",
          "Implemented real-time analytics pipeline processing 1M+ events daily",
          "Built CI/CD pipelines reducing deployment time from 45min to 5min",
        ],
        skills: [
          "Node.js",
          "TypeScript",
          "Database Optimization",
          "Real-time Analytics",
          "CI/CD",
          "SaaS Architecture",
        ],
      },
      {
        period: "2016 - 2018",
        title: "Backend Engineer",
        company: "E-commerce Platform",
        employmentType: "Full-time",
        duration: "2 yrs",
        location: "Remote",
        impact: [
          "Designed RESTful APIs handling 5M+ daily transactions",
          "Implemented database sharding strategy improving query performance by 60%",
          "Built payment processing system handling $10M+ annual volume",
        ],
        skills: [
          "REST APIs",
          "Database Sharding",
          "Payment Systems",
          "Backend Architecture",
          "Performance Tuning",
          "Security",
        ],
      },
      {
        period: "2015 - 2016",
        title: "Full-Stack Developer",
        company: "Consulting Firm",
        employmentType: "Full-time",
        duration: "1 yr",
        location: "Remote",
        impact: [
          "Delivered 8 custom web applications for enterprise clients",
          "Automated deployment process reducing release time by 70%",
          "Mentored 3 junior developers on backend best practices",
        ],
        skills: [
          "Full-stack Development",
          "Deployment Automation",
          "Enterprise Apps",
          "Mentoring",
          "Backend Best Practices",
          "API Development",
        ],
      },
      {
        period: "2014 - 2015",
        title: "Junior Backend Developer",
        company: "Tech Startup",
        employmentType: "Full-time",
        duration: "1 yr",
        location: "Remote",
        impact: [
          "Built initial backend infrastructure for growth-stage product",
          "Implemented authentication and authorization systems",
          "Contributed to 20+ API endpoints serving mobile and web clients",
        ],
        skills: [
          "Backend Infrastructure",
          "Authentication",
          "Authorization",
          "API Endpoints",
          "Mobile APIs",
          "Web APIs",
        ],
      },
    ],
    education: [
      {
        period: "2014 - 2018",
        degree: "BSc in Software Engineering",
        institution: "University of Technology",
        details:
          "Specialized in distributed systems and application architecture.",
      },
      {
        period: "2020",
        degree: "Cloud Architecture Specialization",
        institution: "AWS Training and Certification",
        details:
          "Deepened expertise in cloud-native infrastructure, scalable services, and production system reliability.",
      },
    ],
    finalCta: {
      title: "Need a system that can grow with your product?",
      description:
        "We build backend and frontend foundations that support fast iteration without sacrificing reliability.",
      actionLabel: "Book a discovery call",
      actionHref: "/#contact",
    },
  },
];

export function getTeamMemberBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  return teamMembers.find(
    (member) => member.slug.toLowerCase() === normalizedSlug,
  );
}
