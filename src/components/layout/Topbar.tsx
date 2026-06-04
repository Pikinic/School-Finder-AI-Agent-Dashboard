import { Bell, ChevronDown, Menu, Plus, Search } from 'lucide-react'
import Button from '../ui/Button.js'
import Input from '../ui/Input.js'

type TopbarProps = {
  onMenuClick: () => void
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
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

          <button
            className="hidden h-11 items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-2.5 pr-3 outline-none transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus:ring-4 focus:ring-[#E6F4F3] md:flex"
            type="button"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
              SF
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-[#111827]">Staff Admin</span>
              <span className="block text-xs font-medium text-[#6B7280]">Operations</span>
            </span>
            <ChevronDown size={16} className="text-[#6B7280]" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
