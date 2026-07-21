import { nationalServices } from './services/national'
import { welfareServices } from './services/welfare'
import { employmentServices } from './services/employment'
import { karnatakaServices } from './services/karnataka'
import { documentServices } from './services/documents'
import { techServices } from './services/tech'

export interface Service {
  id: number
  name: string
  url: string
  category: string
  description?: string
}

export const CATEGORIES = [
  'National Government Services',
  'Welfare & Health',
  'Employment & Commerce',
  'Karnataka State Services',
  'Document & PDF Utilities',
  'Career & Tech Tools',
] as const

export const services: Service[] = [
  ...nationalServices,
  ...welfareServices,
  ...employmentServices,
  ...karnatakaServices,
  ...documentServices,
  ...techServices,
]
