import { CalendarPlus, Clock3, MessageSquareText, StickyNote } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import Badge from '../ui/Badge.js'
import Button from '../ui/Button.js'
import Input from '../ui/Input.js'
import Modal from '../ui/Modal.js'

type QuickEntryMode = 'follow-up' | 'note'
type FollowUpPriority = 'High' | 'Normal' | 'Urgent'

type QuickEntryResult =
  | {
      body: string
      category: string
      mode: 'note'
      title: string
    }
  | {
      channel: string
      date: string
      mode: 'follow-up'
      note: string
      priority: FollowUpPriority
      subject: string
      time: string
    }

type QuickStudentEntryModalProps = {
  isOpen: boolean
  mode: QuickEntryMode
  onClose: () => void
  onSave: (entry: QuickEntryResult) => void
  studentName: string
}

const getLocalDateInputValue = () => {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  return new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

const QuickStudentEntryModal = ({
  isOpen,
  mode,
  onClose,
  onSave,
  studentName,
}: QuickStudentEntryModalProps) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [body, setBody] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [channel, setChannel] = useState('Phone call')
  const [priority, setPriority] = useState<FollowUpPriority>('Normal')
  const [followUpNote, setFollowUpNote] = useState('')

  useEffect(() => {
    if (!isOpen) return

    setTitle('')
    setCategory('General')
    setBody('')
    setSubject('')
    setDate('')
    setTime('')
    setChannel('Phone call')
    setPriority('Normal')
    setFollowUpNote('')
  }, [isOpen, mode])

  const isNote = mode === 'note'
  const canSave = isNote
    ? title.trim().length > 0 && body.trim().length > 0
    : subject.trim().length > 0 && date.length > 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSave) return

    if (isNote) {
      onSave({
        body: body.trim(),
        category,
        mode: 'note',
        title: title.trim(),
      })
      return
    }

    onSave({
      channel,
      date,
      mode: 'follow-up',
      note: followUpNote.trim(),
      priority,
      subject: subject.trim(),
      time,
    })
  }

  return (
    <Modal
      description={
        isNote
          ? `Record internal advisor context for ${studentName}.`
          : `Create the next advisor action for ${studentName}.`
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={isNote ? 'Add internal note' : 'Schedule follow-up'}
    >
      <form onSubmit={handleSubmit}>
        <div className="max-h-[520px] overflow-y-auto px-5 py-5 sm:px-6">
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#B9DAD8] bg-[#F2F9F8] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
              {isNote ? <StickyNote size={18} /> : <CalendarPlus size={18} />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-[#111827]">{studentName}</p>
                <Badge tone={isNote ? 'neutral' : 'warning'}>
                  {isNote ? 'Internal only' : 'Advisor action'}
                </Badge>
              </div>
              <p className="mt-1 text-sm leading-5 text-[#52605F]">
                {isNote
                  ? 'Notes support advisor handoffs and are never sent to the student.'
                  : 'The assigned advisor will see this item in their follow-up workload.'}
              </p>
            </div>
          </div>

          {isNote ? (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px]">
                <Input
                  id="quick-note-title"
                  label="Note title"
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Shortlist call outcome"
                  required
                  value={title}
                />
                <SelectField
                  id="quick-note-category"
                  label="Category"
                  onChange={setCategory}
                  options={['General', 'Application', 'Documents', 'Recommendation', 'Follow-up']}
                  value={category}
                />
              </div>
              <TextareaField
                id="quick-note-body"
                label="Internal note"
                onChange={setBody}
                placeholder="Record useful context for the next advisor action."
                required
                value={body}
              />
            </div>
          ) : (
            <div className="space-y-5">
              <Input
                id="follow-up-subject"
                label="Follow-up subject"
                onChange={(event) => setSubject(event.target.value)}
                placeholder="e.g. Confirm final school shortlist"
                required
                value={subject}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  id="follow-up-date"
                  label="Due date"
                  min={getLocalDateInputValue()}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  type="date"
                  value={date}
                />
                <Input
                  id="follow-up-time"
                  label="Time"
                  onChange={(event) => setTime(event.target.value)}
                  rightSlot={<Clock3 size={16} />}
                  type="time"
                  value={time}
                />
                <SelectField
                  id="follow-up-channel"
                  label="Contact channel"
                  onChange={setChannel}
                  options={['Phone call', 'WhatsApp', 'Email', 'Telegram', 'Video call', 'Internal task']}
                  value={channel}
                />
                <SelectField
                  id="follow-up-priority"
                  label="Priority"
                  onChange={(value) => setPriority(value as FollowUpPriority)}
                  options={['Normal', 'High', 'Urgent']}
                  value={priority}
                />
              </div>
              <TextareaField
                id="follow-up-note"
                label="Advisor context"
                onChange={setFollowUpNote}
                placeholder="Add preparation notes or the outcome needed from this follow-up."
                value={followUpNote}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button onClick={onClose} size="md" variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={!canSave}
            leftIcon={isNote ? <MessageSquareText size={16} /> : <CalendarPlus size={16} />}
            size="md"
            type="submit"
          >
            {isNote ? 'Add note' : 'Schedule follow-up'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

const SelectField = ({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string
  label: string
  onChange: (value: string) => void
  options: string[]
  value: string
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <select
      className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      id={id}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
)

const TextareaField = ({
  id,
  label,
  onChange,
  placeholder,
  required = false,
  value,
}: {
  id: string
  label: string
  onChange: (value: string) => void
  placeholder: string
  required?: boolean
  value: string
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#111827]" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="min-h-28 w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm leading-6 text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#045A58] focus:ring-4 focus:ring-[#E6F4F3]"
      id={id}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      required={required}
      value={value}
    />
  </div>
)

export type { QuickEntryMode, QuickEntryResult }
export default QuickStudentEntryModal
