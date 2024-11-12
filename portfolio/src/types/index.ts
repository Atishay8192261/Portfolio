export interface Experience {
    year: string
    title: string
    company: string
    description: string
  }
  
  export interface SocialLink {
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram'
    username: string
    url: string
  }
  
  export interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void;
  }