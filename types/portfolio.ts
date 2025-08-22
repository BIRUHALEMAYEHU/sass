export interface Project {
  id: string
  title: string
  link: string
}

export interface PortfolioData {
  name: string
  about: string
  skills: string
  projects: Project[]
  contact: string
  template: number
}
