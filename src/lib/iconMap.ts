import { 
  Zap, 
  TrendingUp, 
  Target, 
  Shield, 
  BarChart3, 
  Settings, 
  Award, 
  Users, 
  Globe, 
  Smartphone, 
  Lock, 
  Rocket 
} from "lucide-react"

export const iconMap = {
  Zap,
  TrendingUp,
  Target,
  Shield,
  BarChart3,
  Settings,
  Award,
  Users,
  Globe,
  Smartphone,
  Lock,
  Rocket,
} as const

export type IconName = keyof typeof iconMap

export function getIcon(iconName: string) {
  return iconMap[iconName as IconName] || Award // Default fallback icon
}