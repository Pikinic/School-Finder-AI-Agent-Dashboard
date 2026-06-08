import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
  UserRound,
  UserRoundCheck,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'

type Message = {
  author: string
  body: string
  id: string
  role: 'agent' | 'advisor' | 'student'
  time: string
}

const conversation = {
  advisor: 'Amina Yusuf',
  extractedFilters: [
    'Canada',
    'Business Analytics',
    'Postgraduate',
    'Fall 2026',
    'CAD 18k-24k',
    'Scholarship interest',
    'IELTS complete',
  ],
  id: 'CON-4812',
  lastActivity: '18 minutes ago',
  messageCount: 34,
  startedAt: 'June 5, 2026',
  status: 'Active',
  student: {
    email: 'chinedu@example.com',
    id: 'STU-1048',
    name: 'Chinedu Nwosu',
    phone: '+234 803 455 0192',
  },
  summary:
    'Student wants a Canada-focused postgraduate business analytics program with scholarship options and a moderate annual budget. IELTS is complete. The next useful step is advisor confirmation of shortlist priorities and application timing.',
}

const messages: Message[] = [
  {
    author: 'Chinedu Nwosu',
    body: 'Hello, I am looking for a postgraduate course in Canada. I studied Accounting and I want something related to business and data.',
    id: 'MSG-9001',
    role: 'student',
    time: 'June 5, 9:12 AM',
  },
  {
    author: 'Pikinic AI',
    body: 'I can help with that. Business Analytics may fit your background. What annual tuition budget are you considering, and which intake are you targeting?',
    id: 'MSG-9002',
    role: 'agent',
    time: 'June 5, 9:12 AM',
  },
  {
    author: 'Chinedu Nwosu',
    body: 'My budget is around 18,000 to 24,000 Canadian dollars per year. I prefer Fall 2026 and I would like scholarship options.',
    id: 'MSG-9003',
    role: 'student',
    time: 'June 5, 9:16 AM',
  },
  {
    author: 'Pikinic AI',
    body: 'Understood. Have you completed an English-language test such as IELTS, and is visa support an important factor in your school choice?',
    id: 'MSG-9004',
    role: 'agent',
    time: 'June 5, 9:16 AM',
  },
  {
    author: 'Chinedu Nwosu',
    body: 'Yes, my IELTS overall score is 7.0. Visa support is important, but the program quality and scholarship come first.',
    id: 'MSG-9005',
    role: 'student',
    time: 'June 5, 9:19 AM',
  },
  {
    author: 'Pikinic AI',
    body: 'Thanks. I have enough information to identify suitable options. I will prioritize Canadian postgraduate Business Analytics programs within your budget, with scholarship availability and strong international-student support.',
    id: 'MSG-9006',
    role: 'agent',
    time: 'June 5, 9:19 AM',
  },
  {
    author: 'Amina Yusuf',
    body: 'I have reviewed your preferences. I will confirm a shortlist and check which Fall 2026 deadlines should be handled first.',
    id: 'MSG-9007',
    role: 'advisor',
    time: 'Today, 10:24 AM',
  },
]

const ConversationDetailPage = () => {
  const { conversationId } = useParams()
  const displayId = conversationId ?? conversation.id

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
              to="/conversations"
            >
              <ArrowLeft size={16} />
              Conversations
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">
                {conversation.student.name}
              </h1>
              <Badge tone="brand">{conversation.status}</Badge>
              <Badge tone="neutral">{displayId}</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Review the Telegram message history, AI-extracted context, and advisor handoff state.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<AlertTriangle size={17} />} size="md" variant="secondary">
              Escalate
            </Button>
            <Button leftIcon={<CheckCircle2 size={17} />} size="md">
              Mark resolved
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="p-0">
            <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Message history</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {conversation.messageCount} messages since {conversation.startedAt}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#6B7280]">
                <Clock3 size={16} />
                Last activity {conversation.lastActivity}
              </div>
            </div>

            <div className="space-y-5 bg-[#F9FAFB] px-4 py-6 sm:px-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>

            <div className="border-t border-[#E5E7EB] bg-white p-4 sm:p-6">
              <label className="sr-only" htmlFor="advisor-reply">
                Reply to student
              </label>
              <textarea
                className="min-h-24 w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm leading-6 text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                id="advisor-reply"
                placeholder="Write an advisor reply..."
              />
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#6B7280]">
                  Advisor replies will be sent to the student through Telegram.
                </p>
                <Button leftIcon={<Send size={16} />} size="md">
                  Send reply
                </Button>
              </div>
            </div>
          </Card>

          <aside className="space-y-6 xl:sticky xl:top-26 xl:self-start">
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                  CN
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">{conversation.student.name}</h2>
                  <p className="mt-1 text-xs font-medium text-[#6B7280]">{conversation.student.id}</p>
                </div>
              </div>

              <div className="mt-5 space-y-4 border-t border-[#E5E7EB] pt-5">
                <ContactItem icon={<Mail size={16} />} value={conversation.student.email} />
                <ContactItem icon={<Phone size={16} />} value={conversation.student.phone} />
              </div>

              <Link
                className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#111827] outline-none transition hover:bg-[#F9FAFB] focus:ring-4 focus:ring-[#E6F4F3]"
                to={`/students/${conversation.student.id}`}
              >
                <UserRound size={16} />
                Open student record
              </Link>
            </Card>

            <Card>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">AI summary</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Current conversation context.</p>
                </div>
                <Sparkles className="text-[#045A58]" size={20} />
              </div>
              <p className="text-sm leading-6 text-[#374151]">{conversation.summary}</p>
            </Card>

            <Card>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Extracted filters</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Preferences captured by the agent.</p>
                </div>
                <Bot className="text-[#045A58]" size={20} />
              </div>
              <div className="flex flex-wrap gap-2">
                {conversation.extractedFilters.map((filter) => (
                  <Badge tone="brand" key={filter}>
                    {filter}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Assignment</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">Advisor ownership and workflow.</p>
                </div>
                <UserRoundCheck className="text-[#045A58]" size={20} />
              </div>

              <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor="conversation-advisor">
                Assigned advisor
              </label>
              <select
                className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                defaultValue={conversation.advisor}
                id="conversation-advisor"
              >
                <option>Unassigned</option>
                <option>Amina Yusuf</option>
                <option>Daniel Okafor</option>
                <option>Maya Chen</option>
              </select>

              <div className="mt-5 space-y-4 border-t border-[#E5E7EB] pt-5">
                <MetaItem
                  icon={<MessageSquareText size={16} />}
                  label="Messages"
                  value={String(conversation.messageCount)}
                />
                <MetaItem icon={<CalendarDays size={16} />} label="Started" value={conversation.startedAt} />
                <MetaItem icon={<Clock3 size={16} />} label="Last activity" value={conversation.lastActivity} />
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}

const MessageBubble = ({ message }: { message: Message }) => {
  const isStudent = message.role === 'student'
  const isAdvisor = message.role === 'advisor'

  return (
    <div className={`flex ${isStudent ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[min(100%,42rem)] ${isStudent ? '' : 'text-right'}`}>
        <div className={`mb-2 flex items-center gap-2 ${isStudent ? '' : 'justify-end'}`}>
          {message.role === 'agent' ? <Bot className="text-[#045A58]" size={15} /> : null}
          {isAdvisor ? <UserRoundCheck className="text-[#045A58]" size={15} /> : null}
          {isStudent ? <UserRound className="text-[#6B7280]" size={15} /> : null}
          <span className="text-xs font-semibold text-[#6B7280]">{message.author}</span>
          <span className="text-xs text-[#9CA3AF]">{message.time}</span>
        </div>
        <div
          className={`rounded-2xl px-4 py-3 text-left text-sm leading-6 ${
            isStudent
              ? 'rounded-tl-md border border-[#E5E7EB] bg-white text-[#374151]'
              : isAdvisor
                ? 'rounded-tr-md bg-[#045A58] text-white'
                : 'rounded-tr-md border border-[#B7D8D6] bg-[#E6F4F3] text-[#174544]'
          }`}
        >
          {message.body}
        </div>
      </div>
    </div>
  )
}

const ContactItem = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
  <div className="flex min-w-0 items-center gap-3 text-sm text-[#374151]">
    <span className="shrink-0 text-[#045A58]">{icon}</span>
    <span className="break-all">{value}</span>
  </div>
)

const MetaItem = ({
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
    <span className="text-right text-sm font-semibold text-[#111827]">{value}</span>
  </div>
)

export default ConversationDetailPage
