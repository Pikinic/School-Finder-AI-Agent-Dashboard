import { ArrowLeft, BookOpen, Building2, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
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

const GlobalAddProgramPage = () => {
  const navigate = useNavigate()

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
            to="/programs"
          >
            <ArrowLeft size={16} />
            Programs
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">Add program</h1>
            <Badge tone="brand">Global directory</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
            Select the parent school and add a structured program record to the shared academic directory.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <ProgramForm
            onCancel={() => navigate('/programs')}
            onSubmit={(event) => {
              event.preventDefault()
              navigate('/programs')
            }}
            school={{ mode: 'select', options: schoolOptions }}
          />

          <aside className="space-y-6 xl:sticky xl:top-26 xl:self-start">
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                  <Building2 size={19} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">School assignment</h2>
                  <p className="mt-1 text-sm leading-5 text-[#6B7280]">Required for every program record.</p>
                </div>
              </div>
              <p className="mt-5 border-t border-[#E5E7EB] pt-5 text-sm leading-6 text-[#374151]">
                The selected school becomes the program owner. The program will also appear under that school&apos;s Related programs section.
              </p>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <Search className="mt-0.5 shrink-0 text-[#045A58]" size={19} />
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Directory visibility</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Program details support global filtering, advisor comparison, and student recommendation matching.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-[#E5E7EB] pt-4 text-sm font-medium text-[#6B7280]">
                <BookOpen size={16} />
                Shared program record
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}

export default GlobalAddProgramPage
