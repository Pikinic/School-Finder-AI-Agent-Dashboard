import { BookOpen, CalendarDays, CircleDollarSign, ClipboardCheck, GraduationCap } from 'lucide-react'
import type { FormEvent, ReactNode } from 'react'
import Button from '../ui/Button.js'
import Card from '../ui/Card.js'
import Input from '../ui/Input.js'

type ProgramFormProps = {
  onCancel: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  school:
    | {
        id: string
        mode: 'fixed'
        name: string
      }
    | {
        mode: 'select'
        options: Array<{
          id: string
          name: string
        }>
      }
  submitLabel?: string
}

const intakePeriods = ['Winter', 'Spring', 'Summer', 'Fall']

const ProgramForm = ({
  onCancel,
  onSubmit,
  school,
  submitLabel = 'Add program',
}: ProgramFormProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <FormSection
        description="Core classification used in program search and student matching."
        icon={<BookOpen size={19} />}
        title="Program details"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input id="program-name" label="Program name" placeholder="e.g. Business Analytics" required />
          </div>
          <SelectField
            id="study-level"
            label="Study level"
            options={['Select level', 'Certificate', 'Diploma', 'Undergraduate', 'Postgraduate', 'Masters', 'Doctorate']}
            required
          />
          <SelectField
            id="program-category"
            label="Category"
            options={['Select category', 'Business', 'Computing and IT', 'Engineering', 'Health Sciences', 'Social Sciences', 'Arts and Design']}
          />
          <Input id="duration" label="Duration" placeholder="e.g. 2 years" />
          {school.mode === 'fixed' ? (
            <>
              <input name="schoolId" type="hidden" value={school.id} />
              <Input disabled id="school" label="School" value={school.name} />
            </>
          ) : (
            <SchoolSelect options={school.options} />
          )}
        </div>
      </FormSection>

      <FormSection
        description="Tuition values used for budget matching and advisor comparison."
        icon={<CircleDollarSign size={19} />}
        title="Tuition and funding"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="tuition-amount" label="Tuition amount" min="0" placeholder="22400" type="number" />
          <SelectField
            id="tuition-currency"
            label="Currency"
            options={['CAD', 'USD', 'GBP', 'AUD', 'EUR']}
          />
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
              <input className="mt-0.5 h-4 w-4 accent-[#045A58]" name="scholarshipAvailable" type="checkbox" />
              <span>
                <span className="block text-sm font-semibold text-[#111827]">Scholarship available</span>
                <span className="mt-1 block text-sm leading-5 text-[#6B7280]">
                  Mark this when the program currently has scholarship or funding options.
                </span>
              </span>
            </label>
          </div>
        </div>
      </FormSection>

      <FormSection
        description="Application periods and the next relevant deadline."
        icon={<CalendarDays size={19} />}
        title="Intakes and deadline"
      >
        <fieldset>
          <legend className="text-sm font-medium text-[#111827]">Intake periods</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {intakePeriods.map((intake) => (
              <label
                className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#374151]"
                key={intake}
              >
                <input className="h-4 w-4 accent-[#045A58]" name="intakePeriods" type="checkbox" value={intake} />
                {intake}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Input id="application-deadline" label="Application deadline" type="date" />
          <Input id="intake-year" label="Primary intake year" min="2026" placeholder="2027" type="number" />
        </div>
      </FormSection>

      <FormSection
        description="Admission criteria surfaced to advisors and recommendation workflows."
        icon={<GraduationCap size={19} />}
        title="Entry requirements"
      >
        <div className="grid gap-5">
          <TextareaField
            id="academic-requirement"
            label="Academic requirement"
            placeholder="Required qualification, minimum grade, and prerequisite subjects."
            rows={4}
          />
          <TextareaField
            id="english-requirement"
            label="English requirement"
            placeholder="Accepted tests and minimum scores."
            rows={4}
          />
        </div>
      </FormSection>

      <FormSection
        description="Internal context for advisors and operations staff."
        icon={<ClipboardCheck size={19} />}
        title="Operational notes"
      >
        <TextareaField
          id="program-notes"
          label="Notes"
          placeholder="Add application, pathway, document, or partner guidance."
          rows={5}
        />
      </FormSection>

      <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:justify-end">
        <Button onClick={onCancel} size="md" variant="secondary">
          Cancel
        </Button>
        <Button size="md" type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
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
  id: string
  label: string
  options: string[]
  required?: boolean
}

const SelectField = ({ id, label, options, required }: SelectFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <select
      className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue={options[0]}
      id={id}
      required={required}
    >
      {options.map((option, index) => (
        <option disabled={index === 0 && option.startsWith('Select')} key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

const SchoolSelect = ({
  options,
}: {
  options: Array<{
    id: string
    name: string
  }>
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor="school-id">
      School
    </label>
    <select
      className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue=""
      id="school-id"
      name="schoolId"
      required
    >
      <option disabled value="">
        Select school
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
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

export default ProgramForm
