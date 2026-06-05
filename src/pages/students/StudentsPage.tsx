import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

type StudentStatus = 'New' | 'Awaiting assignment' | 'Assigned' | 'Follow-up' | 'Application started'

type StudentLead = {
  assignedAdvisor?: string
  budget: string
  destination: string
  email?: string
  fullName: string
  id: string
  intake: string
  lastActivity: string
  phone?: string
  programInterest: string
  source: 'Telegram' | 'Manual'
  status: StudentStatus
}

const studentLeads: StudentLead[] = [
  {
    assignedAdvisor: 'Amina Yusuf',
    budget: '$18k - $24k',
    destination: 'Canada',
    email: 'chinedu@example.com',
    fullName: 'Chinedu Nwosu',
    id: 'STU-1048',
    intake: 'Fall 2026',
    lastActivity: '18 min ago',
    phone: '+234 803 455 0192',
    programInterest: 'Business Analytics',
    source: 'Telegram',
    status: 'Assigned',
  },
  {
    budget: '$12k - $18k',
    destination: 'United Kingdom',
    email: 'sofia@example.com',
    fullName: 'Sofia Ahmed',
    id: 'STU-1047',
    intake: 'Spring 2027',
    lastActivity: '42 min ago',
    phone: '+234 802 118 3314',
    programInterest: 'Public Health',
    source: 'Telegram',
    status: 'Awaiting assignment',
  },
  {
    assignedAdvisor: 'Daniel Okafor',
    budget: '$20k - $30k',
    destination: 'Australia',
    email: 'emeka@example.com',
    fullName: 'Emeka Ibe',
    id: 'STU-1046',
    intake: 'Fall 2026',
    lastActivity: '1 hr ago',
    phone: '+234 701 904 8821',
    programInterest: 'Computer Science',
    source: 'Manual',
    status: 'Application started',
  },
  {
    assignedAdvisor: 'Maya Chen',
    budget: '$10k - $16k',
    destination: 'Canada',
    email: 'grace@example.com',
    fullName: 'Grace Okorie',
    id: 'STU-1045',
    intake: 'Winter 2027',
    lastActivity: '2 hrs ago',
    phone: '+234 809 441 7620',
    programInterest: 'Nursing',
    source: 'Telegram',
    status: 'Follow-up',
  },
  {
    budget: '$15k - $22k',
    destination: 'United States',
    email: 'malik@example.com',
    fullName: 'Malik Bello',
    id: 'STU-1044',
    intake: 'Fall 2026',
    lastActivity: '3 hrs ago',
    phone: '+234 806 771 2901',
    programInterest: 'Data Science',
    source: 'Telegram',
    status: 'New',
  },
  {
    assignedAdvisor: 'Amina Yusuf',
    budget: '$9k - $14k',
    destination: 'Germany',
    email: 'tara@example.com',
    fullName: 'Tara Mensah',
    id: 'STU-1043',
    intake: 'Summer 2027',
    lastActivity: 'Yesterday',
    phone: '+233 55 128 7719',
    programInterest: 'Mechanical Engineering',
    source: 'Manual',
    status: 'Assigned',
  },
]

const statusTone: Record<StudentStatus, 'brand' | 'neutral' | 'success' | 'warning' | 'error'> = {
  'Application started': 'success',
  'Assigned': 'brand',
  'Awaiting assignment': 'warning',
  'Follow-up': 'error',
  'New': 'neutral',
}

const leadStats = [
  { label: 'Total leads', value: '248', note: '+18 this week', tone: 'brand' },
  { label: 'New today', value: '16', note: '12 from Telegram', tone: 'success' },
  { label: 'Awaiting advisor', value: '27', note: 'Needs assignment', tone: 'warning' },
  { label: 'Follow-up due', value: '18', note: 'High priority', tone: 'error' },
] as const

const StudentsPage = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Operations</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">
              Students / Leads
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Review student leads collected from Telegram and manual entry, then prioritize advisor assignment and follow-up work.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<SlidersHorizontal size={17} />} size="md" variant="secondary">
              Saved views
            </Button>
            <Button leftIcon={<Plus size={17} />} size="md">
              Add student
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {leadStats.map((stat) => (
            <Card className="p-5" key={stat.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-normal text-[#111827]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#6B7280]">{stat.note}</p>
                </div>
                <Badge tone={stat.tone}>{stat.label.split(' ')[0]}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-0">
          <div className="border-b border-[#E5E7EB] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Lead workspace</h2>
                <p className="mt-1 text-sm text-[#6B7280]">Search, filter, sort, and open student records.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Filter size={17} />} size="md" variant="secondary">
                  More filters
                </Button>
                <Button leftIcon={<ArrowDownUp size={17} />} size="md" variant="secondary">
                  Latest activity
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_200px]">
              <Input
                className="h-11 bg-[#F9FAFB]"
                id="student-search"
                leftIcon={<Search size={18} />}
                placeholder="Search name, email, phone, country, or program"
                type="search"
              />

              <label className="sr-only" htmlFor="destination-filter">
                Destination country
              </label>
              <select
                className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                id="destination-filter"
              >
                <option>All destinations</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Australia</option>
                <option>Germany</option>
              </select>

              <label className="sr-only" htmlFor="status-filter">
                Lead status
              </label>
              <select
                className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                id="status-filter"
              >
                <option>All statuses</option>
                <option>New</option>
                <option>Awaiting assignment</option>
                <option>Assigned</option>
                <option>Follow-up</option>
                <option>Application started</option>
              </select>

              <label className="sr-only" htmlFor="advisor-filter">
                Assigned advisor
              </label>
              <select
                className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                id="advisor-filter"
              >
                <option>All advisors</option>
                <option>Unassigned</option>
                <option>Amina Yusuf</option>
                <option>Daniel Okafor</option>
                <option>Maya Chen</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                  <th className="px-6 py-3">Student name</th>
                  <th className="px-6 py-3">Destination</th>
                  <th className="px-6 py-3">Program interest</th>
                  <th className="px-6 py-3">Budget</th>
                  <th className="px-6 py-3">Intake</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Assigned advisor</th>
                  <th className="px-6 py-3">Last activity</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {studentLeads.map((student) => (
                  <tr className="transition hover:bg-[#F9FAFB]" key={student.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                          {student.fullName
                            .split(' ')
                            .map((name) => name[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-[#111827]">{student.fullName}</p>
                            <Badge className="h-6 px-2" tone={student.source === 'Telegram' ? 'brand' : 'neutral'}>
                              {student.source}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#6B7280]">
                            {student.email ? (
                              <span className="inline-flex items-center gap-1">
                                <Mail size={13} />
                                {student.email}
                              </span>
                            ) : null}
                            {student.phone ? (
                              <span className="inline-flex items-center gap-1">
                                <Phone size={13} />
                                {student.phone}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#111827]">{student.destination}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{student.programInterest}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{student.budget}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{student.intake}</td>
                    <td className="px-6 py-4">
                      <Badge tone={statusTone[student.status]}>{student.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      {student.assignedAdvisor ? (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#111827]">
                          <UserRoundCheck size={16} className="text-[#045A58]" />
                          {student.assignedAdvisor}
                        </span>
                      ) : (
                        <Badge tone="warning">Unassigned</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{student.lastActivity}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-transparent bg-transparent px-3 text-sm font-semibold text-[#045A58] outline-none transition hover:bg-[#E6F4F3] hover:text-[#034A48] focus:ring-4 focus:ring-[#E6F4F3]"
                        to={`/students/${student.id}`}
                      >
                        <Eye size={16} />
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Users size={16} />
              Showing <span className="font-semibold text-[#111827]">1-6</span> of{' '}
              <span className="font-semibold text-[#111827]">248</span> leads
            </div>
            <div className="flex items-center gap-2">
              <Button leftIcon={<ChevronLeft size={16} />} size="sm" variant="secondary">
                Previous
              </Button>
              <Button rightIcon={<ChevronRight size={16} />} size="sm" variant="secondary">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

export default StudentsPage
