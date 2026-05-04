import { useState, useCallback } from 'react'

const INITIAL_FORM = {
  eventType:    'wedding',
  guestCount:   100,
  locationTier: 'tier2',
  budgetLevel:  'medium',
  addons:       [],
  name:         '',
  phone:        '',
  email:        '',
  eventDate:    '',
}

export function usePlanner() {
  const [form, setForm]           = useState(INITIAL_FORM)
  const [step, setStep]           = useState(1)   // 1-3 multi-step
  const [result, setResult]       = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }, [])

  const toggleAddon = useCallback((addonKey) => {
    setForm((prev) => {
      const exists = prev.addons.includes(addonKey)
      return {
        ...prev,
        addons: exists
          ? prev.addons.filter((a) => a !== addonKey)
          : [...prev.addons, addonKey],
      }
    })
  }, [])

  const estimate = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('http://localhost:5000/api/planner/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        throw new Error('Failed to calculate estimate.')
      }

      const resData = await response.json()
      setResult(resData)
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [form])

  const reset = useCallback(() => {
    setForm(INITIAL_FORM)
    setStep(1)
    setResult(null)
    setSubmitted(false)
    setError(null)
  }, [])

  const handleSubmitEnquiry = useCallback((e) => {
    e.preventDefault()
    // Future: POST to /api/enquiries
    setSubmitted(true)
  }, [])

  return {
    form,
    step,
    result,
    submitted,
    loading,
    error,
    updateField,
    toggleAddon,
    estimate,
    reset,
    setStep,
    handleSubmitEnquiry,
  }
}
