import { AlertTriangle, LogOut } from 'lucide-react'
import Button from '../ui/Button.js'
import Modal from '../ui/Modal.js'

type UnsavedChangesModalProps = {
  isOpen: boolean
  onDiscard: () => void
  onKeepEditing: () => void
}

const UnsavedChangesModal = ({
  isOpen,
  onDiscard,
  onKeepEditing,
}: UnsavedChangesModalProps) => (
  <Modal
    description="Your latest edits have not been saved."
    isOpen={isOpen}
    onClose={onKeepEditing}
    title="Discard unsaved changes?"
  >
    <div className="px-5 py-5 sm:px-6">
      <div className="flex items-start gap-3 rounded-xl border border-[#F4D7A1] bg-[#FFFAEB] p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF0C7] text-[#B54708]">
          <AlertTriangle size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">Changes on this form will be lost</p>
          <p className="mt-1 text-sm leading-6 text-[#6B7280]">
            Stay on this page to review and save your work, or discard the changes and continue.
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
      <Button onClick={onKeepEditing} size="md" variant="secondary">
        Keep editing
      </Button>
      <Button leftIcon={<LogOut size={16} />} onClick={onDiscard} size="md" variant="danger">
        Discard changes
      </Button>
    </div>
  </Modal>
)

export default UnsavedChangesModal
