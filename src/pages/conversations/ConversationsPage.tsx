import {
  AlertTriangle,
  ArrowDownUp,
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  MessageSquareText,
  Search,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'
import { cn } from '../../utils/cn.js'

type ConversationStatus = 'Active' | 'Escalated' | 'Resolved'

type Conversation = {
  advisor?: string
  extractedFilters: string[]
  id: string
  lastMessage: string
  messageCount: number
  startedAt: string
  status: ConversationStatus
  student: string
  studentId: string
  summary: string
  unreadCount: number
}

const conversations: Conversation[] = [
  {
    advisor: 'Amina Yusuf',
    extractedFilters: ['Canada', 'Business Analytics', 'Fall 2026', 'Scholarship'],
    id: 'CON-4812',
    lastMessage: '18 min ago',
    messageCount: 34,
    startedAt: 'June 5, 2026',
    status: 'Active',
    student: 'Chinedu Nwosu',
    studentId: 'STU-1048',
    summary:
      'Student wants a Canada-focused postgraduate business analytics program with scholarship options and a moderate annual budget.',
    unreadCount: 2,
  },
  {
    extractedFilters: ['United Kingdom', 'Public Health', 'Spring 2027'],
    id: 'CON-4811',
    lastMessage: '42 min ago',
    messageCount: 21,
    startedAt: 'June 6, 2026',
    status: 'Escalated',
    student: 'Sofia Ahmed',
    studentId: 'STU-1047',
    summary:
      'Student needs human guidance on public-health entry requirements and whether prior clinical experience is mandatory.',
    unreadCount: 5,
  },
  {
    advisor: 'Daniel Okafor',
    extractedFilters: ['Australia', 'Computer Science', 'Fall 2026', 'IELTS pending'],
    id: 'CON-4810',
    lastMessage: '1 hr ago',
    messageCount: 46,
    startedAt: 'June 2, 2026',
    status: 'Active',
    student: 'Emeka Ibe',
    studentId: 'STU-1046',
    summary:
      'Student is comparing Australian computing programs and needs clarification on English-test timing and application deadlines.',
    unreadCount: 0,
  },
  {
    advisor: 'Maya Chen',
    extractedFilters: ['Canada', 'Nursing', 'Winter 2027', 'Visa priority'],
    id: 'CON-4809',
    lastMessage: '2 hrs ago',
    messageCount: 29,
    startedAt: 'June 1, 2026',
    status: 'Escalated',
    student: 'Grace Okorie',
    studentId: 'STU-1045',
    summary:
      'Student is seeking nursing pathways with strong visa support and requires advisor review of academic prerequisites.',
    unreadCount: 1,
  },
  {
    extractedFilters: ['United States', 'Data Science', 'Fall 2026'],
    id: 'CON-4808',
    lastMessage: 'Yesterday',
    messageCount: 18,
    startedAt: 'May 30, 2026',
    status: 'Active',
    student: 'Malik Bello',
    studentId: 'STU-1044',
    summary:
      'Student has provided a destination and program preference but has not confirmed budget, English test, or academic background.',
    unreadCount: 0,
  },
  {
    advisor: 'Amina Yusuf',
    extractedFilters: ['Germany', 'Mechanical Engineering', 'Summer 2027'],
    id: 'CON-4807',
    lastMessage: 'June 4, 2026',
    messageCount: 38,
    startedAt: 'May 25, 2026',
    status: 'Resolved',
    student: 'Tara Mensah',
    studentId: 'STU-1043',
    summary:
      'Initial qualification review is complete and the student has received a shortlist of German engineering programs.',
    unreadCount: 0,
  },
]

const statusTone: Record<ConversationStatus, 'brand' | 'error' | 'success'> = {
  Active: 'brand',
  Escalated: 'error',
  Resolved: 'success',
}

const statusTabs = ['All', 'Active', 'Escalated', 'Resolved', 'Unassigned'] as const

const conversationStats = [
  { icon: MessageSquareText, label: 'Active', note: '12 new today', value: '84' },
  { icon: AlertTriangle, label: 'Escalated', note: 'Needs human review', value: '9' },
  { icon: Users, label: 'Unassigned', note: 'Awaiting advisor', value: '17' },
  { icon: CheckCircle2, label: 'Resolved', note: 'This month', value: '126' },
] as const

const ConversationsPage = () => {
  const [advisor, setAdvisor] = useState('All advisors')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statusTabs)[number]>('All')

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return conversations.filter((conversation) => {
      const matchesQuery =
        !normalizedQuery ||
        conversation.student.toLowerCase().includes(normalizedQuery) ||
        conversation.studentId.toLowerCase().includes(normalizedQuery) ||
        conversation.summary.toLowerCase().includes(normalizedQuery) ||
        conversation.extractedFilters.some((filter) => filter.toLowerCase().includes(normalizedQuery))
      const matchesStatus =
        status === 'All' ||
        (status === 'Unassigned' ? !conversation.advisor : conversation.status === status)
      const matchesAdvisor =
        advisor === 'All advisors' ||
        (advisor === 'Unassigned' ? !conversation.advisor : conversation.advisor === advisor)

      return matchesQuery && matchesStatus && matchesAdvisor
    })
  }, [advisor, query, status])

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Telegram operations</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Conversations</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Review AI-agent conversations, identify escalations, and route students to the right advisor.
            </p>
          </div>

          <Button leftIcon={<ArrowDownUp size={17} />} size="md" variant="secondary">
            Latest activity
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {conversationStats.map((stat) => {
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
          <div className="border-b border-[#E5E7EB] px-5 pt-5 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Conversation queue</h2>
                <p className="mt-1 text-sm text-[#6B7280]">Prioritize unread, escalated, and unassigned conversations.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_190px] xl:w-[620px]">
                <Input
                  className="h-11 bg-[#F9FAFB]"
                  id="conversation-search"
                  leftIcon={<Search size={18} />}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search student, summary, or filter"
                  type="search"
                  value={query}
                />
                <select
                  aria-label="Filter by advisor"
                  className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                  onChange={(event) => setAdvisor(event.target.value)}
                  value={advisor}
                >
                  <option>All advisors</option>
                  <option>Unassigned</option>
                  <option>Amina Yusuf</option>
                  <option>Daniel Okafor</option>
                  <option>Maya Chen</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex gap-1 overflow-x-auto">
              {statusTabs.map((tab) => (
                <button
                  className={cn(
                    'h-10 shrink-0 border-b-2 px-4 text-sm font-semibold outline-none transition',
                    status === tab
                      ? 'border-[#045A58] text-[#045A58]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827]',
                  )}
                  key={tab}
                  onClick={() => setStatus(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredConversations.length ? (
            <div className="divide-y divide-[#E5E7EB]">
              {filteredConversations.map((conversation) => (
                <article className="px-5 py-5 transition hover:bg-[#F9FAFB] sm:px-6" key={conversation.id}>
                  <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)_210px_96px] xl:items-start">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                        {conversation.student
                          .split(' ')
                          .map((name) => name[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-[#111827]">{conversation.student}</p>
                          {conversation.unreadCount ? (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#045A58] px-1.5 text-[11px] font-bold text-white">
                              {conversation.unreadCount}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#6B7280]">
                          {conversation.studentId} · {conversation.id}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge tone={statusTone[conversation.status]}>{conversation.status}</Badge>
                          <Badge tone="neutral">{conversation.messageCount} messages</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">
                        <Bot size={15} />
                        AI summary
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#374151]">{conversation.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {conversation.extractedFilters.map((filter) => (
                          <Badge className="h-6 px-2" key={filter} tone="brand">
                            {filter}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Assigned advisor</p>
                        {conversation.advisor ? (
                          <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
                            <UserRoundCheck className="text-[#045A58]" size={16} />
                            {conversation.advisor}
                          </p>
                        ) : (
                          <Badge className="mt-2" tone="warning">Unassigned</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <Clock3 size={15} />
                        {conversation.lastMessage}
                      </div>
                      <p className="text-xs font-medium text-[#9CA3AF]">Started {conversation.startedAt}</p>
                    </div>

                    <div className="flex xl:justify-end">
                      <Button leftIcon={<Eye size={16} />} size="sm" variant="ghost">
                        Open
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                <MessageSquareText size={21} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111827]">No conversations match this view</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Change the status, advisor, or search filters to return to the conversation queue.
              </p>
              <Button
                className="mt-5"
                onClick={() => {
                  setAdvisor('All advisors')
                  setQuery('')
                  setStatus('All')
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
              Showing <span className="font-semibold text-[#111827]">{filteredConversations.length}</span> of{' '}
              <span className="font-semibold text-[#111827]">236</span> conversations
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

export default ConversationsPage
