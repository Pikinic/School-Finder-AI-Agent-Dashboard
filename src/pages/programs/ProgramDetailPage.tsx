import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  GraduationCap,
  MapPin,
  Pencil,
  School,
  Sparkles,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'

const program = {
  academicRequirement:
    'A recognized undergraduate degree with a minimum second-class standing. Applicants should have completed at least one quantitative or statistics course.',
  applicationDeadline: 'June 30, 2026',
  category: 'Business',
  currency: 'CAD',
  duration: '16 months',
  englishRequirement:
    'IELTS Academic overall 6.5 with no band below 6.0, or an accepted equivalent English-language test.',
  id: 'PRG-3108',
  intakePeriods: ['Fall 2026', 'Winter 2027'],
  lastUpdated: 'June 6, 2026',
  level: 'Postgraduate',
  name: 'Business Analytics',
  notes:
    'Prioritize applicants with business, accounting, economics, computing, or quantitative backgrounds. Confirm transcript format before final application review.',
  scholarship: 'Available',
  school: {
    city: 'Toronto',
    country: 'Canada',
    id: 'SCH-2048',
    name: 'Northbridge College',
    partnerStatus: 'Partner',
  },
  status: 'Active',
  tuitionAmount: 22400,
}

const ProgramDetailPage = () => {
  const { programId } = useParams()
  const displayId = programId ?? program.id

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
              to="/programs"
            >
              <ArrowLeft size={16} />
              Programs
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">{program.name}</h1>
              <Badge tone="success">{program.status}</Badge>
              <Badge tone="brand">{program.level}</Badge>
              <Badge tone="neutral">{displayId}</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Review program ownership, costs, intakes, admission requirements, and operational guidance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<CheckCircle2 size={17} />} size="md" variant="secondary">
              Update status
            </Button>
            <Link
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-transparent bg-[#045A58] px-4 text-sm font-semibold text-white outline-none transition hover:bg-[#034A48] focus:ring-4 focus:ring-[#E6F4F3]"
              to={`/programs/${displayId}/edit`}
            >
              <Pencil size={17} />
              Edit program
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={GraduationCap} label="Study level" value={program.level} />
          <SummaryCard
            icon={CircleDollarSign}
            label="Annual tuition"
            value={`${program.currency} ${program.tuitionAmount.toLocaleString()}`}
          />
          <SummaryCard icon={Clock3} label="Duration" value={program.duration} />
          <SummaryCard icon={CalendarClock} label="Next deadline" value={program.applicationDeadline} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#E6F4F3] text-[#045A58]">
                  <BookOpen size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-[#111827]">Program profile</h2>
                    <Badge tone="neutral">{program.category}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Structured academic record used in school comparison, advisor review, and student recommendation matching.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-[#E5E7EB] pt-6 sm:grid-cols-2">
                <DetailItem label="Program ID" value={displayId} />
                <DetailItem label="Record status" value={program.status} />
                <DetailItem label="Category" value={program.category} />
                <DetailItem label="Last updated" value={program.lastUpdated} />
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Entry requirements</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Requirements surfaced during advisor review.</p>
                </div>
                <FileCheck2 className="text-[#045A58]" size={20} />
              </div>

              <div className="space-y-4">
                <RequirementItem
                  icon={<GraduationCap size={18} />}
                  label="Academic requirement"
                  value={program.academicRequirement}
                />
                <RequirementItem
                  icon={<BookOpen size={18} />}
                  label="English requirement"
                  value={program.englishRequirement}
                />
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Operational notes</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Internal context for advisors and operations staff.</p>
                </div>
                <Sparkles className="text-[#045A58]" size={20} />
              </div>
              <p className="text-sm leading-6 text-[#374151]">{program.notes}</p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">School</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Program ownership and location.</p>
                </div>
                <Building2 className="text-[#045A58]" size={20} />
              </div>

              <Link
                className="block rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 outline-none transition hover:border-[#B7D8D6] hover:bg-[#E6F4F3] focus:ring-4 focus:ring-[#E6F4F3]"
                to={`/schools/${program.school.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#045A58]">
                    <School size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{program.school.name}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#6B7280]">
                      <MapPin size={14} />
                      {program.school.city}, {program.school.country}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-[#6B7280]">Relationship</span>
                <Badge tone="success">{program.school.partnerStatus}</Badge>
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Intakes and deadline</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Current application availability.</p>
                </div>
                <CalendarDays className="text-[#045A58]" size={20} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Intake periods</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {program.intakePeriods.map((intake) => (
                  <Badge tone="brand" key={intake}>
                    {intake}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 border-t border-[#E5E7EB] pt-5">
                <DetailItem label="Application deadline" value={program.applicationDeadline} />
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Tuition and funding</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Budget and scholarship context.</p>
                </div>
                <CircleDollarSign className="text-[#045A58]" size={20} />
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Tuition</p>
                <p className="mt-2 text-2xl font-semibold text-[#111827]">
                  {program.currency} {program.tuitionAmount.toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-[#6B7280]">Scholarship</span>
                <Badge tone="success">{program.scholarship}</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

type SummaryCardProps = {
  icon: typeof BookOpen
  label: string
  value: string
}

const SummaryCard = ({ icon: Icon, label, value }: SummaryCardProps) => (
  <Card className="p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-[#6B7280]">{label}</p>
        <p className="mt-3 text-lg font-semibold text-[#111827]">{value}</p>
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
        <Icon size={20} />
      </div>
    </div>
  </Card>
)

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">{label}</p>
    <p className="mt-1 text-sm font-semibold text-[#111827]">{value}</p>
  </div>
)

const RequirementItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#045A58]">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-[#111827]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">{value}</p>
    </div>
  </div>
)

export default ProgramDetailPage
