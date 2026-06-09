import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  KeyRound,
  MailPlus,
  MoreHorizontal,
  Power,
  PowerOff,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRoundCheck,
  UserRoundX,
  UsersRound,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

type AccountStatus = 'Active' | 'Disabled' | 'Invited'
type TeamRole = 'Admin' | 'Advisor' | 'Operations'

type TeamMember = {
  email: string
  fullName: string
  id: string
  invitedAt: string
  lastLogin: string
  phone?: string
  role: TeamRole
  status: AccountStatus
}

const teamMembers: TeamMember[] = [
  {
    email: 'amina@pikinic.example',
    fullName: 'Amina Yusuf',
    id: 'USR-1001',
    invitedAt: 'January 12, 2025',
    lastLogin: 'Today, 8:42 AM',
    phone: '+234 803 555 0101',
    role: 'Admin',
    status: 'Active',
  },
  {
    email: 'daniel@pikinic.example',
    fullName: 'Daniel Okafor',
    id: 'USR-1002',
    invitedAt: 'February 4, 2025',
    lastLogin: 'Today, 9:18 AM',
    phone: '+234 806 555 0102',
    role: 'Advisor',
    status: 'Active',
  },
  {
    email: 'maya@pikinic.example',
    fullName: 'Maya Chen',
    id: 'USR-1003',
    invitedAt: 'March 18, 2025',
    lastLogin: 'Yesterday, 4:12 PM',
    role: 'Advisor',
    status: 'Active',
  },
  {
    email: 'tola@pikinic.example',
    fullName: 'Tola Adeyemi',
    id: 'USR-1004',
    invitedAt: 'June 7, 2026',
    lastLogin: 'Not yet signed in',
    phone: '+234 809 555 0104',
    role: 'Operations',
    status: 'Invited',
  },
  {
    email: 'nora@pikinic.example',
    fullName: 'Nora Williams',
    id: 'USR-1005',
    invitedAt: 'June 3, 2026',
    lastLogin: 'Not yet signed in',
    role: 'Advisor',
    status: 'Invited',
  },
  {
    email: 'samuel@pikinic.example',
    fullName: 'Samuel Eze',
    id: 'USR-1006',
    invitedAt: 'August 9, 2025',
    lastLogin: 'May 12, 2026',
    role: 'Operations',
    status: 'Disabled',
  },
]

const statusTone: Record<AccountStatus, 'error' | 'success' | 'warning'> = {
  Active: 'success',
  Disabled: 'error',
  Invited: 'warning',
}

const roleTone: Record<TeamRole, 'brand' | 'neutral' | 'success'> = {
  Admin: 'brand',
  Advisor: 'success',
  Operations: 'neutral',
}

const teamStats = [
  { icon: UsersRound, label: 'Team members', note: 'Across all internal roles', value: '18' },
  { icon: CheckCircle2, label: 'Active accounts', note: 'Can currently sign in', value: '14' },
  { icon: MailPlus, label: 'Pending invites', note: 'Awaiting account setup', value: '3' },
  { icon: UserRoundX, label: 'Disabled', note: 'Access has been removed', value: '1' },
] as const

const TeamPage = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('All roles')
  const [status, setStatus] = useState('All statuses')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('[data-team-menu]')) {
        setOpenMenuId(null)
      }
    }

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', closeMenu)
    document.addEventListener('keydown', closeMenuOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeMenu)
      document.removeEventListener('keydown', closeMenuOnEscape)
    }
  }, [])

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return teamMembers.filter((member) => {
      const matchesQuery =
        !normalizedQuery ||
        member.fullName.toLowerCase().includes(normalizedQuery) ||
        member.email.toLowerCase().includes(normalizedQuery) ||
        member.id.toLowerCase().includes(normalizedQuery)

      return (
        matchesQuery &&
        (role === 'All roles' || member.role === role) &&
        (status === 'All statuses' || member.status === status)
      )
    })
  }, [query, role, status])

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Administration</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Team</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Manage internal accounts, invitations, roles, permissions, and access status.
            </p>
          </div>

          <Button leftIcon={<MailPlus size={17} />} onClick={() => navigate('/team/invite')} size="md">
            Invite team member
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {teamStats.map((stat) => {
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
                <h2 className="text-lg font-semibold text-[#111827]">Internal accounts</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Advisors, operations staff, and administrators use the shared login page.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_160px_160px] xl:w-[720px]">
                <Input
                  className="h-11 bg-[#F9FAFB]"
                  id="team-search"
                  leftIcon={<Search size={18} />}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, email, or user ID"
                  type="search"
                  value={query}
                />
                <FilterSelect
                  label="Role"
                  onChange={setRole}
                  options={['All roles', 'Admin', 'Advisor', 'Operations']}
                  value={role}
                />
                <FilterSelect
                  label="Status"
                  onChange={setStatus}
                  options={['All statuses', 'Active', 'Invited', 'Disabled']}
                  value={status}
                />
              </div>
            </div>
          </div>

          {filteredMembers.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-normal text-[#6B7280]">
                    <th className="px-6 py-3">Team member</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Account status</th>
                    <th className="px-6 py-3">Last login</th>
                    <th className="px-6 py-3">Invited</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredMembers.map((member) => (
                    <tr className="transition hover:bg-[#F9FAFB]" key={member.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                            {member.fullName
                              .split(' ')
                              .map((name) => name[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">{member.fullName}</p>
                            <p className="mt-1 text-xs font-medium text-[#6B7280]">
                              {member.email} / {member.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge tone={roleTone[member.role]}>{member.role}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge tone={statusTone[member.status]}>{member.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
                          <Clock3 size={15} />
                          {member.lastLogin}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{member.invitedAt}</td>
                      <td className="px-6 py-4">
                        <div className="relative flex justify-end" data-team-menu>
                          <button
                            aria-expanded={openMenuId === member.id}
                            aria-haspopup="menu"
                            aria-label={`Manage ${member.fullName}`}
                            className={`flex h-9 w-9 items-center justify-center rounded-xl outline-none transition focus:ring-4 focus:ring-[#E6F4F3] ${
                              openMenuId === member.id
                                ? 'bg-[#E6F4F3] text-[#045A58]'
                                : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                            }`}
                            onClick={() =>
                              setOpenMenuId((currentId) => (currentId === member.id ? null : member.id))
                            }
                            title="Manage account"
                            type="button"
                          >
                            <MoreHorizontal size={17} />
                          </button>

                          {openMenuId === member.id ? (
                            <div
                              aria-label={`Actions for ${member.fullName}`}
                              className="absolute right-0 top-11 z-30 w-64 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white py-1.5 text-left shadow-[0_14px_36px_rgba(17,24,39,0.14)]"
                              role="menu"
                            >
                              <TeamMenuAction icon={<Eye size={16} />} label="View account" />
                              <TeamMenuAction
                                icon={<KeyRound size={16} />}
                                label="Edit role & permissions"
                              />

                              <div className="my-1.5 border-t border-[#E5E7EB]" />

                              {member.status === 'Invited' ? (
                                <>
                                  <TeamMenuAction
                                    icon={<RefreshCw size={16} />}
                                    label="Resend invitation"
                                  />
                                  <TeamMenuAction
                                    danger
                                    icon={<PowerOff size={16} />}
                                    label="Cancel invitation"
                                  />
                                </>
                              ) : member.status === 'Active' ? (
                                <TeamMenuAction
                                  danger
                                  icon={<PowerOff size={16} />}
                                  label="Disable account"
                                />
                              ) : (
                                <TeamMenuAction icon={<Power size={16} />} label="Activate account" />
                              )}
                            </div>
                          ) : null}
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
                <UsersRound size={21} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111827]">No team members match these filters</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Clear the current search, role, and status filters to return to the team directory.
              </p>
              <Button
                className="mt-5"
                onClick={() => {
                  setQuery('')
                  setRole('All roles')
                  setStatus('All statuses')
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
              Showing <span className="font-semibold text-[#111827]">{filteredMembers.length}</span> of{' '}
              <span className="font-semibold text-[#111827]">18</span> team members
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

        <div className="grid gap-6 xl:grid-cols-3">
          <RoleSummary
            description="Full system access, team management, and operational oversight."
            icon={<ShieldCheck size={19} />}
            label="Admins"
            value="3"
          />
          <RoleSummary
            description="Assigned students, conversations, recommendations, and follow-ups."
            icon={<UserRoundCheck size={19} />}
            label="Advisors"
            value="9"
          />
          <RoleSummary
            description="School, program, and operational data maintenance."
            icon={<UsersRound size={19} />}
            label="Operations"
            value="6"
          />
        </div>
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

const TeamMenuAction = ({
  danger = false,
  icon,
  label,
}: {
  danger?: boolean
  icon: React.ReactNode
  label: string
}) => (
  <button
    className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium outline-none transition focus:bg-[#F3F4F6] ${
      danger
        ? 'text-[#B42318] hover:bg-[#FEF3F2]'
        : 'text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]'
    }`}
    role="menuitem"
    type="button"
  >
    <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
    {label}
  </button>
)

const RoleSummary = ({
  description,
  icon,
  label,
  value,
}: {
  description: string
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <Card>
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#111827]">{label}</h2>
          <Badge tone="neutral">{value}</Badge>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">{description}</p>
      </div>
    </div>
  </Card>
)

export default TeamPage
