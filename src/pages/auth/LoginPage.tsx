import { ArrowRight, GraduationCap, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    localStorage.setItem('token', 'development-token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] px-4 py-8 text-[#111827] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className=" w-full overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)] lg:w-[440px]">
          
          <section className="p-6 sm:p-10">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
                <GraduationCap size={22} />
              </div>
              <span className="text-sm font-semibold">School Finder AI</span>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-[#045A58]">Staff Portal</p>
              <h2 className="text-2xl font-semibold tracking-normal text-[#111827]">Sign in to your workspace</h2>
              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                Use your company email and password to access student and school operations.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                  <input
                    className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="advisor@company.com"
                    type="email"
                    value={email}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-[#111827]" htmlFor="password">
                    Password
                  </label>
                  <button className="text-sm font-medium text-[#045A58] hover:text-[#034A48]" type="button">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                  <input
                    className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                    id="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    type="password"
                    value={password}
                  />
                </div>
              </div>

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#045A58] px-4 text-sm font-semibold text-white transition hover:bg-[#034A48] focus:outline-none focus:ring-4 focus:ring-[#E6F4F3]"
                type="submit"
              >
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
