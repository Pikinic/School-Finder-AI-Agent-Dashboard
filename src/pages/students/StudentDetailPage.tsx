import {
  ArrowLeft,
  BookOpen,
  CalendarPlus,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  School,
  SlidersHorizontal,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AssignAdvisorModal from '../../components/modals/AssignAdvisorModal.js'
import QuickStudentEntryModal, {
  type QuickEntryMode,
  type QuickEntryResult,
} from '../../components/modals/QuickStudentEntryModal.js'
import UpdateWorkflowStatusModal, {
  type WorkflowStatusOption,
} from '../../components/modals/UpdateWorkflowStatusModal.js'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'

type BadgeTone = 'brand' | 'neutral' | 'success' | 'warning' | 'error'

type StudentDetail = {
  academic: {
    background: string
    englishTest: string
    highestLevel: string
    score: string
  }
  advisor: string
  applicationStage: string
  budget: string
  conversationSummary: string
  destinationCountries: string[]
  email: string
  extractedFilters: string[]
  fullName: string
  id: string
  intake: string
  notes: Array<{
    author: string
    body: string
    category?: string
    date: string
    title?: string
  }>
  phone: string
  preferredProgram: string
  recommendedSchools: Array<{
    fit: number
    missing: string
    program: string
    reason: string
    school: string
  }>
  relocation: {
    scholarship: string
    studyLevel: string
    visaPriority: string
  }
  shortlistedSchools: string[]
  status: string
}

const studentDetail: StudentDetail = {
  academic: {
    background: 'BSc Accounting, University of Lagos',
    englishTest: 'IELTS',
    highestLevel: 'Undergraduate degree',
    score: 'Overall 7.0',
  },
  advisor: 'Amina Yusuf',
  applicationStage: 'Recommendation review',
  budget: '$18k - $24k USD per year',
  conversationSummary:
    'Student wants a Canada-focused business analytics pathway with scholarship options, visa-friendly schools, and a fall intake. IELTS is complete and budget is moderate.',
  destinationCountries: ['Canada', 'United Kingdom'],
  email: 'chinedu@example.com',
  extractedFilters: [
    'Canada preferred',
    'Business analytics',
    'Fall 2026 intake',
    'Scholarship interest',
    'Visa friendliness high',
    'IELTS complete',
  ],
  fullName: 'Chinedu Nwosu',
  id: 'STU-1048',
  intake: 'Fall 2026',
  notes: [
    {
      author: 'Amina Yusuf',
      body: 'Student is ready for a shortlist call. Confirm whether they will consider UK options if Canada deadlines are tight.',
      date: 'Today, 10:24 AM',
    },
    {
      author: 'Daniel Okafor',
      body: 'IELTS result received. Budget range is enough for partner colleges but scholarship preference should stay visible.',
      date: 'Yesterday, 4:10 PM',
    },
  ],
  phone: '+234 803 455 0192',
  preferredProgram: 'Business Analytics',
  recommendedSchools: [
    {
      fit: 92,
      missing: 'Confirm transcript format',
      program: 'Business Analytics',
      reason: 'Strong budget, intake, IELTS, and visa fit.',
      school: 'Northbridge College',
    },
    {
      fit: 88,
      missing: 'Scholarship deadline check',
      program: 'Data and Business Intelligence',
      reason: 'Good program match with flexible fall intake.',
      school: 'Maple Coast University',
    },
    {
      fit: 84,
      missing: 'English requirement review',
      program: 'Applied Business Analytics',
      reason: 'Partner school with strong advisor pathway.',
      school: 'Lakeside Institute',
    },
  ],
  relocation: {
    scholarship: 'Interested',
    studyLevel: 'Masters',
    visaPriority: 'High',
  },
  shortlistedSchools: ['Northbridge College', 'Maple Coast University'],
  status: 'Assigned',
}

const statusSteps = [
  { label: 'Lead captured', state: 'Done', tone: 'success' },
  { label: 'Advisor assigned', state: 'Done', tone: 'success' },
  { label: 'Recommendations', state: 'Current', tone: 'brand' },
  { label: 'Application', state: 'Pending', tone: 'neutral' },
] as const

const toneByStep: Record<(typeof statusSteps)[number]['tone'], BadgeTone> = {
  brand: 'brand',
  neutral: 'neutral',
  success: 'success',
}

const studentStatusOptions: WorkflowStatusOption[] = [
  {
    description: 'The lead has been captured and still requires initial operational review.',
    label: 'New',
    tone: 'brand',
  },
  {
    description: 'The lead is ready but has not yet been assigned to an advisor.',
    label: 'Awaiting assignment',
    tone: 'warning',
  },
  {
    description: 'An advisor owns the student workflow and active follow-up.',
    label: 'Assigned',
    tone: 'success',
  },
  {
    description: 'The student requires a scheduled or active follow-up from the advisor.',
    label: 'Follow-up',
    tone: 'warning',
  },
  {
    description: 'The student has moved into an active school application workflow.',
    label: 'Application started',
    tone: 'brand',
  },
  {
    description: 'The placement workflow is complete and no further operational action is pending.',
    label: 'Completed',
    tone: 'neutral',
  },
]

const studentStatusTone: Record<string, BadgeTone> = Object.fromEntries(
  studentStatusOptions.map((option) => [option.label, option.tone]),
)

const StudentDetailPage = () => {
  const { studentId } = useParams()
  const displayId = studentId ?? studentDetail.id
  const [assignedAdvisor, setAssignedAdvisor] = useState(studentDetail.advisor)
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false)
  const [studentStatus, setStudentStatus] = useState(studentDetail.status)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [notes, setNotes] = useState(studentDetail.notes)
  const [followUps, setFollowUps] = useState<
    Array<Extract<QuickEntryResult, { mode: 'follow-up' }>>
  >([])
  const [quickEntryMode, setQuickEntryMode] = useState<QuickEntryMode>('note')
  const [isQuickEntryModalOpen, setIsQuickEntryModalOpen] = useState(false)
  const profileItems = [
    { label: 'Email', value: studentDetail.email, icon: Mail },
    { label: 'Phone', value: studentDetail.phone, icon: Phone },
    { label: 'Student ID', value: displayId, icon: ClipboardList },
    { label: 'Advisor', value: assignedAdvisor, icon: UserRoundCheck },
  ] as const

  const openQuickEntry = (mode: QuickEntryMode) => {
    setQuickEntryMode(mode)
    setIsQuickEntryModalOpen(true)
  }

  const saveQuickEntry = (entry: QuickEntryResult) => {
    if (entry.mode === 'note') {
      setNotes((current) => [
        {
          author: 'Amina Yusuf',
          body: entry.body,
          category: entry.category,
          date: 'Just now',
          title: entry.title,
        },
        ...current,
      ])
    } else {
      setFollowUps((current) => [entry, ...current])
      setStudentStatus('Follow-up')
    }

    setIsQuickEntryModalOpen(false)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
              to="/students"
            >
              <ArrowLeft size={16} />
              Students / Leads
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">
                {studentDetail.fullName}
              </h1>
              <Badge tone={studentStatusTone[studentStatus] ?? 'neutral'}>{studentStatus}</Badge>
              <Badge tone="neutral">{displayId}</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Complete student context for advisor review, recommendation decisions, and application workflow tracking.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              leftIcon={<UserRoundCheck size={17} />}
              onClick={() => setIsAdvisorModalOpen(true)}
              size="md"
              variant="secondary"
            >
              Assign advisor
            </Button>
            <Button leftIcon={<RefreshCw size={17} />} size="md">
              Refresh recommendations
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#E6F4F3] text-lg font-semibold text-[#045A58]">
                  CN
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[#111827]">Basic profile</h2>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    {studentDetail.preferredProgram} applicant for {studentDetail.intake}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {profileItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <div className="flex items-start gap-3" key={item.label}>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#045A58]">
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#111827]">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Application status</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {studentDetail.applicationStage} / {studentStatus}
                  </p>
                </div>
                <button
                  aria-label="Update student workflow status"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#045A58] outline-none transition hover:bg-[#E6F4F3] focus:ring-4 focus:ring-[#E6F4F3]"
                  onClick={() => setIsStatusModalOpen(true)}
                  title="Update status"
                  type="button"
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {statusSteps.map((step) => (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] p-3" key={step.label}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={step.tone === 'neutral' ? 'text-[#9CA3AF]' : 'text-[#045A58]'} size={18} />
                      <span className="text-sm font-semibold text-[#111827]">{step.label}</span>
                    </div>
                    <Badge tone={toneByStep[step.tone]}>{step.state}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                  <School size={19} />
                </div>
                <p className="text-sm font-medium text-[#6B7280]">Destination</p>
                <p className="mt-2 text-lg font-semibold text-[#111827]">
                  {studentDetail.destinationCountries.join(', ')}
                </p>
              </Card>
              <Card>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                  <BookOpen size={19} />
                </div>
                <p className="text-sm font-medium text-[#6B7280]">Program</p>
                <p className="mt-2 text-lg font-semibold text-[#111827]">{studentDetail.preferredProgram}</p>
              </Card>
              <Card>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                  <GraduationCap size={19} />
                </div>
                <p className="text-sm font-medium text-[#6B7280]">Budget and intake</p>
                <p className="mt-2 text-lg font-semibold text-[#111827]">{studentDetail.intake}</p>
                <p className="mt-1 text-sm text-[#6B7280]">{studentDetail.budget}</p>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <h2 className="text-lg font-semibold text-[#111827]">Relocation preferences</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                  {Object.entries(studentDetail.relocation).map(([label, value]) => (
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4" key={label}>
                      <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">
                        {label.replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#111827]">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold text-[#111827]">Academic background</h2>
                <div className="mt-5 space-y-4">
                  {Object.entries(studentDetail.academic).map(([label, value]) => (
                    <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-3 last:border-b-0 last:pb-0" key={label}>
                      <p className="text-sm font-medium capitalize text-[#6B7280]">{label.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="max-w-[60%] text-right text-sm font-semibold text-[#111827]">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">AI-extracted filters</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Filters captured from the Telegram conversation.</p>
                </div>
                <Sparkles className="text-[#045A58]" size={20} />
              </div>
              <div className="flex flex-wrap gap-2">
                {studentDetail.extractedFilters.map((filter) => (
                  <Badge tone="brand" key={filter}>
                    {filter}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="p-0">
            <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Recommended schools</h2>
                <p className="mt-1 text-sm text-[#6B7280]">Score, reasons, and missing requirements.</p>
              </div>
              <Button leftIcon={<Sparkles size={17} />} size="md" variant="secondary">
                Generate
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                    <th className="px-6 py-3">School</th>
                    <th className="px-6 py-3">Program</th>
                    <th className="px-6 py-3">Reason</th>
                    <th className="px-6 py-3">Missing requirement</th>
                    <th className="px-6 py-3 text-right">Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {studentDetail.recommendedSchools.map((recommendation) => (
                    <tr className="transition hover:bg-[#F9FAFB]" key={recommendation.school}>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{recommendation.school}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{recommendation.program}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{recommendation.reason}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{recommendation.missing}</td>
                      <td className="px-6 py-4 text-right">
                        <Badge tone="success">{recommendation.fit}%</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Conversation summary</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Latest Telegram context.</p>
                </div>
                <MessageSquareText className="text-[#045A58]" size={20} />
              </div>
              <p className="text-sm leading-6 text-[#374151]">{studentDetail.conversationSummary}</p>
              <Button className="mt-5" leftIcon={<MessageSquareText size={17} />} size="md" variant="secondary">
                Open conversation
              </Button>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Shortlisted schools</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Advisor-selected options.</p>
                </div>
                <FileText className="text-[#045A58]" size={20} />
              </div>
              <div className="space-y-3">
                {studentDetail.shortlistedSchools.map((school) => (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] p-3" key={school}>
                    <p className="text-sm font-semibold text-[#111827]">{school}</p>
                    <Badge tone="brand">Shortlisted</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Advisor notes</h2>
              <p className="mt-1 text-sm text-[#6B7280]">Internal notes for follow-up and application handling.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                leftIcon={<CalendarPlus size={17} />}
                onClick={() => openQuickEntry('follow-up')}
                size="md"
                variant="secondary"
              >
                Schedule follow-up
              </Button>
              <Button
                leftIcon={<MessageSquareText size={17} />}
                onClick={() => openQuickEntry('note')}
                size="md"
              >
                Add note
              </Button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
            <div className="space-y-3">
              {notes.map((note, index) => (
                <div
                  className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4"
                  key={`${note.author}-${note.date}-${index}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {note.title ? (
                          <p className="text-sm font-semibold text-[#111827]">{note.title}</p>
                        ) : null}
                        {note.category ? <Badge tone="neutral">{note.category}</Badge> : null}
                      </div>
                      <p className={note.title ? 'mt-1 text-xs font-medium text-[#6B7280]' : 'text-sm font-semibold text-[#111827]'}>
                        {note.author}
                      </p>
                    </div>
                    <p className="text-xs font-medium text-[#6B7280]">{note.date}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#374151]">{note.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">Scheduled follow-ups</h3>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Upcoming advisor actions for this student.
                  </p>
                </div>
                <Badge tone={followUps.length ? 'warning' : 'neutral'}>{followUps.length}</Badge>
              </div>

              {followUps.length ? (
                <div className="mt-4 space-y-3">
                  {followUps.map((followUp, index) => (
                    <div
                      className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3"
                      key={`${followUp.subject}-${followUp.date}-${index}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#111827]">{followUp.subject}</p>
                        <Badge tone={followUp.priority === 'Urgent' ? 'error' : followUp.priority === 'High' ? 'warning' : 'neutral'}>
                          {followUp.priority}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs font-medium text-[#045A58]">
                        {formatFollowUpDate(followUp.date, followUp.time)}
                      </p>
                      <p className="mt-1 text-xs text-[#6B7280]">{followUp.channel}</p>
                      {followUp.note ? (
                        <p className="mt-2 text-sm leading-5 text-[#4B5563]">{followUp.note}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-4 py-6 text-center">
                  <CalendarPlus className="mx-auto text-[#9CA3AF]" size={20} />
                  <p className="mt-2 text-sm font-medium text-[#374151]">No follow-up scheduled</p>
                  <button
                    className="mt-2 text-sm font-semibold text-[#045A58] outline-none hover:text-[#034A48] focus:underline"
                    onClick={() => openQuickEntry('follow-up')}
                    type="button"
                  >
                    Schedule the next action
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <AssignAdvisorModal
        currentAdvisor={assignedAdvisor}
        isOpen={isAdvisorModalOpen}
        onAssign={(advisor) => {
          setAssignedAdvisor(advisor.name)
          setIsAdvisorModalOpen(false)
        }}
        onClose={() => setIsAdvisorModalOpen(false)}
        studentName={studentDetail.fullName}
      />
      <UpdateWorkflowStatusModal
        currentStatus={studentStatus}
        entityName={studentDetail.fullName}
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onUpdate={(status) => {
          setStudentStatus(status.label)
          setIsStatusModalOpen(false)
        }}
        options={studentStatusOptions}
        workflowLabel="Student workflow"
      />
      <QuickStudentEntryModal
        isOpen={isQuickEntryModalOpen}
        mode={quickEntryMode}
        onClose={() => setIsQuickEntryModalOpen(false)}
        onSave={saveQuickEntry}
        studentName={studentDetail.fullName}
      />
    </AppShell>
  )
}

const formatFollowUpDate = (date: string, time: string) => {
  const formattedDate = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))

  if (!time) return formattedDate

  const formattedTime = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(`${date}T${time}:00`))

  return `${formattedDate}, ${formattedTime}`
}

export default StudentDetailPage
