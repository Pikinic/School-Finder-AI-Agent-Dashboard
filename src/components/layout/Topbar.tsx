import { Bell, ChevronDown, LogOut, Menu, Plus, Search, Settings, UserRound } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button.js'
import Input from '../ui/Input.js'
import { cn } from '../../utils/cn.js'

type TopbarProps = {
  onMenuClick: () => void
}

const currentUser = {
  initials: 'AY',
  name: 'Amina Yusuf',
  role: 'Admin',
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          aria-label="Open navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] outline-none transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] hover:text-[#111827] focus:ring-4 focus:ring-[#E6F4F3] lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu size={19} />
        </button>

        <div className="min-w-0 flex-1">
          <Input
            className="h-11 max-w-xl bg-[#F9FAFB]"
            id="global-search"
            leftIcon={<Search size={18} />}
            placeholder="Search students, schools, programs, conversations..."
            type="search"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button className="hidden sm:inline-flex" leftIcon={<Plus size={17} />} size="md">
            Add student
          </Button>

          <button
            aria-label="View notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] outline-none transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] hover:text-[#111827] focus:ring-4 focus:ring-[#E6F4F3]"
            type="button"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#DC2626]" />
          </button>

          <div className="relative hidden md:block">
            <button
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
              className="flex h-11 items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-2.5 pr-3 outline-none transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus:ring-4 focus:ring-[#E6F4F3]"
              onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
              type="button"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                {currentUser.initials}
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold text-[#111827]">{currentUser.name}</span>
                <span className="block text-xs font-medium text-[#6B7280]">{currentUser.role}</span>
              </span>
              <ChevronDown
                className={cn('text-[#6B7280] transition-transform', isProfileMenuOpen && 'rotate-180')}
                size={16}
              />
            </button>

            {isProfileMenuOpen ? (
              <div
                className="absolute right-0 mt-2 w-60 rounded-[16px] border border-[#E5E7EB] bg-white p-2 shadow-[0_18px_45px_rgba(17,24,39,0.12)]"
                role="menu"
              >
                <div className="border-b border-[#E5E7EB] px-3 py-3">
                  <p className="text-sm font-semibold text-[#111827]">{currentUser.name}</p>
                  <p className="mt-1 text-xs font-medium text-[#6B7280]">{currentUser.role}</p>
                </div>

                <button
                  className="mt-2 flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F5F6F8]"
                  role="menuitem"
                  type="button"
                >
                  <UserRound size={17} />
                  View profile
                </button>
                <button
                  className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F5F6F8]"
                  role="menuitem"
                  type="button"
                >
                  <Settings size={17} />
                  Account settings
                </button>
                <button
                  className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEE2E2]"
                  role="menuitem"
                  type="button"
                >
                  <LogOut size={17} />
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
