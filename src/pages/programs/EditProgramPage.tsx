import { ArrowLeft, BookOpen, Building2, CalendarDays } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProgramForm from '../../components/forms/ProgramForm.js'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Card from '../../components/ui/Card.js'

const schoolOptions = [
  { id: 'SCH-2048', name: 'Northbridge College' },
  { id: 'SCH-2047', name: 'Maple Coast University' },
  { id: 'SCH-2046', name: 'Westhaven University' },
  { id: 'SCH-2045', name: 'Harbour Institute' },
  { id: 'SCH-2043', name: 'Linden Technical Institute' },
]

const program = {
  academicRequirement:
    'A recognized undergraduate degree with a minimum second-class standing. Applicants should have completed at least one quantitative or statistics course.',
  applicationDeadline: '2026-06-30',
  category: 'Business',
  duration: '16 months',
  englishRequirement:
    'IELTS Academic overall 6.5 with no band below 6.0, or an accepted equivalent English-language test.',
  id: 'PRG-3108',
  intakePeriods: ['Fall', 'Winter'],
  intakeYear: '2026',
  level: 'Postgraduate',
  name: 'Business Analytics',
  notes:
    'Prioritize applicants with business, accounting, economics, computing, or quantitative backgrounds. Confirm transcript format before final application review.',
  scholarshipAvailable: true,
  schoolId: 'SCH-2048',
  schoolName: 'Northbridge College',
  tuitionAmount: '22400',
  tuitionCurrency: 'CAD',
}

const EditProgramPage = () => {
  const navigate = useNavigate()
  const { programId } = useParams()
  const displayId = programId ?? program.id
  const detailPath = `/programs/${displayId}`

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
            to={detailPath}
          >
            <ArrowLeft size={16} />
            {program.name}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">Edit program</h1>
            <Badge tone="neutral">{displayId}</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
            Update the shared program record used in school listings, advisor comparison, and student matching.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <ProgramForm
            initialValues={program}
            onCancel={() => navigate(detailPath)}
            onSubmit={(event) => {
              event.preventDefault()
              navigate(detailPath)
            }}
            school={{ mode: 'select', options: schoolOptions }}
            submitLabel="Save changes"
          />

          <aside className="space-y-6 xl:sticky xl:top-26 xl:self-start">
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                  <BookOpen size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Editing</p>
                  <h2 className="mt-1 text-lg font-semibold text-[#111827]">{program.name}</h2>
                </div>
              </div>
              <div className="mt-5 space-y-4 border-t border-[#E5E7EB] pt-5">
                <SummaryItem label="Program ID" value={displayId} />
                <SummaryItem label="Current school" value={program.schoolName} />
                <SummaryItem label="Study level" value={program.level} />
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 shrink-0 text-[#045A58]" size={19} />
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">School ownership</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Changing the school moves this same program record to another school. It does not create a duplicate.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 shrink-0 text-[#045A58]" size={19} />
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Directory impact</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Saved tuition, intake, deadline, and requirement changes will update both the Programs directory and the school record.
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-3 last:border-b-0 last:pb-0">
    <span className="text-sm text-[#6B7280]">{label}</span>
    <span className="max-w-[60%] text-right text-sm font-semibold text-[#111827]">{value}</span>
  </div>
)

export default EditProgramPage
