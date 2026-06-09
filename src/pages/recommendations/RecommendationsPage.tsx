import {
  AlertCircle,
  ArrowDownUp,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  GitCompareArrows,
  GraduationCap,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'
import { cn } from '../../utils/cn.js'

type Recommendation = {
  country: string
  createdAt: string
  id: string
  missingRequirements: string[]
  program: string
  programId: string
  reasons: string[]
  school: string
  schoolId: string
  score: number
  scoreBreakdown: {
    budget: number
    intake: number
    program: number
    visa: number
  }
  shortlisted: boolean
  student: string
  studentId: string
  tuition: string
}

const recommendations: Recommendation[] = [
  {
    country: 'Canada',
    createdAt: 'Today, 9:42 AM',
    id: 'REC-7108',
    missingRequirements: ['Confirm transcript format'],
    program: 'Business Analytics',
    programId: 'PRG-3108',
    reasons: ['Within annual budget', 'Fall intake available', 'IELTS requirement met'],
    school: 'Northbridge College',
    schoolId: 'SCH-2048',
    score: 92,
    scoreBreakdown: { budget: 95, intake: 100, program: 94, visa: 80 },
    shortlisted: true,
    student: 'Chinedu Nwosu',
    studentId: 'STU-1048',
    tuition: 'CAD 22,400',
  },
  {
    country: 'Canada',
    createdAt: 'Today, 9:42 AM',
    id: 'REC-7107',
    missingRequirements: ['Scholarship deadline check'],
    program: 'Data and Business Intelligence',
    programId: 'PRG-3107',
    reasons: ['Strong program alignment', 'Flexible intake', 'Partner school'],
    school: 'Maple Coast University',
    schoolId: 'SCH-2047',
    score: 88,
    scoreBreakdown: { budget: 84, intake: 96, program: 92, visa: 82 },
    shortlisted: false,
    student: 'Chinedu Nwosu',
    studentId: 'STU-1048',
    tuition: 'CAD 23,100',
  },
  {
    country: 'United Kingdom',
    createdAt: 'Yesterday, 3:18 PM',
    id: 'REC-7106',
    missingRequirements: ['Confirm clinical experience'],
    program: 'Public Health',
    programId: 'PRG-3106',
    reasons: ['Preferred destination', 'Scholarship available', 'Spring pathway available'],
    school: 'Westhaven University',
    schoolId: 'SCH-2046',
    score: 89,
    scoreBreakdown: { budget: 86, intake: 92, program: 94, visa: 78 },
    shortlisted: true,
    student: 'Sofia Ahmed',
    studentId: 'STU-1047',
    tuition: 'GBP 19,600',
  },
  {
    country: 'Australia',
    createdAt: 'Yesterday, 12:05 PM',
    id: 'REC-7105',
    missingRequirements: ['IELTS result pending'],
    program: 'Computer Science',
    programId: 'PRG-3105',
    reasons: ['Academic background match', 'Preferred country', 'Application window open'],
    school: 'Harbour Institute',
    schoolId: 'SCH-2045',
    score: 84,
    scoreBreakdown: { budget: 72, intake: 90, program: 93, visa: 81 },
    shortlisted: false,
    student: 'Emeka Ibe',
    studentId: 'STU-1046',
    tuition: 'AUD 28,400',
  },
  {
    country: 'Germany',
    createdAt: 'June 5, 2026',
    id: 'REC-7104',
    missingRequirements: [],
    program: 'Mechanical Engineering',
    programId: 'PRG-3104',
    reasons: ['Strong budget fit', 'Academic field aligned', 'Winter intake available'],
    school: 'Linden Technical Institute',
    schoolId: 'SCH-2043',
    score: 90,
    scoreBreakdown: { budget: 98, intake: 88, program: 94, visa: 76 },
    shortlisted: true,
    student: 'Tara Mensah',
    studentId: 'STU-1043',
    tuition: 'EUR 14,800',
  },
]

const recommendationStats = [
  { icon: Sparkles, label: 'Generated', note: 'This month', value: '364' },
  { icon: Star, label: 'Shortlisted', note: 'Across 82 students', value: '126' },
  { icon: CheckCircle2, label: 'Strong matches', note: 'Score of 85 or higher', value: '218' },
  { icon: AlertCircle, label: 'Missing requirements', note: 'Needs advisor review', value: '47' },
] as const

const RecommendationsPage = () => {
  const [comparisonIds, setComparisonIds] = useState<string[]>([])
  const [country, setCountry] = useState('All countries')
  const [query, setQuery] = useState('')
  const [shortlistedIds, setShortlistedIds] = useState(
    recommendations.filter((item) => item.shortlisted).map((item) => item.id),
  )
  const [student, setStudent] = useState('All students')

  const filteredRecommendations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return recommendations.filter((recommendation) => {
      const matchesQuery =
        !normalizedQuery ||
        recommendation.student.toLowerCase().includes(normalizedQuery) ||
        recommendation.school.toLowerCase().includes(normalizedQuery) ||
        recommendation.program.toLowerCase().includes(normalizedQuery)

      return (
        matchesQuery &&
        (country === 'All countries' || recommendation.country === country) &&
        (student === 'All students' || recommendation.student === student)
      )
    })
  }, [country, query, student])

  const comparisonItems = recommendations.filter((item) => comparisonIds.includes(item.id))

  const toggleComparison = (id: string) => {
    setComparisonIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id)
      }

      if (current.length >= 2) {
        return current
      }

      return [...current, id]
    })
  }

  const toggleShortlist = (id: string) => {
    setShortlistedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Placement review</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Recommendations</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Review AI-generated school matches, inspect scoring evidence, compare options, and manage student shortlists.
            </p>
          </div>

          <Button leftIcon={<ArrowDownUp size={17} />} size="md" variant="secondary">
            Highest score
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recommendationStats.map((stat) => {
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
                <h2 className="text-lg font-semibold text-[#111827]">Recommendation review</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Select up to two recommendations for side-by-side comparison.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:w-[760px]">
                <Input
                  className="h-11 bg-[#F9FAFB]"
                  id="recommendation-search"
                  leftIcon={<Search size={18} />}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search student, school, or program"
                  type="search"
                  value={query}
                />
                <FilterSelect
                  label="Student"
                  onChange={setStudent}
                  options={['All students', 'Chinedu Nwosu', 'Sofia Ahmed', 'Emeka Ibe', 'Tara Mensah']}
                  value={student}
                />
                <FilterSelect
                  label="Country"
                  onChange={setCountry}
                  options={['All countries', 'Canada', 'United Kingdom', 'Australia', 'Germany']}
                  value={country}
                />
              </div>
            </div>
          </div>

          {filteredRecommendations.length ? (
            <div className="divide-y divide-[#E5E7EB]">
              {filteredRecommendations.map((recommendation) => {
                const isCompared = comparisonIds.includes(recommendation.id)
                const isShortlisted = shortlistedIds.includes(recommendation.id)

                return (
                  <article className="px-5 py-6 transition hover:bg-[#F9FAFB] sm:px-6" key={recommendation.id}>
                    <div className="grid gap-6 2xl:grid-cols-[220px_minmax(0,1fr)_260px_180px]">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                            {recommendation.student
                              .split(' ')
                              .map((name) => name[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <Link
                              className="text-sm font-semibold text-[#111827] outline-none transition hover:text-[#045A58] focus:underline"
                              to={`/students/${recommendation.studentId}`}
                            >
                              {recommendation.student}
                            </Link>
                            <p className="mt-1 text-xs font-medium text-[#6B7280]">
                              {recommendation.studentId} / {recommendation.createdAt}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-4">
                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Fit score</p>
                              <p className="mt-1 text-3xl font-semibold text-[#111827]">{recommendation.score}</p>
                            </div>
                            <Badge tone={recommendation.score >= 85 ? 'success' : 'warning'}>
                              {recommendation.score >= 85 ? 'Strong match' : 'Review'}
                            </Badge>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-2 rounded-full bg-[#045A58]"
                              style={{ width: `${recommendation.score}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <Link
                              className="text-base font-semibold text-[#111827] outline-none transition hover:text-[#045A58] focus:underline"
                              to={`/schools/${recommendation.schoolId}`}
                            >
                              {recommendation.school}
                            </Link>
                            <Link
                              className="mt-1 block text-sm font-medium text-[#045A58] outline-none hover:text-[#034A48] focus:underline"
                              to={`/programs/${recommendation.programId}`}
                            >
                              {recommendation.program}
                            </Link>
                          </div>
                          <div className="text-right">
                            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827]">
                              <CircleDollarSign size={16} className="text-[#6B7280]" />
                              {recommendation.tuition}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280]">
                              <MapPin size={14} />
                              {recommendation.country}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Why it matches</p>
                            <ul className="mt-2 space-y-2">
                              {recommendation.reasons.map((reason) => (
                                <li className="flex items-start gap-2 text-sm text-[#374151]" key={reason}>
                                  <Check className="mt-0.5 shrink-0 text-[#16A34A]" size={15} />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Missing requirements</p>
                            {recommendation.missingRequirements.length ? (
                              <ul className="mt-2 space-y-2">
                                {recommendation.missingRequirements.map((requirement) => (
                                  <li className="flex items-start gap-2 text-sm text-[#92400E]" key={requirement}>
                                    <AlertCircle className="mt-0.5 shrink-0" size={15} />
                                    {requirement}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#166534]">
                                <CheckCircle2 size={15} />
                                No known gaps
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Score breakdown</p>
                        <div className="mt-3 space-y-3">
                          <ScoreRow label="Program" value={recommendation.scoreBreakdown.program} />
                          <ScoreRow label="Budget" value={recommendation.scoreBreakdown.budget} />
                          <ScoreRow label="Intake" value={recommendation.scoreBreakdown.intake} />
                          <ScoreRow label="Visa" value={recommendation.scoreBreakdown.visa} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button
                          className={cn(
                            'inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold outline-none transition focus:ring-4',
                            isShortlisted
                              ? 'border-[#B7D8D6] bg-[#E6F4F3] text-[#045A58] focus:ring-[#E6F4F3]'
                              : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] focus:ring-[#E6F4F3]',
                          )}
                          onClick={() => toggleShortlist(recommendation.id)}
                          type="button"
                        >
                          <Star fill={isShortlisted ? 'currentColor' : 'none'} size={16} />
                          {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                        </button>
                        <button
                          className={cn(
                            'inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold outline-none transition focus:ring-4',
                            isCompared
                              ? 'border-[#045A58] bg-[#045A58] text-white focus:ring-[#E6F4F3]'
                              : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] focus:ring-[#E6F4F3]',
                            !isCompared && comparisonIds.length >= 2 && 'cursor-not-allowed opacity-50',
                          )}
                          disabled={!isCompared && comparisonIds.length >= 2}
                          onClick={() => toggleComparison(recommendation.id)}
                          type="button"
                        >
                          <GitCompareArrows size={16} />
                          {isCompared ? 'Selected' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                <Sparkles size={21} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111827]">No recommendations match these filters</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Change the student, country, or search filters to return to generated recommendations.
              </p>
              <Button
                className="mt-5"
                onClick={() => {
                  setCountry('All countries')
                  setQuery('')
                  setStudent('All students')
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
              Showing <span className="font-semibold text-[#111827]">{filteredRecommendations.length}</span> of{' '}
              <span className="font-semibold text-[#111827]">364</span> recommendations
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

        {comparisonItems.length ? (
          <Card className="p-0">
            <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">School comparison</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {comparisonItems.length === 1 ? 'Select one more recommendation to compare.' : 'Side-by-side recommendation evidence.'}
                </p>
              </div>
              <Button onClick={() => setComparisonIds([])} size="sm" variant="ghost">
                Clear comparison
              </Button>
            </div>

            <div className="grid divide-y divide-[#E5E7EB] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              {comparisonItems.map((item) => (
                <div className="p-6" key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-[#111827]">{item.school}</p>
                      <p className="mt-1 text-sm text-[#045A58]">{item.program}</p>
                    </div>
                    <button
                      aria-label={`Remove ${item.school} from comparison`}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-[#6B7280] outline-none hover:bg-[#F3F4F6] hover:text-[#111827]"
                      onClick={() => toggleComparison(item.id)}
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <ComparisonMetric icon={<Sparkles size={16} />} label="Fit score" value={`${item.score}%`} />
                    <ComparisonMetric icon={<CircleDollarSign size={16} />} label="Tuition" value={item.tuition} />
                    <ComparisonMetric icon={<GraduationCap size={16} />} label="Program fit" value={`${item.scoreBreakdown.program}%`} />
                    <ComparisonMetric icon={<MapPin size={16} />} label="Country" value={item.country} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : null}
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

const ScoreRow = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between gap-3">
      <span className="text-sm text-[#6B7280]">{label}</span>
      <span className="text-sm font-semibold text-[#111827]">{value}</span>
    </div>
    <div className="h-1.5 rounded-full bg-[#E5E7EB]">
      <div className="h-1.5 rounded-full bg-[#045A58]" style={{ width: `${value}%` }} />
    </div>
  </div>
)

const ComparisonMetric = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
    <div className="flex items-center gap-2 text-[#045A58]">
      {icon}
      <span className="text-xs font-semibold uppercase tracking-normal text-[#6B7280]">{label}</span>
    </div>
    <p className="mt-2 text-sm font-semibold text-[#111827]">{value}</p>
  </div>
)

export default RecommendationsPage
