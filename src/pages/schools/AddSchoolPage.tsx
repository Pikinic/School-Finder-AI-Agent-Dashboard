import { ArrowLeft, Building2, CheckCircle2, Globe2, MapPin, Plus, ShieldCheck, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell.js'
import UnsavedChangesModal from '../../components/modals/UnsavedChangesModal.js'
import Badge from '../../components/ui/Badge.js'
import Button from '../../components/ui/Button.js'
import Card from '../../components/ui/Card.js'
import Input from '../../components/ui/Input.js'
import useUnsavedChanges from '../../hooks/useUnsavedChanges.js'

const AddSchoolPage = () => {
  const unsavedChanges = useUnsavedChanges()

  return (
    <AppShell>
      <form
        className="space-y-6"
        onChange={unsavedChanges.markDirty}
        onSubmit={(event) => {
          event.preventDefault()
          unsavedChanges.navigateAfterSave('/schools')
        }}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#045A58] transition hover:text-[#034A48]"
              to="/schools"
            >
              <ArrowLeft size={16} />
              Schools
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-[#111827]">Add school</h1>
              <Badge tone="brand">New record</Badge>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
              Create the school record used for program management, advisor research, and student recommendations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => unsavedChanges.requestNavigation('/schools')} size="md" variant="secondary">
              Cancel
            </Button>
            <Button leftIcon={<Plus size={17} />} size="md" type="submit">
              Add school
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <FormSection
              description="Core identity and classification information."
              icon={<Building2 size={19} />}
              title="School profile"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input id="school-name" label="School name" placeholder="Enter official school name" required />
                </div>
                <SelectField
                  id="school-type"
                  label="School type"
                  options={['Select type', 'University', 'College', 'Institute']}
                  required
                />
                <SelectField
                  defaultValue="Active"
                  id="record-status"
                  label="Record status"
                  options={['Active', 'Inactive']}
                />
                <div className="sm:col-span-2">
                  <TextareaField
                    id="school-description"
                    label="Description"
                    placeholder="Add a concise operational description of the school."
                    rows={4}
                  />
                </div>
              </div>
            </FormSection>

            <FormSection
              description="Official admissions contact channels."
              icon={<Globe2 size={19} />}
              title="Contact and website"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input id="website" label="Website" placeholder="https://school.example" type="url" />
                <Input
                  id="admissions-email"
                  label="Admissions email"
                  placeholder="admissions@school.example"
                  type="email"
                />
                <Input id="phone" label="Phone number" placeholder="+1 000 000 0000" type="tel" />
              </div>
            </FormSection>

            <FormSection
              description="Registered location used in destination and city filters."
              icon={<MapPin size={19} />}
              title="Location"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input id="address" label="Street address" placeholder="Enter school address" />
                </div>
                <Input id="city" label="City" placeholder="Enter city" required />
                <SelectField
                  id="country"
                  label="Country"
                  options={['Select country', 'Canada', 'United Kingdom', 'United States', 'Australia', 'Germany']}
                  required
                />
                <Input id="postal-code" label="Postal code" placeholder="Enter postal code" />
              </div>
            </FormSection>

            <FormSection
              description="Internal relationship classification and ownership."
              icon={<ShieldCheck size={19} />}
              title="Partnership"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  defaultValue="Prospect"
                  id="partner-status"
                  label="Partner status"
                  options={['Partner', 'Prospect', 'Non-partner']}
                />
                <Input id="partner-since" label="Partner since" type="date" />
                <SelectField
                  id="partner-manager"
                  label="Relationship manager"
                  options={['Unassigned', 'Amina Yusuf', 'Daniel Okafor', 'Maya Chen']}
                />
              </div>
            </FormSection>

            <FormSection
              description="Internal advisor assessment. These notes are not public school claims."
              icon={<Star size={19} />}
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
                      defaultValue="50"
                      id="visa-score"
                      max="100"
                      min="0"
                      type="range"
                    />
                    <Input
                      className="h-11 px-2 text-center"
                      defaultValue="50"
                      id="visa-score-number"
                      max="100"
                      min="0"
                      type="number"
                    />
                  </div>
                </div>
                <TextareaField
                  id="visa-note"
                  label="Visa friendliness notes"
                  placeholder="Document response times, permit support, and advisor observations."
                  rows={4}
                />
                <TextareaField
                  id="reputation-note"
                  label="Ranking and reputation notes"
                  placeholder="Add internal reputation and program-quality guidance."
                  rows={4}
                />
              </div>
            </FormSection>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-26 xl:self-start">
            <Card>
              <h2 className="text-lg font-semibold text-[#111827]">Required to create</h2>
              <div className="mt-5 space-y-4">
                <ChecklistItem label="Official school name" />
                <ChecklistItem label="School type" />
                <ChecklistItem label="City and country" />
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-[#111827]">After creation</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                The new school will appear in the directory. Programs can then be added from its School Detail page.
              </p>
              <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <p className="text-xs font-semibold uppercase tracking-normal text-[#9CA3AF]">Initial state</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-sm text-[#6B7280]">Programs</span>
                  <span className="text-sm font-semibold text-[#111827]">0</span>
                </div>
              </div>
            </Card>
          </aside>
        </div>

        <div className="sticky bottom-0 z-10 -mx-4 border-t border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:hidden">
          <div className="flex justify-end gap-3">
            <Button onClick={() => unsavedChanges.requestNavigation('/schools')} size="md" variant="secondary">
              Cancel
            </Button>
            <Button leftIcon={<Plus size={17} />} size="md" type="submit">
              Add school
            </Button>
          </div>
        </div>
      </form>
      <UnsavedChangesModal
        isOpen={unsavedChanges.isPromptOpen}
        onDiscard={unsavedChanges.discardChanges}
        onKeepEditing={unsavedChanges.keepEditing}
      />
    </AppShell>
  )
}

type FormSectionProps = {
  children: ReactNode
  description: string
  icon: ReactNode
  title: string
}

const FormSection = ({ children, description, icon, title }: FormSectionProps) => (
  <Card>
    <div className="mb-6 flex items-start gap-3 border-b border-[#E5E7EB] pb-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4F3] text-[#045A58]">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-[#6B7280]">{description}</p>
      </div>
    </div>
    {children}
  </Card>
)

type SelectFieldProps = {
  defaultValue?: string
  id: string
  label: string
  options: string[]
  required?: boolean
}

const SelectField = ({ defaultValue, id, label, options, required }: SelectFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <select
      className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue={defaultValue ?? options[0]}
      id={id}
      required={required}
    >
      {options.map((option, index) => (
        <option disabled={index === 0 && option.startsWith('Select')} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

type TextareaFieldProps = {
  id: string
  label: string
  placeholder: string
  rows: number
}

const TextareaField = ({ id, label, placeholder, rows }: TextareaFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm leading-6 text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      id={id}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
)

const ChecklistItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 className="shrink-0 text-[#045A58]" size={18} />
    <span className="text-sm font-medium text-[#374151]">{label}</span>
  </div>
)

export default AddSchoolPage
