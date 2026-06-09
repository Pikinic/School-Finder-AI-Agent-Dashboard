import {
  BookOpen,
  Check,
  CircleDot,
  ClipboardList,
  Flag,
  Globe2,
  GraduationCap,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

type ListSettingKey = 'countries' | 'categories' | 'studyLevels' | 'leadStatuses' | 'applicationStatuses'

type SettingItem = {
  active: boolean
  id: string
  label: string
}

type SettingsState = Record<ListSettingKey, SettingItem[]>

const initialSettings: SettingsState = {
  countries: [
    { active: true, id: 'country-ca', label: 'Canada' },
    { active: true, id: 'country-uk', label: 'United Kingdom' },
    { active: true, id: 'country-us', label: 'United States' },
    { active: true, id: 'country-au', label: 'Australia' },
    { active: true, id: 'country-de', label: 'Germany' },
  ],
  categories: [
    { active: true, id: 'category-business', label: 'Business' },
    { active: true, id: 'category-technology', label: 'Technology' },
    { active: true, id: 'category-engineering', label: 'Engineering' },
    { active: true, id: 'category-health', label: 'Health Sciences' },
    { active: false, id: 'category-arts', label: 'Arts and Humanities' },
  ],
  studyLevels: [
    { active: true, id: 'level-certificate', label: 'Certificate' },
    { active: true, id: 'level-diploma', label: 'Diploma' },
    { active: true, id: 'level-undergraduate', label: 'Undergraduate' },
    { active: true, id: 'level-postgraduate', label: 'Postgraduate' },
    { active: true, id: 'level-masters', label: 'Masters' },
    { active: true, id: 'level-doctorate', label: 'Doctorate' },
  ],
  leadStatuses: [
    { active: true, id: 'lead-new', label: 'New' },
    { active: true, id: 'lead-awaiting', label: 'Awaiting assignment' },
    { active: true, id: 'lead-assigned', label: 'Assigned' },
    { active: true, id: 'lead-follow-up', label: 'Follow-up' },
    { active: true, id: 'lead-qualified', label: 'Qualified' },
    { active: false, id: 'lead-closed', label: 'Closed' },
  ],
  applicationStatuses: [
    { active: true, id: 'application-draft', label: 'Draft' },
    { active: true, id: 'application-documents', label: 'Documents pending' },
    { active: true, id: 'application-submitted', label: 'Submitted' },
    { active: true, id: 'application-offer', label: 'Offer received' },
    { active: true, id: 'application-visa', label: 'Visa processing' },
    { active: true, id: 'application-completed', label: 'Completed' },
    { active: true, id: 'application-rejected', label: 'Rejected' },
  ],
}

const settingSections: {
  description: string
  icon: ReactNode
  key: ListSettingKey | 'recommendationWeights'
  label: string
}[] = [
  {
    description: 'Countries available in school, program, and student preference records.',
    icon: <Globe2 size={18} />,
    key: 'countries',
    label: 'Destination countries',
  },
  {
    description: 'Categories used to organize programs and student interests.',
    icon: <BookOpen size={18} />,
    key: 'categories',
    label: 'Program categories',
  },
  {
    description: 'Academic levels available across programs and student preferences.',
    icon: <GraduationCap size={18} />,
    key: 'studyLevels',
    label: 'Study levels',
  },
  {
    description: 'Operational stages used in the Students / Leads workflow.',
    icon: <Flag size={18} />,
    key: 'leadStatuses',
    label: 'Lead statuses',
  },
  {
    description: 'Stages used to track student applications from draft to outcome.',
    icon: <ClipboardList size={18} />,
    key: 'applicationStatuses',
    label: 'Application statuses',
  },
  {
    description: 'Relative importance of each factor in recommendation fit scoring.',
    icon: <Sparkles size={18} />,
    key: 'recommendationWeights',
    label: 'Recommendation weights',
  },
]

const initialWeights = {
  budget: 25,
  intake: 20,
  program: 35,
  visa: 20,
}

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<ListSettingKey | 'recommendationWeights'>('countries')
  const [settings, setSettings] = useState<SettingsState>(initialSettings)
  const [newItem, setNewItem] = useState('')
  const [weights, setWeights] = useState(initialWeights)
  const section = settingSections.find((item) => item.key === activeSection) ?? settingSections[0]!
  const weightTotal = useMemo(() => Object.values(weights).reduce((total, weight) => total + weight, 0), [weights])

  const addItem = () => {
    const label = newItem.trim()
    if (!label || activeSection === 'recommendationWeights') return

    setSettings((current) => ({
      ...current,
      [activeSection]: [
        ...current[activeSection],
        {
          active: true,
          id: `${activeSection}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
          label,
        },
      ],
    }))
    setNewItem('')
  }

  const toggleItem = (id: string) => {
    if (activeSection === 'recommendationWeights') return

    setSettings((current) => ({
      ...current,
      [activeSection]: current[activeSection].map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    }))
  }

  const deleteItem = (id: string) => {
    if (activeSection === 'recommendationWeights') return

    setSettings((current) => ({
      ...current,
      [activeSection]: current[activeSection].filter((item) => item.id !== id),
    }))
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Administration</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">Settings</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Manage the controlled values used across student, school, program, application, and recommendation workflows.
            </p>
          </div>

          <Button leftIcon={<Save size={17} />} size="md">
            Save settings
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <Card className="h-fit p-3 xl:sticky xl:top-26">
            <nav aria-label="Settings categories" className="space-y-1">
              {settingSections.map((item) => {
                const isActive = activeSection === item.key

                return (
                  <button
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isActive
                        ? 'bg-[#E6F4F3] text-[#045A58]'
                        : 'text-[#6B7280] hover:bg-[#F5F6F8] hover:text-[#111827]'
                    }`}
                    key={item.key}
                    onClick={() => {
                      setActiveSection(item.key)
                      setNewItem('')
                    }}
                    type="button"
                  >
                    <span className="mt-0.5 shrink-0">{item.icon}</span>
                    <span>
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className="mt-1 block text-xs leading-4 text-[#6B7280]">
                        {item.key === 'recommendationWeights'
                          ? `${weightTotal}% total`
                          : `${settings[item.key].length} values`}
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>
          </Card>

          <div className="space-y-6">
            <Card className="p-0">
              <div className="border-b border-[#E5E7EB] px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827]">{section.label}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#6B7280]">{section.description}</p>
                  </div>
                </div>
              </div>

              {activeSection === 'recommendationWeights' ? (
                <RecommendationWeights
                  onChange={(key, value) =>
                    setWeights((current) => ({ ...current, [key]: Math.max(0, Math.min(100, value)) }))
                  }
                  total={weightTotal}
                  weights={weights}
                />
              ) : (
                <>
                  <div className="border-b border-[#E5E7EB] bg-[#F9FAFB] px-5 py-4 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        className="h-11"
                        id="new-setting-value"
                        onChange={(event) => setNewItem(event.target.value)}
                        placeholder={`Add ${section.label.toLowerCase().replace(/s$/, '')}`}
                        value={newItem}
                      />
                      <Button
                        className="shrink-0"
                        disabled={!newItem.trim()}
                        leftIcon={<Plus size={17} />}
                        onClick={addItem}
                        size="md"
                      >
                        Add value
                      </Button>
                    </div>
                  </div>

                  <div className="divide-y divide-[#E5E7EB]">
                    {settings[activeSection].map((item) => (
                      <div
                        className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                        key={item.id}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              item.active
                                ? 'bg-[#E6F4F3] text-[#045A58]'
                                : 'bg-[#F3F4F6] text-[#9CA3AF]'
                            }`}
                          >
                            {item.active ? <Check size={17} /> : <CircleDot size={17} />}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#111827]">{item.label}</p>
                            <p className="mt-1 text-xs text-[#6B7280]">
                              {item.active ? 'Available in operational forms' : 'Hidden from new records'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            aria-pressed={item.active}
                            className={`relative h-6 w-11 rounded-full outline-none transition focus:ring-4 focus:ring-[#E6F4F3] ${
                              item.active ? 'bg-[#045A58]' : 'bg-[#D1D5DB]'
                            }`}
                            onClick={() => toggleItem(item.id)}
                            title={item.active ? 'Disable value' : 'Enable value'}
                            type="button"
                          >
                            <span
                              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                                item.active ? 'left-6' : 'left-1'
                              }`}
                            />
                          </button>
                          <button
                            aria-label={`Delete ${item.label}`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7280] outline-none transition hover:bg-[#FEE2E2] hover:text-[#B42318] focus:ring-4 focus:ring-[#FEE2E2]"
                            onClick={() => deleteItem(item.id)}
                            title="Delete value"
                            type="button"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>

            <Card className="border-[#B9DAD8] bg-[#F2F9F8]">
              <h2 className="text-sm font-semibold text-[#111827]">Operational impact</h2>
              <p className="mt-1 text-sm leading-6 text-[#52605F]">
                Disabled values remain on existing records but are hidden from new selections. Deleting values should only be allowed when no records depend on them.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

const RecommendationWeights = ({
  onChange,
  total,
  weights,
}: {
  onChange: (key: keyof typeof initialWeights, value: number) => void
  total: number
  weights: typeof initialWeights
}) => {
  const factors: { description: string; key: keyof typeof initialWeights; label: string }[] = [
    { description: 'Match between student interest and the program offering.', key: 'program', label: 'Program fit' },
    { description: 'Alignment between tuition and the student budget range.', key: 'budget', label: 'Budget fit' },
    { description: 'Availability for the student target intake period.', key: 'intake', label: 'Intake fit' },
    { description: 'Internal visa-friendliness assessment and priorities.', key: 'visa', label: 'Visa fit' },
  ]

  return (
    <div className="p-5 sm:p-6">
      <div
        className={`mb-6 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
          total === 100 ? 'border-[#B9DAD8] bg-[#F2F9F8]' : 'border-[#F7C9C5] bg-[#FEF3F2]'
        }`}
      >
        <div>
          <p className="text-sm font-semibold text-[#111827]">Combined scoring weight</p>
          <p className="mt-1 text-xs text-[#6B7280]">Weights must total exactly 100% before saving.</p>
        </div>
        <Badge tone={total === 100 ? 'success' : 'error'}>{total}% total</Badge>
      </div>

      <div className="space-y-5">
        {factors.map((factor) => (
          <div
            className="grid gap-4 border-b border-[#E5E7EB] pb-5 last:border-b-0 last:pb-0 lg:grid-cols-[minmax(220px,1fr)_minmax(240px,1fr)_88px] lg:items-center"
            key={factor.key}
          >
            <div>
              <label className="text-sm font-semibold text-[#111827]" htmlFor={`weight-${factor.key}`}>
                {factor.label}
              </label>
              <p className="mt-1 text-sm leading-5 text-[#6B7280]">{factor.description}</p>
            </div>
            <input
              aria-label={`${factor.label} weight`}
              className="w-full accent-[#045A58]"
              max="100"
              min="0"
              onChange={(event) => onChange(factor.key, Number(event.target.value))}
              type="range"
              value={weights[factor.key]}
            />
            <div className="relative">
              <input
                className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 pr-8 text-right text-sm font-semibold text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
                id={`weight-${factor.key}`}
                max="100"
                min="0"
                onChange={(event) => onChange(factor.key, Number(event.target.value))}
                type="number"
                value={weights[factor.key]}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsPage
