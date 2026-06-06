import { ArrowLeft, BookOpen, Building2, MapPin } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProgramForm from '../../components/forms/ProgramForm.js'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Card from '../../components/ui/Card.js'

const school = {
  city: 'Toronto',
  country: 'Canada',
  id: 'SCH-2048',
  name: 'Northbridge College',
  programCount: 28,
  status: 'Active',
}

const AddProgramPage = () => {
  const navigate = useNavigate()
  const { schoolId } = useParams()
  const displayId = schoolId ?? school.id
  const schoolPath = `/schools/${displayId}`

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
            to={schoolPath}
          >
            <ArrowLeft size={16} />
            {school.name}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">Add program</h1>
            <Badge tone="neutral">{displayId}</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
            Add a structured program record to this school for advisor search, student matching, and application planning.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <ProgramForm
            onCancel={() => navigate(schoolPath)}
            onSubmit={(event) => {
              event.preventDefault()
              navigate(schoolPath)
            }}
            schoolName={school.name}
          />

          <aside className="space-y-6 xl:sticky xl:top-26 xl:self-start">
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                  <Building2 size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Adding to</p>
                  <h2 className="mt-1 text-lg font-semibold text-[#111827]">{school.name}</h2>
                </div>
              </div>
              <div className="mt-5 space-y-4 border-t border-[#E5E7EB] pt-5">
                <SummaryItem icon={<MapPin size={16} />} label="Location" value={`${school.city}, ${school.country}`} />
                <SummaryItem icon={<BookOpen size={16} />} label="Current programs" value={String(school.programCount)} />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#6B7280]">Record status</span>
                  <Badge tone="success">{school.status}</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-[#111827]">Program ownership</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                This program will belong to {school.name}. It will also appear in the global Programs directory.
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}

const SummaryItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
      {icon}
      {label}
    </span>
    <span className="text-sm font-semibold text-[#111827]">{value}</span>
  </div>
)

export default AddProgramPage
