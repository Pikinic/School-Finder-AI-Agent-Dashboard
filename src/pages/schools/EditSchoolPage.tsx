import {
  ArrowLeft,
  Building2,
  Globe2,
  MapPin,
  Save,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'

const school = {
  address: '120 Harbour Street',
  admissionsEmail: 'admissions@northbridge.example',
  city: 'Toronto',
  country: 'Canada',
  description:
    'Career-focused college record used by advisors for student matching, application planning, and partner workflow management.',
  id: 'SCH-2048',
  name: 'Northbridge College',
  partnerManager: 'Amina Yusuf',
  partnerSince: '2025-01-15',
  partnerStatus: 'Partner',
  phone: '+1 416 555 0184',
  postalCode: 'M5J 2N8',
  rankingNote:
    'Internal reputation assessment indicates strong employer-oriented delivery and consistent advisor feedback for applied business programs.',
  status: 'Active',
  type: 'College',
  visaFriendlinessNote:
    'Clear document guidance, reliable international admissions response times, and established support for study-permit documentation.',
  visaFriendlinessScore: 92,
  website: 'https://northbridge.example',
}

const EditSchoolPage = () => {
  const navigate = useNavigate()
  const { schoolId } = useParams()
  const displayId = schoolId ?? school.id

  return (
    <AppShell>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault()
          navigate(`/schools/${displayId}`)
        }}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
              to={`/schools/${displayId}`}
            >
              <ArrowLeft size={16} />
              {school.name}
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">Edit school</h1>
              <Badge tone="neutral">{displayId}</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Update the school record used by advisors, recommendations, and program operations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate(`/schools/${displayId}`)} size="md" variant="secondary">
              Cancel
            </Button>
            <Button leftIcon={<Save size={17} />} size="md" type="submit">
              Save changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <FormSection
              description="Core public-facing and classification information."
              icon={Building2}
              title="School profile"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input defaultValue={school.name} id="school-name" label="School name" required />
                </div>
                <SelectField
                  defaultValue={school.type}
                  id="school-type"
                  label="School type"
                  options={['University', 'College', 'Institute']}
                />
                <SelectField
                  defaultValue={school.status}
                  id="record-status"
                  label="Record status"
                  options={['Active', 'Inactive']}
                />
                <div className="sm:col-span-2">
                  <TextareaField
                    defaultValue={school.description}
                    id="school-description"
                    label="Description"
                    rows={4}
                  />
                </div>
              </div>
            </FormSection>

            <FormSection
              description="Admissions contact channels and official website."
              icon={Globe2}
              title="Contact and website"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input defaultValue={school.website} id="website" label="Website" type="url" />
                <Input
                  defaultValue={school.admissionsEmail}
                  id="admissions-email"
                  label="Admissions email"
                  type="email"
                />
                <Input defaultValue={school.phone} id="phone" label="Phone number" type="tel" />
              </div>
            </FormSection>

            <FormSection
              description="Registered address used for school records and student guidance."
              icon={MapPin}
              title="Location"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input defaultValue={school.address} id="address" label="Street address" />
                </div>
                <Input defaultValue={school.city} id="city" label="City" />
                <SelectField
                  defaultValue={school.country}
                  id="country"
                  label="Country"
                  options={['Canada', 'United Kingdom', 'United States', 'Australia', 'Germany']}
                />
                <Input defaultValue={school.postalCode} id="postal-code" label="Postal code" />
              </div>
            </FormSection>

            <FormSection
              description="Internal relationship status and ownership."
              icon={ShieldCheck}
              title="Partnership"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  defaultValue={school.partnerStatus}
                  id="partner-status"
                  label="Partner status"
                  options={['Partner', 'Prospect', 'Non-partner']}
                />
                <Input
                  defaultValue={school.partnerSince}
                  id="partner-since"
                  label="Partner since"
                  type="date"
                />
                <SelectField
                  defaultValue={school.partnerManager}
                  id="partner-manager"
                  label="Relationship manager"
                  options={['Amina Yusuf', 'Daniel Okafor', 'Maya Chen']}
                />
              </div>
            </FormSection>

            <FormSection
              description="Internal advisor guidance. These notes are not public school claims."
              icon={Star}
              title="Internal assessment"
            >
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor="visa-score">
                    Visa friendliness score
                  </label>
                  <div className="grid grid-cols-[1fr_72px] items-center gap-4">
                    <input
                      className="accent-[#045A58]"
                      defaultValue={school.visaFriendlinessScore}
                      id="visa-score"
                      max="100"
                      min="0"
                      type="range"
                    />
                    <Input
                      className="h-11 px-2 text-center"
                      defaultValue={school.visaFriendlinessScore}
                      id="visa-score-number"
                      max="100"
                      min="0"
                      type="number"
                    />
                  </div>
                </div>
                <TextareaField
                  defaultValue={school.visaFriendlinessNote}
                  id="visa-note"
                  label="Visa friendliness notes"
                  rows={4}
                />
                <TextareaField
                  defaultValue={school.rankingNote}
                  id="reputation-note"
                  label="Ranking and reputation notes"
                  rows={4}
                />
              </div>
            </FormSection>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-26 xl:self-start">
            <Card>
              <h2 className="text-lg font-semibold text-[#111827]">Record summary</h2>
              <div className="mt-5 space-y-4">
                <SummaryItem label="School ID" value={displayId} />
                <SummaryItem label="Current status" value={school.status} />
                <SummaryItem label="Partner status" value={school.partnerStatus} />
                <SummaryItem label="Linked programs" value="28" />
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-[#111827]">Program management</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                Programs are managed separately so tuition, intake, deadlines, and requirements remain structured.
              </p>
              <Link
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#111827] outline-none transition hover:bg-[#F9FAFB] focus:ring-4 focus:ring-[#E6F4F3]"
                to={`/schools/${displayId}`}
              >
                View related programs
              </Link>
            </Card>
          </aside>
        </div>

        <div className="sticky bottom-0 z-10 -mx-4 border-t border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:hidden">
          <div className="flex justify-end gap-3">
            <Button onClick={() => navigate(`/schools/${displayId}`)} size="md" variant="secondary">
              Cancel
            </Button>
            <Button leftIcon={<Save size={17} />} size="md" type="submit">
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </AppShell>
  )
}

type FormSectionProps = {
  children: React.ReactNode
  description: string
  icon: typeof Building2
  title: string
}

const FormSection = ({ children, description, icon: Icon, title }: FormSectionProps) => (
  <Card>
    <div className="mb-6 flex items-start gap-3 border-b border-[#E5E7EB] pb-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
        <Icon size={19} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>
        <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
      </div>
    </div>
    {children}
  </Card>
)

type SelectFieldProps = {
  defaultValue: string
  id: string
  label: string
  options: string[]
}

const SelectField = ({ defaultValue, id, label, options }: SelectFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <select
      className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue={defaultValue}
      id={id}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
)

type TextareaFieldProps = {
  defaultValue: string
  id: string
  label: string
  rows: number
}

const TextareaField = ({ defaultValue, id, label, rows }: TextareaFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm leading-6 text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue={defaultValue}
      id={id}
      rows={rows}
    />
  </div>
)

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] pb-3 last:border-b-0 last:pb-0">
    <span className="text-sm text-[#6B7280]">{label}</span>
    <span className="text-sm font-semibold text-[#111827]">{value}</span>
  </div>
)

export default EditSchoolPage
