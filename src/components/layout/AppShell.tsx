import type { ReactNode } from 'react'
import Sidebar from './Sidebar.js'

type AppShellProps = {
  children: ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#111827]">
      <Sidebar />
      <main className="min-h-screen lg:pl-72">
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

export default AppShell
