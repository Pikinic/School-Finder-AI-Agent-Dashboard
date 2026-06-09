import { Check, Search, UserRoundCheck, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Badge from '../ui/Badge.js'
import Button from '../ui/Button.js'
import Input from '../ui/Input.js'
import Modal from '../ui/Modal.js'

type Availability = 'Available' | 'Limited' | 'Unavailable'

type AdvisorOption = {
  activeStudents: number
  availability: Availability
  capacity: number
  id: string
  name: string
  specializations: string[]
}

type AssignAdvisorModalProps = {
  currentAdvisor: string
  isOpen: boolean
  onAssign: (advisor: AdvisorOption) => void
  onClose: () => void
  studentName: string
}

const advisors: AdvisorOption[] = [
  {
    activeStudents: 18,
    availability: 'Available',
    capacity: 25,
    id: 'USR-1001',
    name: 'Amina Yusuf',
    specializations: ['Canada', 'Postgraduate', 'Business'],
  },
  {
    activeStudents: 23,
    availability: 'Limited',
    capacity: 25,
    id: 'USR-1002',
    name: 'Daniel Okafor',
    specializations: ['United Kingdom', 'STEM', 'Scholarships'],
  },
  {
    activeStudents: 27,
    availability: 'Unavailable',
    capacity: 25,
    id: 'USR-1003',
    name: 'Maya Chen',
    specializations: ['Canada', 'Diploma', 'Visa support'],
  },
  {
    activeStudents: 14,
    availability: 'Available',
    capacity: 22,
    id: 'USR-1007',
    name: 'Femi Balogun',
    specializations: ['Australia', 'Undergraduate', 'Engineering'],
  },
  {
    activeStudents: 20,
    availability: 'Limited',
    capacity: 24,
    id: 'USR-1008',
    name: 'Zainab Bello',
    specializations: ['Germany', 'Masters', 'Technology'],
  },
]

const availabilityTone: Record<Availability, 'error' | 'success' | 'warning'> = {
  Available: 'success',
  Limited: 'warning',
  Unavailable: 'error',
}

const AssignAdvisorModal = ({
  currentAdvisor,
  isOpen,
  onAssign,
  onClose,
  studentName,
}: AssignAdvisorModalProps) => {
  const currentAdvisorOption = advisors.find((advisor) => advisor.name === currentAdvisor)
  const [query, setQuery] = useState('')
  const [selectedAdvisorId, setSelectedAdvisorId] = useState(currentAdvisorOption?.id ?? '')

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedAdvisorId(currentAdvisorOption?.id ?? '')
    }
  }, [currentAdvisorOption?.id, isOpen])

  const filteredAdvisors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return advisors.filter(
      (advisor) =>
        !normalizedQuery ||
        advisor.name.toLowerCase().includes(normalizedQuery) ||
        advisor.specializations.some((specialization) =>
          specialization.toLowerCase().includes(normalizedQuery),
        ),
    )
  }, [query])

  const selectedAdvisor = advisors.find((advisor) => advisor.id === selectedAdvisorId)
  const assignmentChanged = Boolean(selectedAdvisor && selectedAdvisor.name !== currentAdvisor)

  return (
    <Modal
      description={`Choose the advisor who should own ${studentName}'s follow-ups, conversations, and recommendation workflow.`}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={currentAdvisor ? 'Reassign advisor' : 'Assign advisor'}
    >
      <div className="border-b border-[#E5E7EB] px-5 py-4 sm:px-6">
        <Input
          className="h-11 bg-[#F9FAFB]"
          id="advisor-assignment-search"
          leftIcon={<Search size={17} />}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search advisor or specialization"
          type="search"
          value={query}
        />
      </div>

      <div className="max-h-[430px] overflow-y-auto px-5 py-4 sm:px-6">
        {filteredAdvisors.length ? (
          <div className="space-y-3">
            {filteredAdvisors.map((advisor) => {
              const isSelected = selectedAdvisorId === advisor.id
              const isCurrent = currentAdvisor === advisor.name
              const isOverCapacity = advisor.activeStudents >= advisor.capacity
              const isUnavailable = advisor.availability === 'Unavailable'
              const isDisabled = (isUnavailable || isOverCapacity) && !isCurrent
              const workloadPercentage = Math.min(
                Math.round((advisor.activeStudents / advisor.capacity) * 100),
                100,
              )

              return (
                <button
                  aria-pressed={isSelected}
                  className={`w-full rounded-xl border p-4 text-left outline-none transition focus:ring-4 focus:ring-[#E6F4F3] ${
                    isSelected
                      ? 'border-[#045A58] bg-[#F2F9F8] ring-1 ring-[#045A58]'
                      : isDisabled
                        ? 'cursor-not-allowed border-[#E5E7EB] bg-[#F9FAFB] opacity-65'
                        : 'border-[#E5E7EB] bg-white hover:border-[#B9DAD8] hover:bg-[#F9FAFB]'
                  }`}
                  disabled={isDisabled}
                  key={advisor.id}
                  onClick={() => setSelectedAdvisorId(advisor.id)}
                  type="button"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F3] text-sm font-semibold text-[#045A58]">
                      {advisor.name
                        .split(' ')
                        .map((name) => name[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-[#111827]">{advisor.name}</p>
                        <Badge tone={availabilityTone[advisor.availability]}>{advisor.availability}</Badge>
                        {isCurrent ? <Badge tone="brand">Current</Badge> : null}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {advisor.specializations.map((specialization) => (
                          <span
                            className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-medium text-[#6B7280]"
                            key={specialization}
                          >
                            {specialization}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="font-medium text-[#6B7280]">
                            {advisor.activeStudents} of {advisor.capacity} active students
                          </span>
                          <span className="font-semibold text-[#374151]">{workloadPercentage}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
                          <div
                            className={`h-full rounded-full ${
                              isOverCapacity
                                ? 'bg-[#DC2626]'
                                : workloadPercentage >= 85
                                  ? 'bg-[#D97706]'
                                  : 'bg-[#045A58]'
                            }`}
                            style={{ width: `${workloadPercentage}%` }}
                          />
                        </div>
                        {isDisabled ? (
                          <p className="mt-2 text-xs font-medium text-[#B42318]">
                            {isUnavailable
                              ? 'Unavailable for new assignments'
                              : 'At capacity and unavailable for new assignments'}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-[#045A58] bg-[#045A58] text-white'
                          : 'border-[#D1D5DB] text-transparent'
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex min-h-52 flex-col items-center justify-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F4F3] text-[#045A58]">
              <Users size={19} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-[#111827]">No matching advisors</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Try another name or specialization.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs leading-5 text-[#6B7280]">
          Assignment changes affect workflow ownership, not account permissions.
        </p>
        <div className="flex shrink-0 justify-end gap-3">
          <Button onClick={onClose} size="md" variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={!assignmentChanged || !selectedAdvisor}
            leftIcon={<UserRoundCheck size={16} />}
            onClick={() => {
              if (selectedAdvisor) {
                onAssign(selectedAdvisor)
              }
            }}
            size="md"
          >
            Reassign advisor
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export type { AdvisorOption }
export default AssignAdvisorModal
