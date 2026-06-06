import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'

const school = {
  address: '120 Harbour Street',
  admissionsEmail: 'admissions@northbridge.example',
  city: 'Toronto',
  country: 'Canada',
  description:
    'Career-focused college record used by advisors for student matching, application planning, and partner workflow management.',
  id: 'SCH-2048',
  lastReviewed: 'June 6, 2026',
  name: 'Northbridge College',
  partnerManager: 'Amina Yusuf',
  partnerSince: 'January 2025',
  partnerStatus: 'Partner',
  phone: '+1 416 555 0184',
  postalCode: 'M5J 2N8',
  rankingNote:
    'Internal reputation assessment indicates strong employer-oriented delivery and consistent advisor feedback for applied business programs.',
  status: 'Active',
  type: 'College',
  visaFriendlinessNote:
    'Clear document guidance, reliable international admissions response times, and established support for study-permit documentation.',
  visaFriendlinessScore: 92,
  website: 'https://northbridge.example',
}

const programs = [
  {
    deadline: 'June 30, 2026',
    intake: 'Fall 2026',
    level: 'Postgraduate',
    name: 'Business Analytics',
    scholarship: 'Available',
    tuition: 'CAD 22,400',
  },
  {
    deadline: 'July 15, 2026',
    intake: 'Fall 2026',
    level: 'Postgraduate',
    name: 'Data and Business Intelligence',
    scholarship: 'Limited',
    tuition: 'CAD 23,100',
  },
  {
    deadline: 'October 30, 2026',
    intake: 'Winter 2027',
    level: 'Diploma',
    name: 'International Business Management',
    scholarship: 'Unavailable',
    tuition: 'CAD 18,750',
  },
] as const

const SchoolDetailPage = () => {
  const { schoolId } = useParams()
  const displayId = schoolId ?? school.id

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
              to="/schools"
            >
              <ArrowLeft size={16} />
              Schools
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">{school.name}</h1>
              <Badge tone="success">{school.status}</Badge>
              <Badge tone="brand">{school.partnerStatus}</Badge>
              <Badge tone="neutral">{displayId}</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Review school profile data, partnership context, visa-readiness notes, and related programs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<CheckCircle2 size={17} />} size="md" variant="secondary">
              Update status
            </Button>
            <Link
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-transparent bg-[#045A58] px-4 text-sm font-semibold text-white outline-none transition hover:bg-[#034A48] focus:ring-4 focus:ring-[#E6F4F3]"
              to={`/schools/${displayId}/edit`}
            >
              <Pencil size={17} />
              Edit school
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={Building2} label="School type" value={school.type} />
          <SummaryCard icon={MapPin} label="Location" value={`${school.city}, ${school.country}`} />
          <SummaryCard icon={BookOpen} label="Active programs" value="28" />
          <SummaryCard icon={ShieldCheck} label="Visa score" value={`${school.visaFriendlinessScore}/100`} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#E6F4F3] text-[#045A58]">
                  <GraduationCap size={25} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-[#111827]">School profile</h2>
                    <Badge tone="neutral">{school.type}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#374151]">{school.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-[#E5E7EB] pt-6 sm:grid-cols-2">
                <DetailItem label="Record ID" value={displayId} />
                <DetailItem label="Last reviewed" value={school.lastReviewed} />
                <DetailItem label="Record status" value={school.status} />
                <DetailItem label="Partner status" value={school.partnerStatus} />
              </div>
            </Card>

            <Card>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#111827]">Contact and website</h2>
                <p className="mt-1 text-sm text-[#6B7280]">Primary operational contact channels.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ContactItem icon={Globe2} label="Website" value={school.website} />
                <ContactItem icon={Mail} label="Admissions email" value={school.admissionsEmail} />
                <ContactItem icon={Phone} label="Phone" value={school.phone} />
                <ContactItem icon={ExternalLink} label="External record" value="Open school website" />
              </div>
            </Card>

            <Card className="p-0">
              <div className="flex flex-col gap-4 border-b border-[#E5E7EB] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Related programs</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Programs currently linked to this school record.</p>
                </div>
                <Link
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-transparent bg-[#045A58] px-4 text-sm font-semibold text-white outline-none transition hover:bg-[#034A48] focus:ring-4 focus:ring-[#E6F4F3]"
                  to={`/schools/${displayId}/programs/new`}
                >
                  <Plus size={17} />
                  Add program
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                      <th className="px-6 py-3">Program</th>
                      <th className="px-6 py-3">Level</th>
                      <th className="px-6 py-3">Tuition</th>
                      <th className="px-6 py-3">Intake</th>
                      <th className="px-6 py-3">Deadline</th>
                      <th className="px-6 py-3">Scholarship</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {programs.map((program) => (
                      <tr className="transition hover:bg-[#F9FAFB]" key={program.name}>
                        <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{program.name}</td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">{program.level}</td>
                        <td className="px-6 py-4 text-sm font-medium text-[#111827]">{program.tuition}</td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">{program.intake}</td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">{program.deadline}</td>
                        <td className="px-6 py-4">
                          <Badge tone={program.scholarship === 'Available' ? 'success' : program.scholarship === 'Limited' ? 'warning' : 'neutral'}>
                            {program.scholarship}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[#E5E7EB] px-6 py-4">
                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] outline-none transition hover:text-[#034A48] focus:underline"
                  type="button"
                >
                  View all 28 programs
                  <ExternalLink size={15} />
                </button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Location</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Registered school address.</p>
                </div>
                <MapPin className="text-[#045A58]" size={20} />
              </div>

              <div className="space-y-4">
                <DetailItem label="Address" value={school.address} />
                <DetailItem label="City" value={school.city} />
                <DetailItem label="Country" value={school.country} />
                <DetailItem label="Postal code" value={school.postalCode} />
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Partnership</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Internal relationship ownership.</p>
                </div>
                <ShieldCheck className="text-[#045A58]" size={20} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#6B7280]">Status</span>
                  <Badge tone="success">{school.partnerStatus}</Badge>
                </div>
                <DetailItem label="Partner since" value={school.partnerSince} />
                <DetailItem label="Relationship manager" value={school.partnerManager} />
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Visa friendliness</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Internal advisor assessment.</p>
                </div>
                <ShieldCheck className="text-[#045A58]" size={20} />
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold text-[#111827]">{school.visaFriendlinessScore}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-normal text-[#6B7280]">Out of 100</p>
                </div>
                <Badge tone="success">Strong</Badge>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[#E5E7EB]">
                <div
                  className="h-2 rounded-full bg-[#045A58]"
                  style={{ width: `${school.visaFriendlinessScore}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#374151]">{school.visaFriendlinessNote}</p>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Reputation notes</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Internal guidance, not public ranking data.</p>
                </div>
                <Star className="text-[#045A58]" size={20} />
              </div>
              <p className="text-sm leading-6 text-[#374151]">{school.rankingNote}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-[#E5E7EB] pt-4 text-xs font-medium text-[#6B7280]">
                <CalendarDays size={15} />
                Reviewed {school.lastReviewed}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

type SummaryCardProps = {
  icon: typeof Building2
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

type DetailItemProps = {
  label: string
  value: string
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">{label}</p>
    <p className="mt-1 text-sm font-semibold text-[#111827]">{value}</p>
  </div>
)

type ContactItemProps = DetailItemProps & {
  icon: typeof Globe2
}

const ContactItem = ({ icon: Icon, label, value }: ContactItemProps) => (
  <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#045A58]">
      <Icon size={17} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#111827]">{value}</p>
    </div>
  </div>
)

export default SchoolDetailPage
