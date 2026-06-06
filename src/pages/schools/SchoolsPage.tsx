import {
  ArrowDownUp,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  ExternalLink,
  MapPin,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

type PartnerStatus = 'Partner' | 'Prospect' | 'Non-partner'
type SchoolStatus = 'Active' | 'Inactive'

type SchoolRecord = {
  city: string
  country: string
  id: string
  lastUpdated: string
  name: string
  partnerStatus: PartnerStatus
  programCount: number
  status: SchoolStatus
  type: 'College' | 'University' | 'Institute'
  visaFriendlinessScore: number
}

const schools: SchoolRecord[] = [
  {
    city: 'Toronto',
    country: 'Canada',
    id: 'SCH-2048',
    lastUpdated: 'Today, 9:42 AM',
    name: 'Northbridge College',
    partnerStatus: 'Partner',
    programCount: 28,
    status: 'Active',
    type: 'College',
    visaFriendlinessScore: 92,
  },
  {
    city: 'Vancouver',
    country: 'Canada',
    id: 'SCH-2047',
    lastUpdated: 'Yesterday',
    name: 'Maple Coast University',
    partnerStatus: 'Prospect',
    programCount: 41,
    status: 'Active',
    type: 'University',
    visaFriendlinessScore: 88,
  },
  {
    city: 'Manchester',
    country: 'United Kingdom',
    id: 'SCH-2046',
    lastUpdated: '2 days ago',
    name: 'Westhaven University',
    partnerStatus: 'Partner',
    programCount: 35,
    status: 'Active',
    type: 'University',
    visaFriendlinessScore: 86,
  },
  {
    city: 'Melbourne',
    country: 'Australia',
    id: 'SCH-2045',
    lastUpdated: '3 days ago',
    name: 'Harbour Institute',
    partnerStatus: 'Non-partner',
    programCount: 19,
    status: 'Active',
    type: 'Institute',
    visaFriendlinessScore: 81,
  },
  {
    city: 'Birmingham',
    country: 'United Kingdom',
    id: 'SCH-2044',
    lastUpdated: 'May 29, 2026',
    name: 'Kingsford Metropolitan College',
    partnerStatus: 'Prospect',
    programCount: 16,
    status: 'Inactive',
    type: 'College',
    visaFriendlinessScore: 74,
  },
  {
    city: 'Berlin',
    country: 'Germany',
    id: 'SCH-2043',
    lastUpdated: 'May 27, 2026',
    name: 'Linden Technical Institute',
    partnerStatus: 'Non-partner',
    programCount: 22,
    status: 'Active',
    type: 'Institute',
    visaFriendlinessScore: 79,
  },
]

const partnerTone: Record<PartnerStatus, 'brand' | 'neutral' | 'success' | 'warning'> = {
  'Non-partner': 'neutral',
  Partner: 'success',
  Prospect: 'warning',
}

const schoolStats = [
  { icon: Building2, label: 'Total schools', note: 'Across 12 countries', value: '164' },
  { icon: CheckCircle2, label: 'Active records', note: '94% of directory', value: '154' },
  { icon: ShieldCheck, label: 'Partner schools', note: '8 added this quarter', value: '68' },
  { icon: BookOpen, label: 'Linked programs', note: '42 need review', value: '1,286' },
] as const

const SchoolsPage = () => {
  const [city, setCity] = useState('All cities')
  const [country, setCountry] = useState('All countries')
  const [partnerStatus, setPartnerStatus] = useState('All partner statuses')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All types')

  const filteredSchools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return schools.filter((school) => {
      const matchesQuery =
        !normalizedQuery ||
        school.name.toLowerCase().includes(normalizedQuery) ||
        school.city.toLowerCase().includes(normalizedQuery) ||
        school.country.toLowerCase().includes(normalizedQuery)

      return (
        matchesQuery &&
        (country === 'All countries' || school.country === country) &&
        (city === 'All cities' || school.city === city) &&
        (type === 'All types' || school.type === type) &&
        (partnerStatus === 'All partner statuses' || school.partnerStatus === partnerStatus)
      )
    })
  }, [city, country, partnerStatus, query, type])

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Directory</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Schools</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Maintain school records, partner relationships, program coverage, and visa-readiness data.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<ExternalLink size={17} />} size="md" variant="secondary">
              Export directory
            </Button>
            <Button leftIcon={<Plus size={17} />} size="md">
              Add school
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {schoolStats.map((stat) => {
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
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">School directory</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Review school coverage and keep operational records current.
                </p>
              </div>
              <Button leftIcon={<ArrowDownUp size={17} />} size="md" variant="secondary">
                Recently updated
              </Button>
            </div>

            <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(280px,1fr)_170px_160px_150px_190px]">
              <Input
                className="h-11 bg-[#F9FAFB]"
                id="school-search"
                leftIcon={<Search size={18} />}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search school, city, or country"
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
                id="city-filter"
                label="City"
                onChange={setCity}
                options={['All cities', 'Toronto', 'Vancouver', 'Manchester', 'Melbourne', 'Birmingham', 'Berlin']}
                value={city}
              />
              <FilterSelect
                id="type-filter"
                label="Type"
                onChange={setType}
                options={['All types', 'University', 'College', 'Institute']}
                value={type}
              />
              <FilterSelect
                id="partner-filter"
                label="Partner status"
                onChange={setPartnerStatus}
                options={['All partner statuses', 'Partner', 'Prospect', 'Non-partner']}
                value={partnerStatus}
              />
            </div>
          </div>

          {filteredSchools.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                    <th className="px-6 py-3">School name</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Partner status</th>
                    <th className="px-6 py-3">Programs</th>
                    <th className="px-6 py-3">Visa score</th>
                    <th className="px-6 py-3">Last updated</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredSchools.map((school) => (
                    <tr className="transition hover:bg-[#F9FAFB]" key={school.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                            <Building2 size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Link
                                className="text-sm font-semibold text-[#111827] outline-none transition hover:text-[#045A58] focus:underline"
                                to={`/schools/${school.id}`}
                              >
                                {school.name}
                              </Link>
                              {school.status === 'Inactive' ? <Badge tone="error">Inactive</Badge> : null}
                            </div>
                            <p className="mt-1 text-xs font-medium text-[#6B7280]">{school.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-sm text-[#374151]">
                          <MapPin className="text-[#6B7280]" size={16} />
                          {school.city}, {school.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{school.type}</td>
                      <td className="px-6 py-4">
                        <Badge tone={partnerTone[school.partnerStatus]}>{school.partnerStatus}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] outline-none hover:text-[#034A48] focus:underline"
                          type="button"
                        >
                          <BookOpen size={16} />
                          {school.programCount}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-20 rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-2 rounded-full bg-[#045A58]"
                              style={{ width: `${school.visaFriendlinessScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-[#111827]">
                            {school.visaFriendlinessScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{school.lastUpdated}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            aria-label={`Edit ${school.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7280] outline-none transition hover:bg-[#E6F4F3] hover:text-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                            title="Edit school"
                            to={`/schools/${school.id}`}
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            aria-label={`${school.status === 'Active' ? 'Disable' : 'Enable'} ${school.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7280] outline-none transition hover:bg-[#FEE2E2] hover:text-[#DC2626] focus:ring-4 focus:ring-[#FEE2E2]"
                            title={school.status === 'Active' ? 'Disable school' : 'Enable school'}
                            type="button"
                          >
                            <CircleOff size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                <Building2 size={21} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111827]">No schools match these filters</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Clear or adjust the current search and filters to return to the directory.
              </p>
              <Button
                className="mt-5"
                onClick={() => {
                  setCity('All cities')
                  setCountry('All countries')
                  setPartnerStatus('All partner statuses')
                  setQuery('')
                  setType('All types')
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
              Showing <span className="font-semibold text-[#111827]">{filteredSchools.length}</span> of{' '}
              <span className="font-semibold text-[#111827]">164</span> schools
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

type FilterSelectProps = {
  id: string
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}

const FilterSelect = ({ id, label, onChange, options, value }: FilterSelectProps) => {
  return (
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
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default SchoolsPage
