import {
  ArrowDownUp,
  BookOpen,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  GraduationCap,
  Pencil,
  Plus,
  Search,
  School,
  Sparkles,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

type ScholarshipStatus = 'Available' | 'Limited' | 'Unavailable'

type ProgramRecord = {
  category: string
  country: string
  currency: string
  deadline: string
  id: string
  intakePeriods: string[]
  level: string
  name: string
  scholarship: ScholarshipStatus
  school: string
  schoolId: string
  tuitionAmount: number
}

const programs: ProgramRecord[] = [
  {
    category: 'Business',
    country: 'Canada',
    currency: 'CAD',
    deadline: 'Jun 30, 2026',
    id: 'PRG-3108',
    intakePeriods: ['Fall 2026'],
    level: 'Postgraduate',
    name: 'Business Analytics',
    scholarship: 'Available',
    school: 'Northbridge College',
    schoolId: 'SCH-2048',
    tuitionAmount: 22400,
  },
  {
    category: 'Computing and IT',
    country: 'Canada',
    currency: 'CAD',
    deadline: 'Jul 15, 2026',
    id: 'PRG-3107',
    intakePeriods: ['Fall 2026', 'Winter 2027'],
    level: 'Postgraduate',
    name: 'Data and Business Intelligence',
    scholarship: 'Limited',
    school: 'Northbridge College',
    schoolId: 'SCH-2048',
    tuitionAmount: 23100,
  },
  {
    category: 'Health Sciences',
    country: 'United Kingdom',
    currency: 'GBP',
    deadline: 'Aug 14, 2026',
    id: 'PRG-3106',
    intakePeriods: ['Fall 2026'],
    level: 'Masters',
    name: 'Public Health',
    scholarship: 'Available',
    school: 'Westhaven University',
    schoolId: 'SCH-2046',
    tuitionAmount: 19600,
  },
  {
    category: 'Computing and IT',
    country: 'Australia',
    currency: 'AUD',
    deadline: 'Sep 1, 2026',
    id: 'PRG-3105',
    intakePeriods: ['Spring 2027'],
    level: 'Undergraduate',
    name: 'Computer Science',
    scholarship: 'Unavailable',
    school: 'Harbour Institute',
    schoolId: 'SCH-2045',
    tuitionAmount: 28400,
  },
  {
    category: 'Engineering',
    country: 'Germany',
    currency: 'EUR',
    deadline: 'Oct 15, 2026',
    id: 'PRG-3104',
    intakePeriods: ['Winter 2027'],
    level: 'Masters',
    name: 'Mechanical Engineering',
    scholarship: 'Limited',
    school: 'Linden Technical Institute',
    schoolId: 'SCH-2043',
    tuitionAmount: 14800,
  },
  {
    category: 'Business',
    country: 'Canada',
    currency: 'CAD',
    deadline: 'Oct 30, 2026',
    id: 'PRG-3103',
    intakePeriods: ['Winter 2027'],
    level: 'Diploma',
    name: 'International Business Management',
    scholarship: 'Unavailable',
    school: 'Northbridge College',
    schoolId: 'SCH-2048',
    tuitionAmount: 18750,
  },
]

const scholarshipTone: Record<ScholarshipStatus, 'success' | 'warning' | 'neutral'> = {
  Available: 'success',
  Limited: 'warning',
  Unavailable: 'neutral',
}

const programStats = [
  { icon: BookOpen, label: 'Total programs', note: 'Across 164 schools', value: '1,286' },
  { icon: GraduationCap, label: 'Study levels', note: 'Certificate to doctorate', value: '7' },
  { icon: Sparkles, label: 'Scholarship options', note: '312 currently available', value: '418' },
  { icon: CalendarClock, label: 'Deadlines due', note: 'Within the next 30 days', value: '42' },
] as const

const ProgramsPage = () => {
  const [country, setCountry] = useState('All countries')
  const [intake, setIntake] = useState('All intakes')
  const [level, setLevel] = useState('All levels')
  const [maxTuition, setMaxTuition] = useState('Any tuition')
  const [query, setQuery] = useState('')
  const [scholarship, setScholarship] = useState('All scholarships')
  const [school, setSchool] = useState('All schools')

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const tuitionLimit = maxTuition === 'Any tuition' ? Number.POSITIVE_INFINITY : Number(maxTuition)

    return programs.filter((program) => {
      const matchesQuery =
        !normalizedQuery ||
        program.name.toLowerCase().includes(normalizedQuery) ||
        program.school.toLowerCase().includes(normalizedQuery) ||
        program.category.toLowerCase().includes(normalizedQuery)

      return (
        matchesQuery &&
        (country === 'All countries' || program.country === country) &&
        (school === 'All schools' || program.school === school) &&
        (level === 'All levels' || program.level === level) &&
        (intake === 'All intakes' || program.intakePeriods.some((period) => period.startsWith(intake))) &&
        (scholarship === 'All scholarships' || program.scholarship === scholarship) &&
        program.tuitionAmount <= tuitionLimit
      )
    })
  }, [country, intake, level, maxTuition, query, scholarship, school])

  const clearFilters = () => {
    setCountry('All countries')
    setIntake('All intakes')
    setLevel('All levels')
    setMaxTuition('Any tuition')
    setQuery('')
    setScholarship('All scholarships')
    setSchool('All schools')
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Academic directory</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Programs</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Search and manage program records across every school, intake, study level, and tuition range.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<ArrowDownUp size={17} />} size="md" variant="secondary">
              Recently updated
            </Button>
            <Link
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-transparent bg-[#045A58] px-4 text-sm font-semibold text-white outline-none transition hover:bg-[#034A48] focus:ring-4 focus:ring-[#E6F4F3]"
              to="/programs/new"
            >
              <Plus size={17} />
              Add program
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {programStats.map((stat) => {
            const Icon = stat.icon

            return (
              <Card className="p-5" key={stat.label}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-normal text-[#111827]">{stat.value}</p>
                    <p className="mt-2 text-xs font-medium text-[#6B7280]">{stat.note}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                    <Icon size={20} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-0">
          <div className="border-b border-[#E5E7EB] px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Program directory</h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                Compare structured program data and open the associated school record.
              </p>
            </div>

            <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(280px,1fr)_180px_180px_160px]">
              <Input
                className="h-11 bg-[#F9FAFB]"
                id="program-search"
                leftIcon={<Search size={18} />}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search program, school, or category"
                type="search"
                value={query}
              />
              <FilterSelect
                id="country-filter"
                label="Country"
                onChange={setCountry}
                options={['All countries', 'Canada', 'United Kingdom', 'Australia', 'Germany']}
                value={country}
              />
              <FilterSelect
                id="school-filter"
                label="School"
                onChange={setSchool}
                options={[
                  'All schools',
                  'Northbridge College',
                  'Westhaven University',
                  'Harbour Institute',
                  'Linden Technical Institute',
                ]}
                value={school}
              />
              <FilterSelect
                id="level-filter"
                label="Level"
                onChange={setLevel}
                options={['All levels', 'Diploma', 'Undergraduate', 'Postgraduate', 'Masters']}
                value={level}
              />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-3 xl:max-w-[720px]">
              <FilterSelect
                id="tuition-filter"
                label="Tuition"
                onChange={setMaxTuition}
                options={[
                  { label: 'Any tuition', value: 'Any tuition' },
                  { label: 'Up to 15,000', value: '15000' },
                  { label: 'Up to 20,000', value: '20000' },
                  { label: 'Up to 25,000', value: '25000' },
                  { label: 'Up to 30,000', value: '30000' },
                ]}
                value={maxTuition}
              />
              <FilterSelect
                id="intake-filter"
                label="Intake"
                onChange={setIntake}
                options={['All intakes', 'Fall', 'Winter', 'Spring', 'Summer']}
                value={intake}
              />
              <FilterSelect
                id="scholarship-filter"
                label="Scholarship"
                onChange={setScholarship}
                options={['All scholarships', 'Available', 'Limited', 'Unavailable']}
                value={scholarship}
              />
            </div>
          </div>

          {filteredPrograms.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1160px] text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                    <th className="px-6 py-3">Program name</th>
                    <th className="px-6 py-3">School</th>
                    <th className="px-6 py-3">Country</th>
                    <th className="px-6 py-3">Level</th>
                    <th className="px-6 py-3">Tuition</th>
                    <th className="px-6 py-3">Intake periods</th>
                    <th className="px-6 py-3">Deadline</th>
                    <th className="px-6 py-3">Scholarship</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredPrograms.map((program) => (
                    <tr className="transition hover:bg-[#F9FAFB]" key={program.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                            <BookOpen size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">{program.name}</p>
                            <p className="mt-1 text-xs font-medium text-[#6B7280]">
                              {program.id} · {program.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] outline-none hover:text-[#034A48] focus:underline"
                          to={`/schools/${program.schoolId}`}
                        >
                          <School size={16} />
                          {program.school}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{program.country}</td>
                      <td className="px-6 py-4">
                        <Badge tone="brand">{program.level}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
                          <CircleDollarSign className="text-[#6B7280]" size={16} />
                          {program.currency} {program.tuitionAmount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {program.intakePeriods.map((period) => (
                            <Badge className="h-6 px-2" key={period} tone="neutral">
                              {period}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{program.deadline}</td>
                      <td className="px-6 py-4">
                        <Badge tone={scholarshipTone[program.scholarship]}>{program.scholarship}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          aria-label={`Edit ${program.name}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7280] outline-none transition hover:bg-[#E6F4F3] hover:text-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                          title="Edit program"
                          type="button"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                <BookOpen size={21} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111827]">No programs match these filters</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Adjust the search or clear filters to return to the complete program directory.
              </p>
              <Button className="mt-5" onClick={clearFilters} size="md" variant="secondary">
                Clear filters
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-[#6B7280]">
              Showing <span className="font-semibold text-[#111827]">{filteredPrograms.length}</span> of{' '}
              <span className="font-semibold text-[#111827]">1,286</span> programs
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
      </div>
    </AppShell>
  )
}

type FilterOption = string | {
  label: string
  value: string
}

type FilterSelectProps = {
  id: string
  label: string
  onChange: (value: string) => void
  options: FilterOption[]
  value: string
}

const FilterSelect = ({ id, label, onChange, options, value }: FilterSelectProps) => (
  <div>
    <label className="sr-only" htmlFor={id}>
      {label}
    </label>
    <select
      className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      id={id}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => {
        const label = typeof option === 'string' ? option : option.label
        const optionValue = typeof option === 'string' ? option : option.value

        return (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        )
      })}
    </select>
  </div>
)

export default ProgramsPage
