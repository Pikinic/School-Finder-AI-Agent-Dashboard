import { ArrowRight, GraduationCap, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

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
        <Card className="w-full overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(17,24,39,0.08)] lg:w-[440px]" padded={false}>
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
              <Input
                id="email"
                label="Email address"
                leftIcon={<Mail size={18} />}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="advisor@company.com"
                type="email"
                value={email}
              />

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-[#111827]" htmlFor="password">
                    Password
                  </label>
                  <button className="text-sm font-medium text-[#045A58] hover:text-[#034A48]" type="button">
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  leftIcon={<LockKeyhole size={18} />}
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  type="password"
                  value={password}
                />
              </div>

              <Button
                className="w-full"
                rightIcon={<ArrowRight size={18} />}
                size="lg"
                type="submit"
              >
                Sign in
              </Button>
            </form>
          </section>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
