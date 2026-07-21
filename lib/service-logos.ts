import { 
  FileText, Building, Wallet, Heart, Briefcase, Shield, Train, 
  GraduationCap, Users, MapPin, Leaf, Search, Globe, Code, 
  Camera, Music, Download, Settings, HelpCircle, CheckCircle,
  Zap, Percent, Rocket, Clock, Bell, BarChart, Lock, LogIn,
  PhoneCall, Mail, Smartphone, Lightbulb, Award, TrendingUp,
  ShoppingCart
} from 'lucide-react'

export type ServiceIcon = React.ComponentType<{ className?: string }>

export const SERVICE_ICONS: Record<string, ServiceIcon> = {
  // National Government Services
  'Aadhaar': Wallet,
  'PAN Card': FileText,
  'Voter ID': CheckCircle,
  'Passport': Lock,
  'Birth & Death Registration': FileText,
  'DigiLocker': Lock,
  'UMANG': Globe,
  'National Government Services': Building,
  'Driving Licence': Award,
  'Vehicle Registration': Smartphone,
  'Family ID': Users,
  'Caste Certificate': FileText,
  'Domicile': MapPin,
  'Income Certificate': Wallet,

  // Welfare & Health
  'PM Kisan Samman Nidhi': Leaf,
  'PM Kisan': Leaf,
  'Ayushman Bharat': Heart,
  'e-Shram': Briefcase,
  'Pension Services': TrendingUp,
  'National Food Security': ShoppingCart,
  'Life Certificate': CheckCircle,
  'EPFO': BarChart,
  'ESIC': Shield,

  // Employment & Services
  'National Career Service': Search,
  'Income Tax': Percent,
  'GST': Percent,
  'UDYAM': Rocket,
  'FSSAI': Smartphone,
  'Police': Shield,
  'Indian Railways': Train,
  'Railways': Train,
  'LPG': Zap,

  // Creative & Utility Tools
  'Video': Camera,
  'Design': Lightbulb,
  'Image': Download,
  'Editor': FileText,
}

export const HELPLINE_LOGOS: Record<string, ServiceIcon> = {
  'Farmers Support': Leaf,
  'Senior Citizens': Heart,
  'Student Schemes': GraduationCap,
  'Women & Child': Users,
  'Health Services': Heart,
  'Police Helpline': Shield,
  'Indian Railways': Train,
  'Employment': Briefcase,
  'default': Lightbulb,
}

export function getServiceIcon(serviceName: string): ServiceIcon {
  if (!serviceName) return Lightbulb
  
  // Exact match
  if (SERVICE_ICONS[serviceName]) {
    return SERVICE_ICONS[serviceName]
  }
  
  // Partial match
  const lowerName = serviceName.toLowerCase()
  for (const [key, icon] of Object.entries(SERVICE_ICONS)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return icon
    }
  }
  
  // Fallback to default icon
  return Lightbulb
}

export function getServiceLogo(serviceName: string): string {
  // This function is kept for backwards compatibility but now returns a placeholder
  return ''
}
