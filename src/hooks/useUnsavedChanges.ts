import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useUnsavedChanges = () => {
  const navigate = useNavigate()
  const [isDirty, setIsDirty] = useState(false)
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  const markDirty = useCallback(() => setIsDirty(true), [])

  const requestNavigation = useCallback(
    (path: string) => {
      if (isDirty) {
        setPendingPath(path)
        return
      }

      navigate(path)
    },
    [isDirty, navigate],
  )

  const navigateAfterSave = useCallback(
    (path: string) => {
      setIsDirty(false)
      setPendingPath(null)
      navigate(path)
    },
    [navigate],
  )

  const keepEditing = useCallback(() => setPendingPath(null), [])

  const discardChanges = useCallback(() => {
    if (!pendingPath) return

    const path = pendingPath
    setIsDirty(false)
    setPendingPath(null)
    navigate(path)
  }, [navigate, pendingPath])

  useEffect(() => {
    if (!isDirty) return

    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', warnBeforeUnload)
    return () => window.removeEventListener('beforeunload', warnBeforeUnload)
  }, [isDirty])

  useEffect(() => {
    if (!isDirty) return

    const interceptInternalLinks = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = event.target as HTMLElement
      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const destination = new URL(anchor.href, window.location.href)
      if (destination.origin !== window.location.origin) return

      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
      const nextPath = `${destination.pathname}${destination.search}${destination.hash}`
      if (nextPath === currentPath) return

      event.preventDefault()
      setPendingPath(nextPath)
    }

    document.addEventListener('click', interceptInternalLinks, true)
    return () => document.removeEventListener('click', interceptInternalLinks, true)
  }, [isDirty])

  return {
    discardChanges,
    isDirty,
    isPromptOpen: pendingPath !== null,
    keepEditing,
    markDirty,
    navigateAfterSave,
    requestNavigation,
  }
}

export default useUnsavedChanges
