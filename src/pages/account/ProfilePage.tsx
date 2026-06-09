import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  KeyRound,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import type { ReactNode } from 'react'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Card from '../../components/ui/Card.js'

const currentUser = {
  accountCreated: 'January 12, 2025',
  email: 'amina@pikinic.example',
  fullName: 'Amina Yusuf',
  id: 'USR-1001',
  lastLogin: 'Today, 8:42 AM',
  lastUpdated: 'June 6, 2026',
  permissions: ['Manage team access', 'View all students', 'Manage schools and programs', 'Access all workflows'],
  phone: '+234 803 555 0101',
  role: 'Admin',
  status: 'Active',
}

const recentActivity = [
  {
    description: 'Signed in successfully through the shared staff login page.',
    time: 'Today, 8:42 AM',
    title: 'Account login',
  },
  {
    description: 'Your team-management permissions were reviewed.',
    time: 'June 6, 2026',
    title: 'Permissions reviewed',
  },
  {
    description: 'Your profile contact information was updated.',
    time: 'May 22, 2026',
    title: 'Profile updated',
  },
]

const ProfilePage = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">Personal account</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">My profile</h1>
            <Badge tone="success">{currentUser.status}</Badge>
            <Badge tone="brand">{currentUser.role}</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
            Review your identity, assigned role, permissions, and account activity.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-[#E6F4F3] text-xl font-semibold text-[#045A58]">
                  AY
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-[#111827]">{currentUser.fullName}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    Internal {currentUser.role.toLowerCase()} account
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="success">{currentUser.status}</Badge>
                    <Badge tone="neutral">{currentUser.id}</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-6">
                <ProfileItem icon={<Mail size={17} />} label="Work email" value={currentUser.email} />
                <ProfileItem icon={<Phone size={17} />} label="Phone number" value={currentUser.phone} />
                <ProfileItem icon={<UserRound size={17} />} label="User ID" value={currentUser.id} />
                <ProfileItem icon={<Clock3 size={17} />} label="Last login" value={currentUser.lastLogin} />
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
                  <CalendarClock size={19} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Account information</h2>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    Authentication and profile record timestamps.
                  </p>
                </div>
              </div>

              <dl className="mt-5 divide-y divide-[#E5E7EB]">
                <DetailRow label="Account status" value={currentUser.status} />
                <DetailRow label="Account created" value={currentUser.accountCreated} />
                <DetailRow label="Profile last updated" value={currentUser.lastUpdated} />
                <DetailRow label="Last successful login" value={currentUser.lastLogin} />
              </dl>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
                  <ShieldCheck size={19} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Role and permissions</h2>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    Your access is assigned by an administrator through Team management.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Assigned role</p>
                    <p className="mt-1 text-base font-semibold text-[#111827]">{currentUser.role}</p>
                  </div>
                  <Badge tone="brand">{currentUser.permissions.length} permissions</Badge>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {currentUser.permissions.map((permission) => (
                  <div
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-[#E5E7EB] px-4 py-3"
                    key={permission}
                  >
                    <CheckCircle2 className="shrink-0 text-[#045A58]" size={17} />
                    <span className="text-sm font-medium text-[#374151]">{permission}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
                  <Clock3 size={19} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">Recent account activity</h2>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    Recent events associated with your own account.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {recentActivity.map((activity, index) => (
                  <div className="relative flex gap-4" key={`${activity.title}-${activity.time}`}>
                    {index < recentActivity.length - 1 ? (
                      <span className="absolute left-[7px] top-6 h-[calc(100%+4px)] w-px bg-[#E5E7EB]" />
                    ) : null}
                    <span className="relative mt-1.5 h-4 w-4 shrink-0 rounded-full border-4 border-[#E6F4F3] bg-[#045A58]" />
                    <div className="min-w-0 pb-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="text-sm font-semibold text-[#111827]">{activity.title}</p>
                        <p className="text-xs font-medium text-[#9CA3AF]">{activity.time}</p>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-[#6B7280]">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-[#B9DAD8] bg-[#F2F9F8]">
              <div className="flex items-start gap-3">
                <KeyRound className="mt-0.5 shrink-0 text-[#045A58]" size={19} />
                <div>
                  <h2 className="text-sm font-semibold text-[#111827]">Personal account boundaries</h2>
                  <p className="mt-1 text-sm leading-6 text-[#52605F]">
                    Your role, permissions, and account status are read-only here. Personal preferences and password changes belong in Account settings.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

const ProfileItem = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#045A58]">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#111827]">{value}</p>
    </div>
  </div>
)

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <dt className="text-sm text-[#6B7280]">{label}</dt>
    <dd className="text-sm font-semibold text-[#111827] sm:text-right">{value}</dd>
  </div>
)

export default ProfilePage
