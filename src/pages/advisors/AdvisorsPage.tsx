import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  SlidersHorizontal,
  UserRoundCheck,
  Users,
  UsersRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

type Availability = 'Available' | 'Limited' | 'Unavailable'
type WorkloadState = 'Balanced' | 'Near capacity' | 'Over capacity'

type Advisor = {
  activeStudents: number
  availability: Availability
  capacity: number
  email: string
  followUpsDue: number
  fullName: string
  id: string
  lastActive: string
  specializations: string[]
  workloadState: WorkloadState
}

const advisors: Advisor[] = [
  {
    activeStudents: 18,
    availability: 'Available',
    capacity: 25,
    email: 'amina@pikinic.example',
    followUpsDue: 3,
    fullName: 'Amina Yusuf',
    id: 'USR-1001',
    lastActive: 'Today, 8:42 AM',
    specializations: ['Canada', 'Postgraduate', 'Business'],
    workloadState: 'Balanced',
  },
  {
    activeStudents: 23,
    availability: 'Limited',
    capacity: 25,
    email: 'daniel@pikinic.example',
    followUpsDue: 7,
    fullName: 'Daniel Okafor',
    id: 'USR-1002',
    lastActive: 'Today, 9:18 AM',
    specializations: ['United Kingdom', 'STEM', 'Scholarships'],
    workloadState: 'Near capacity',
  },
  {
    activeStudents: 27,
    availability: 'Unavailable',
    capacity: 25,
    email: 'maya@pikinic.example',
    followUpsDue: 9,
    fullName: 'Maya Chen',
    id: 'USR-1003',
    lastActive: 'Yesterday, 4:12 PM',
    specializations: ['Canada', 'Diploma', 'Visa support'],
    workloadState: 'Over capacity',
  },
  {
    activeStudents: 14,
    availability: 'Available',
    capacity: 22,
    email: 'femi@pikinic.example',
    followUpsDue: 2,
    fullName: 'Femi Balogun',
    id: 'USR-1007',
    lastActive: 'Today, 7:55 AM',
    specializations: ['Australia', 'Undergraduate', 'Engineering'],
    workloadState: 'Balanced',
  },
  {
    activeStudents: 20,
    availability: 'Limited',
    capacity: 24,
    email: 'zainab@pikinic.example',
    followUpsDue: 5,
    fullName: 'Zainab Bello',
    id: 'USR-1008',
    lastActive: 'June 8, 2026',
    specializations: ['Germany', 'Masters', 'Technology'],
    workloadState: 'Near capacity',
  },
  {
    activeStudents: 11,
    availability: 'Available',
    capacity: 20,
    email: 'grace@pikinic.example',
    followUpsDue: 1,
    fullName: 'Grace Mensah',
    id: 'USR-1009',
    lastActive: 'Today, 9:02 AM',
    specializations: ['United States', 'MBA', 'Finance'],
    workloadState: 'Balanced',
  },
]

const availabilityTone: Record<Availability, 'error' | 'success' | 'warning'> = {
  Available: 'success',
  Limited: 'warning',
  Unavailable: 'error',
}

const workloadTone: Record<WorkloadState, 'error' | 'success' | 'warning'> = {
  Balanced: 'success',
  'Near capacity': 'warning',
  'Over capacity': 'error',
}

const advisorStats = [
  { icon: UserRoundCheck, label: 'Active advisors', note: 'Available for assignment', value: '9' },
  { icon: Users, label: 'Assigned students', note: 'Across active advisors', value: '156' },
  { icon: CheckCircle2, label: 'Available capacity', note: 'Open student slots', value: '38' },
  { icon: CalendarClock, label: 'Follow-ups due', note: 'Require advisor attention', value: '27' },
] as const

const followUpQueue = [
  { advisor: 'Maya Chen', due: 9, oldest: '2 days overdue', priority: 'High' },
  { advisor: 'Daniel Okafor', due: 7, oldest: 'Due today', priority: 'High' },
  { advisor: 'Zainab Bello', due: 5, oldest: 'Due today', priority: 'Medium' },
  { advisor: 'Amina Yusuf', due: 3, oldest: 'Due tomorrow', priority: 'Normal' },
] as const

const AdvisorsPage = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [availability, setAvailability] = useState('All availability')
  const [workload, setWorkload] = useState('All workloads')

  const filteredAdvisors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return advisors.filter((advisor) => {
      const matchesQuery =
        !normalizedQuery ||
        advisor.fullName.toLowerCase().includes(normalizedQuery) ||
        advisor.email.toLowerCase().includes(normalizedQuery) ||
        advisor.specializations.some((specialization) =>
          specialization.toLowerCase().includes(normalizedQuery),
        )

      return (
        matchesQuery &&
        (availability === 'All availability' || advisor.availability === availability) &&
        (workload === 'All workloads' || advisor.workloadState === workload)
      )
    })
  }, [availability, query, workload])

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Administration</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Advisors</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Monitor advisor workload, availability, specializations, student assignments, and follow-up demand.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              leftIcon={<UsersRound size={17} />}
              onClick={() => navigate('/team')}
              size="md"
              variant="secondary"
            >
              Manage team accounts
            </Button>
            <Button leftIcon={<Users size={17} />} onClick={() => navigate('/students')} size="md">
              Review assignments
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {advisorStats.map((stat) => {
            const Icon = stat.icon

            return (
              <Card className="p-5" key={stat.label}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-normal text-[#111827]">{stat.value}</p>
                    <p className="mt-2 text-xs font-medium text-[#6B7280]">{stat.note}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
                    <Icon size={20} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-0">
          <div className="border-b border-[#E5E7EB] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Advisor workload</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Capacity and availability should be reviewed before assigning new students.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_170px_170px] xl:w-[760px]">
                <Input
                  className="h-11 bg-[#F9FAFB]"
                  id="advisor-search"
                  leftIcon={<Search size={18} />}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search advisor or specialization"
                  type="search"
                  value={query}
                />
                <FilterSelect
                  label="Availability"
                  onChange={setAvailability}
                  options={['All availability', 'Available', 'Limited', 'Unavailable']}
                  value={availability}
                />
                <FilterSelect
                  label="Workload"
                  onChange={setWorkload}
                  options={['All workloads', 'Balanced', 'Near capacity', 'Over capacity']}
                  value={workload}
                />
              </div>
            </div>
          </div>

          {filteredAdvisors.length ? (
            <div className="max-h-[620px] overflow-auto overscroll-contain">
              <table className="w-full min-w-[1120px] text-left">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                    <th className="px-6 py-3">Advisor</th>
                    <th className="px-6 py-3">Availability</th>
                    <th className="px-6 py-3">Workload</th>
                    <th className="px-6 py-3">Specializations</th>
                    <th className="whitespace-nowrap px-6 py-3">Follow-ups</th>
                    <th className="px-6 py-3">Last active</th>
                    <th className="whitespace-nowrap px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredAdvisors.map((advisor) => {
                    const workloadPercentage = Math.min(
                      Math.round((advisor.activeStudents / advisor.capacity) * 100),
                      100,
                    )

                    return (
                      <tr className="transition hover:bg-[#F9FAFB]" key={advisor.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                              {advisor.fullName
                                .split(' ')
                                .map((name) => name[0])
                                .join('')
                                .slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#111827]">{advisor.fullName}</p>
                              <p className="mt-1 text-xs font-medium text-[#6B7280]">{advisor.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge tone={availabilityTone[advisor.availability]}>{advisor.availability}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-44">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-[#111827]">
                                {advisor.activeStudents} / {advisor.capacity}
                              </span>
                              <Badge tone={workloadTone[advisor.workloadState]}>
                                {advisor.workloadState}
                              </Badge>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
                              <div
                                className={`h-full rounded-full ${
                                  advisor.workloadState === 'Over capacity'
                                    ? 'bg-[#DC2626]'
                                    : advisor.workloadState === 'Near capacity'
                                      ? 'bg-[#D97706]'
                                      : 'bg-[#045A58]'
                                }`}
                                style={{ width: `${workloadPercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex max-w-64 flex-wrap gap-1.5">
                            {advisor.specializations.map((specialization) => (
                              <Badge className="h-6 px-2.5" key={specialization} tone="neutral">
                                {specialization}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold ${
                              advisor.followUpsDue >= 7 ? 'text-[#B42318]' : 'text-[#374151]'
                            }`}
                          >
                            <CalendarClock size={16} />
                            {advisor.followUpsDue} due
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
                            <Clock3 size={15} />
                            {advisor.lastActive}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <Button
                            className="w-max whitespace-nowrap"
                            onClick={() => navigate('/students')}
                            size="sm"
                            variant="secondary"
                          >
                            View students
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
                <SlidersHorizontal size={21} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111827]">No advisors match these filters</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Clear the current search, availability, and workload filters to return to the advisor directory.
              </p>
              <Button
                className="mt-5"
                onClick={() => {
                  setQuery('')
                  setAvailability('All availability')
                  setWorkload('All workloads')
                }}
                size="md"
                variant="secondary"
              >
                Clear filters
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-[#6B7280]">
              Showing <span className="font-semibold text-[#111827]">{filteredAdvisors.length}</span> of{' '}
              <span className="font-semibold text-[#111827]">9</span> active advisors
            </p>
            <div className="flex items-center gap-2">
              <Button disabled leftIcon={<ChevronLeft size={16} />} size="sm" variant="secondary">
                Previous
              </Button>
              <Button rightIcon={<ChevronRight size={16} />} size="sm" variant="secondary">
                Next
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="p-0">
            <div className="border-b border-[#E5E7EB] px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Follow-up review</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Advisors with the largest active follow-up queues.</p>
                </div>
                <Badge tone="warning">27 due</Badge>
              </div>
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {followUpQueue.map((item) => (
                <div
                  className="grid gap-3 px-6 py-4 sm:grid-cols-[1fr_90px_140px_90px] sm:items-center"
                  key={item.advisor}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#045A58]">
                      <UserRoundCheck size={17} />
                    </div>
                    <span className="text-sm font-semibold text-[#111827]">{item.advisor}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#111827]">{item.due} due</span>
                  <span className="text-sm text-[#6B7280]">{item.oldest}</span>
                  <Badge tone={item.priority === 'High' ? 'error' : item.priority === 'Medium' ? 'warning' : 'neutral'}>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] text-[#B42318]">
                <AlertCircle size={19} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Capacity attention</h2>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                  One advisor is over capacity and two are close to their assignment limits.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <CapacityItem label="Over capacity" tone="error" value="1 advisor" />
              <CapacityItem label="Near capacity" tone="warning" value="2 advisors" />
              <CapacityItem label="Available" tone="success" value="3 shown" />
            </div>

            <Button
              className="mt-6 w-full"
              onClick={() => navigate('/students')}
              size="md"
              variant="secondary"
            >
              Review student assignments
            </Button>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}

const FilterSelect = ({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}) => (
  <select
    aria-label={label}
    className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
    onChange={(event) => onChange(event.target.value)}
    value={value}
  >
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </select>
)

const CapacityItem = ({
  label,
  tone,
  value,
}: {
  label: string
  tone: 'error' | 'success' | 'warning'
  value: string
}) => (
  <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4 last:border-b-0 last:pb-0">
    <span className="text-sm text-[#6B7280]">{label}</span>
    <Badge tone={tone}>{value}</Badge>
  </div>
)

export default AdvisorsPage
