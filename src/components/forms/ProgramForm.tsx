import { BookOpen, CalendarDays, CircleDollarSign, ClipboardCheck, GraduationCap } from 'lucide-react'
import type { FormEvent, ReactNode } from 'react'
import Button from '../ui/Button.js'
import Card from '../ui/Card.js'
import Input from '../ui/Input.js'

type ProgramFormProps = {
  initialValues?: ProgramFormValues
  onCancel: () => void
  onDirty: () => void
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

export type ProgramFormValues = {
  academicRequirement?: string
  applicationDeadline?: string
  category?: string
  duration?: string
  englishRequirement?: string
  intakePeriods?: string[]
  intakeYear?: string
  level?: string
  name?: string
  notes?: string
  scholarshipAvailable?: boolean
  schoolId?: string
  tuitionAmount?: string
  tuitionCurrency?: string
}

const intakePeriods = ['Winter', 'Spring', 'Summer', 'Fall']

const ProgramForm = ({
  initialValues = {},
  onCancel,
  onDirty,
  onSubmit,
  school,
  submitLabel = 'Add program',
}: ProgramFormProps) => {
  return (
    <form className="space-y-6" onChange={onDirty} onSubmit={onSubmit}>
      <FormSection
        description="Core classification used in program search and student matching."
        icon={<BookOpen size={19} />}
        title="Program details"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              defaultValue={initialValues.name}
              id="program-name"
              label="Program name"
              name="name"
              placeholder="e.g. Business Analytics"
              required
            />
          </div>
          <SelectField
            defaultValue={initialValues.level}
            id="study-level"
            label="Study level"
            name="level"
            options={['Select level', 'Certificate', 'Diploma', 'Undergraduate', 'Postgraduate', 'Masters', 'Doctorate']}
            required
          />
          <SelectField
            defaultValue={initialValues.category}
            id="program-category"
            label="Category"
            name="category"
            options={['Select category', 'Business', 'Computing and IT', 'Engineering', 'Health Sciences', 'Social Sciences', 'Arts and Design']}
          />
          <Input
            defaultValue={initialValues.duration}
            id="duration"
            label="Duration"
            name="duration"
            placeholder="e.g. 2 years"
          />
          {school.mode === 'fixed' ? (
            <>
              <input name="schoolId" type="hidden" value={school.id} />
              <Input disabled id="school" label="School" value={school.name} />
            </>
          ) : (
            <SchoolSelect defaultValue={initialValues.schoolId} options={school.options} />
          )}
        </div>
      </FormSection>

      <FormSection
        description="Tuition values used for budget matching and advisor comparison."
        icon={<CircleDollarSign size={19} />}
        title="Tuition and funding"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            defaultValue={initialValues.tuitionAmount}
            id="tuition-amount"
            label="Tuition amount"
            min="0"
            name="tuitionAmount"
            placeholder="22400"
            type="number"
          />
          <SelectField
            defaultValue={initialValues.tuitionCurrency}
            id="tuition-currency"
            label="Currency"
            name="tuitionCurrency"
            options={['CAD', 'USD', 'GBP', 'AUD', 'EUR']}
          />
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
              <input
                className="mt-0.5 h-4 w-4 accent-[#045A58]"
                defaultChecked={initialValues.scholarshipAvailable}
                name="scholarshipAvailable"
                type="checkbox"
              />
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
                <input
                  className="h-4 w-4 accent-[#045A58]"
                  defaultChecked={initialValues.intakePeriods?.includes(intake)}
                  name="intakePeriods"
                  type="checkbox"
                  value={intake}
                />
                {intake}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Input
            defaultValue={initialValues.applicationDeadline}
            id="application-deadline"
            label="Application deadline"
            name="applicationDeadline"
            type="date"
          />
          <Input
            defaultValue={initialValues.intakeYear}
            id="intake-year"
            label="Primary intake year"
            min="2026"
            name="intakeYear"
            placeholder="2027"
            type="number"
          />
        </div>
      </FormSection>

      <FormSection
        description="Admission criteria surfaced to advisors and recommendation workflows."
        icon={<GraduationCap size={19} />}
        title="Entry requirements"
      >
        <div className="grid gap-5">
          <TextareaField
            defaultValue={initialValues.academicRequirement}
            id="academic-requirement"
            label="Academic requirement"
            name="academicRequirement"
            placeholder="Required qualification, minimum grade, and prerequisite subjects."
            rows={4}
          />
          <TextareaField
            defaultValue={initialValues.englishRequirement}
            id="english-requirement"
            label="English requirement"
            name="englishRequirement"
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
          defaultValue={initialValues.notes}
          id="program-notes"
          label="Notes"
          name="notes"
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
  defaultValue?: string | undefined
  id: string
  label: string
  name: string
  options: string[]
  required?: boolean
}

const SelectField = ({ defaultValue, id, label, name, options, required }: SelectFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <select
      className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue={defaultValue ?? options[0]}
      id={id}
      name={name}
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
  defaultValue,
  options,
}: {
  defaultValue?: string | undefined
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
      defaultValue={defaultValue ?? ''}
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
  defaultValue?: string | undefined
  id: string
  label: string
  name: string
  placeholder: string
  rows: number
}

const TextareaField = ({ defaultValue, id, label, name, placeholder, rows }: TextareaFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm leading-6 text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      defaultValue={defaultValue}
      id={id}
      name={name}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
)

export default ProgramForm
