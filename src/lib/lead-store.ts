import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

export type StoredLead = {
  id: number
  company: string
  contact: string
  phone: string
  industry: string
  demand: string
  source: string
  page: string
  submittedAt: string
  status: '待跟进' | '沟通中' | '已联系' | '已成交'
  note: string
}

const dataDirectory = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDirectory, 'form-submissions.json')

async function ensureFile() {
  await mkdir(dataDirectory, { recursive: true })
  try {
    await readFile(dataFile, 'utf8')
  } catch {
    await writeFile(dataFile, '[]', 'utf8')
  }
}

export async function readLeads(): Promise<StoredLead[]> {
  await ensureFile()
  try {
    const data = JSON.parse(await readFile(dataFile, 'utf8'))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function createLead(input: Omit<StoredLead, 'id' | 'submittedAt' | 'status' | 'note'>) {
  const leads = await readLeads()
  const lead: StoredLead = {
    ...input,
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    status: '待跟进',
    note: '',
  }
  leads.unshift(lead)
  await writeFile(dataFile, JSON.stringify(leads, null, 2), 'utf8')
  return lead
}

export async function updateLead(id: number, updates: Partial<Pick<StoredLead, 'status' | 'note'>>) {
  const leads = await readLeads()
  const index = leads.findIndex((lead) => lead.id === id)
  if (index < 0) return null
  leads[index] = { ...leads[index], ...updates }
  await writeFile(dataFile, JSON.stringify(leads, null, 2), 'utf8')
  return leads[index]
}
