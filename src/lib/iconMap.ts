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
  Rocket,
  Code,
  Palette,
  Search,
  Monitor,
  Database,
  Cloud
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
  Code,
  Palette,
  Search,
  Monitor,
  Database,
  Cloud,
} as const

export type IconName = keyof typeof iconMap

export function getIcon(iconName: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  if (!iconName || typeof iconName !== 'string') {
    console.warn(`Invalid icon name provided: ${iconName}. Using fallback icon.`)
    return Award
  }
  
  const icon = iconMap[iconName as IconName]
  if (!icon) {
    console.warn(`Icon "${iconName}" not found in iconMap. Available icons: ${Object.keys(iconMap).join(', ')}. Using fallback icon.`)
    return Award
  }
  
  return icon
}