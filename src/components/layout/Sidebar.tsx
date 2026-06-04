import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  School,
  Settings,
  Sparkles,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn.js'

type NavItem = {
  icon: LucideIcon
  label: string
  path: string
}

type NavSection = {
  items: NavItem[]
  label: string
}

const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [{ icon: LayoutDashboard, label: 'Dashboard', path: '/' }],
  },
  {
    label: 'Operations',
    items: [
      { icon: Users, label: 'Students', path: '/students' },
      { icon: School, label: 'Schools', path: '/schools' },
      { icon: BookOpen, label: 'Programs', path: '/programs' },
      { icon: MessageSquareText, label: 'Conversations', path: '/conversations' },
      { icon: Sparkles, label: 'Recommendations', path: '/recommendations' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { icon: UserRoundCheck, label: 'Advisors', path: '/advisors' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ],
  },
]

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-[#E5E7EB] bg-white px-4 py-5 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
          <GraduationCap size={23} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">School Finder AI</p>
          <p className="text-xs font-medium text-[#6B7280]">Operations Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto pb-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition',
                        isActive
                          ? 'bg-[#E6F4F3] text-[#045A58]'
                          : 'text-[#6B7280] hover:bg-[#F5F6F8] hover:text-[#111827]',
                      )
                    }
                    end={item.path === '/'}
                    key={item.path}
                    to={item.path}
                  >
                    <Icon size={18} strokeWidth={2.1} />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
        <p className="text-sm font-semibold text-[#111827]">Internal workspace</p>
        <p className="mt-1 text-xs leading-5 text-[#6B7280]">
          Manage students, schools, recommendations, and advisor workflows.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
