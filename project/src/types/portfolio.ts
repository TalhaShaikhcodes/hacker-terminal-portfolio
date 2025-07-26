export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
}

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  contact: ContactData;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  executable?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillData {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface EducationData {
  id: string;
  type: 'college' | 'school';
  institution: string;
  course?: string;
  percentage?: string;
  subjects?: string;
  location: string;
}

export interface PortfolioData {
  about: AboutData;
  projects: ProjectData[];
  skills: SkillData[];
  education: EducationData[];
}