import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  about: {
    name: "Mohammad Talha Shaikh",
    title: "Full Stack Developer | AI Expert",
    bio: "Specialize in building fast, user-centric web apps with AI integration and Chrome extensions that solve real problems. From backend logic to frontend polish, I bring ideas to life with clean code and smart design.",
    contact: {
      email: "stalha423@gmail.com",
      github: "https://github.com/TalhaShaikhcodes",
      linkedin: "https://www.linkedin.com/in/talha-shaikh-62a7791b4/",
    }
  },
  projects: [
    {
      id: "project-1",
      title: "Amazon P&L Simplifier Tool",
      description: "A frontend-only web tool (in progress) designed to help Amazon sellers simplify their profit & loss tracking. Users can upload CSV reports. The app processes and visualizes this data into SKU-wise insights, cost breakdowns, and summary calculations.",
      technologies: ["React", "Tailwind CSS", "(Planned: Node.js", "Express", "Supabase)"],
      category: "web",
      featured: true,
      githubUrl: "https://github.com/TalhaShaikhcodes/amazon-pnl-tool"
    },
    {
      id: "project-2", 
      title: "MVP Forge – Personal Developer Agency Site",
      description: "A sleek, high-performance landing page built for my personal developer agency, MVP Forge. The site showcases my services, features a modern responsive UI with a custom animated navbar, and includes Cal.com integration for seamless meeting bookings. Designed for clarity, speed, and conversion.",
      technologies: ["Vite", "TypeScript", "React", "Tailwind CSS", "Cal.com API"],
      category: "web",
      featured: true,
      executable: "mvp_forge.exe",
      demoUrl: "https://mvp-forge.com",
      githubUrl: "https://github.com/TalhaShaikhcodes/MVP-Forge"
    },
    {
      id: "project-3",
      title: "TabMap - Chrome Extension",
      description: "TabMap is a Chrome extension that visualizes your browsing journey as a glowing mind map. It tracks tab-to-tab navigation in real time and displays it using an interactive graph with favicons, glowing directional arrows, and navigation counts. Perfect for visual thinkers, researchers, and productivity nerds.",
      technologies: ["JavaScript", "D3.js", "Chrome Extensions API", "HTML/CSS"],
      category: "chrome extension",
      featured: false,
      demoUrl: "https://chromewebstore.google.com/detail/kopdmafgnkedogkgfhpgjdhbgdmjmpco?utm_source=item-share-cb"
    }
  ],
  skills: [
    { id: "java", name: "Java", category: "languages", level: 95 },
    { id: "js", name: "JavaScript", category: "languages", level: 90 },
    { id: "js", name: "HTML/CSS/JS", category: "frontend", level: 95 },
    { id: "ts", name: "TypeScript", category: "languages", level: 90 },
    { id: "python", name: "Python", category: "languages", level: 85 },
    { id: "nextjs", name: "Next.js", category: "frontend", level: 90 },
    { id: "react", name: "React", category: "frontend", level: 95 },
    { id: "bootstrap", name: "Bootstrap", category: "frontend", level: 90 },
    { id: "node", name: "Node.js", category: "backend", level: 85 },
    { id: "express", name: "Express.js", category: "backend", level: 85 },
    { id: "fastapi", name: "Python FastAPI", category: "backend", level: 85 },
    { id: "springboot", name: "Spring Boot", category: "backend", level: 80 },
    { id: "git", name: "Git", category: "tools", level: 90 },
    { id: "n8n", name: "n8n Automation", category: "tools", level: 90 },
    { id: "ai-tools", name: "AI Tools", category: "tools", level: 95 }
  ],
  education: [
    {
      id: "college",
      type: "college",
      institution: "Sinhgad Institute of Technology & Science",
      course: "B.E. in IT",
      location: "Pune"
    },
    {
      id: "school",
      type: "school", 
      institution: "St.Joseph's Convent School",
      percentage: "10th: 94.4%  12th: 80%",
      subjects: "PCM",
      location: "Jalgaon"
    }
  ]
};