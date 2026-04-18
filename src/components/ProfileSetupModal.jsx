import { useState } from "react"
import PropTypes from "prop-types"
import { motion as Motion, AnimatePresence } from "framer-motion"

const PRACTICE_AREAS = [
  "Corporate & Commercial Law",
  "Criminal Law",
  "Family & Matrimonial Law",
  "Property & Real Estate Law",
  "Intellectual Property Rights",
  "Taxation Law",
  "Labour & Employment Law",
  "Constitutional & Administrative Law",
  "Banking & Finance Law",
  "Consumer Protection Law",
  "Arbitration & Dispute Resolution",
  "Environmental Law",
  "Cyber & Technology Law",
  "Medical & Healthcare Law",
]

const OTHER_PRACTICE_AREA = "Others"

const PRACTICE_AREAS_WITH_OTHER = [...PRACTICE_AREAS, OTHER_PRACTICE_AREA]

const ProfileSetupModal = ({ isOpen, onComplete, defaultName = "", defaultEmail = "" }) => {
  const [name, setName]               = useState(defaultName)
  const [email]                       = useState(defaultEmail)
  const [selectedAreas, setSelectedAreas] = useState([])
  const [customPracticeAreas, setCustomPracticeAreas] = useState([])
  const [otherInputDraft, setOtherInputDraft] = useState("")
  const [barNo, setBarNo]             = useState("")
  const [enrollmentDate, setEnrollmentDate] = useState("")
  const [stateBarCouncil, setStateBarCouncil] = useState("")

  const toggleArea = (area) => {
    setSelectedAreas((prev) => {
      if (prev.includes(area)) {
        if (area === OTHER_PRACTICE_AREA) {
          setCustomPracticeAreas([])
          setOtherInputDraft("")
        }
        return prev.filter((a) => a !== area)
      }
      return [...prev, area]
    })
  }

  const commitCustomPracticeArea = () => {
    const trimmed = otherInputDraft.trim()
    if (!trimmed) return
    setCustomPracticeAreas((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]))
    setOtherInputDraft("")
  }

  const removeCustomPracticeAt = (index) => {
    setCustomPracticeAreas((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onComplete({
      name,
      email,
      selectedAreas,
      customPracticeAreas,
      barNo,
      enrollmentDate,
      stateBarCouncil,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Motion.div
            key="profile-backdrop"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto">
            <Motion.div
              key="profile-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-modal-heading"
              className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden my-auto"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              {/* Top accent bar */}
              <Motion.div
                className="h-1 w-full bg-gradient-to-r from-gold via-gold-light to-gold-muted"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              />

              <div className="px-8 pb-8 pt-6">
                {/* Header */}
                <Motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 id="profile-modal-heading" className="font-dmSans text-2xl font-bold text-juri-ink">
                    Set Up Your Profile
                  </h2>
                  <p className="mt-1 font-dmSans text-sm text-juri-muted">
                    Help us personalise JuriNex for your practice
                  </p>
                </Motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name + Email row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full rounded-xl border border-juri-line bg-juri-canvas px-4 py-2.5 font-dmSans text-sm text-juri-muted outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Practice Area — 3 columns per row */}
                  <div>
                    <label className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
                      Practice Area
                      <span className="ml-1.5 font-normal text-juri-muted">(select all that apply)</span>
                    </label>
                    <div
                      role="group"
                      aria-label="Practice areas"
                      className="grid grid-cols-3 gap-3 rounded-xl border border-juri-line bg-juri-canvas/40 p-3"
                    >
                      {PRACTICE_AREAS_WITH_OTHER.map((area) => {
                        const checked = selectedAreas.includes(area)
                        const isOther = area === OTHER_PRACTICE_AREA
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleArea(area)}
                            className={`inline-flex h-full min-h-[2.75rem] w-full items-start gap-2 rounded-lg border px-2.5 py-2 font-dmSans text-left text-sm shadow-sm transition ${
                              isOther
                                ? "border-[#f2a8b3] bg-red-50/80 text-juri-ink hover:border-[#ec8f9d] hover:bg-red-100/70"
                                : "border-transparent bg-white text-juri-ink hover:border-gold/35 hover:bg-red-50/80"
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                                checked ? "border-gold bg-gold" : "border-juri-line bg-white"
                              }`}
                              aria-hidden
                            >
                              {checked && (
                                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            <span className={`min-w-0 whitespace-normal leading-snug ${isOther ? "font-semibold" : ""}`}>
                              {area}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <AnimatePresence>
                      {selectedAreas.includes(OTHER_PRACTICE_AREA) && (
                        <Motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3">
                            <label
                              htmlFor="profile-other-practice"
                              className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink"
                            >
                              Specify practice area
                              <span className="ml-1.5 font-normal text-juri-muted">(not listed above)</span>
                            </label>
                            <input
                              id="profile-other-practice"
                              type="text"
                              value={otherInputDraft}
                              onChange={(e) => setOtherInputDraft(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  commitCustomPracticeArea()
                                }
                              }}
                              placeholder="Type and press Enter to add each area…"
                              className="w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                            />
                            <p className="mt-1.5 font-dmSans text-xs text-juri-muted">
                              Press Enter to add to your list; you can add several options.
                            </p>
                          </div>
                        </Motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected tags: listed areas + each custom “Others” entry */}
                    {(selectedAreas.some((a) => a !== OTHER_PRACTICE_AREA) ||
                      customPracticeAreas.length > 0) && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedAreas
                          .filter((a) => a !== OTHER_PRACTICE_AREA)
                          .map((area) => (
                            <span
                              key={area}
                              className="inline-flex max-w-full items-center gap-1 rounded-full border border-gold/25 bg-gold/8 px-2.5 py-0.5 font-dmSans text-xs text-gold"
                            >
                              <span className="truncate">{area}</span>
                              <button
                                type="button"
                                onClick={() => toggleArea(area)}
                                className="ml-0.5 flex-shrink-0 hover:text-gold-muted"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        {customPracticeAreas.map((text, idx) => (
                          <span
                            key={`custom-${idx}-${text}`}
                            className="inline-flex max-w-full items-center gap-1 rounded-full border border-gold/25 bg-gold/8 px-2.5 py-0.5 font-dmSans text-xs text-gold"
                          >
                            <span className="truncate">{text}</span>
                            <button
                              type="button"
                              onClick={() => removeCustomPracticeAt(idx)}
                              className="ml-0.5 flex-shrink-0 hover:text-gold-muted"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div>
                    <label className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
                      Bar Council No.
                      <span className="ml-1.5 font-normal text-juri-muted">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={barNo}
                      onChange={(e) => setBarNo(e.target.value)}
                      placeholder="e.g. MH/1234/2020"
                      className="w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />

                    {/* Conditional fields when Bar No is entered */}
                    <AnimatePresence>
                      {barNo.trim().length > 0 && (
                        <Motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 grid grid-cols-2 gap-4">
                            <div>
                              <label className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
                                Date of Enrollment
                              </label>
                              <input
                                type="date"
                                value={enrollmentDate}
                                onChange={(e) => setEnrollmentDate(e.target.value)}
                                className="w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-sm text-juri-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
                                State Bar Council
                              </label>
                              <input
                                type="text"
                                value={stateBarCouncil}
                                onChange={(e) => setStateBarCouncil(e.target.value)}
                                placeholder="e.g. Bar Council of Maharashtra"
                                className="w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                              />
                            </div>
                          </div>
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => onComplete(null)}
                      className="flex-1 rounded-xl border border-juri-line py-3 font-dmSans text-sm font-medium text-juri-muted transition hover:border-gold/40 hover:text-juri-ink"
                    >
                      Skip for now
                    </button>
                    <Motion.button
                      type="submit"
                      className="flex-1 rounded-xl py-3 font-dmSans text-sm font-bold text-white shadow-md"
                      style={{ backgroundColor: "#E0334A" }}
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(224,51,74,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      Save &amp; Continue
                    </Motion.button>
                  </div>
                </form>
              </div>
            </Motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

ProfileSetupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  defaultName: PropTypes.string,
  defaultEmail: PropTypes.string,
}

export default ProfileSetupModal
