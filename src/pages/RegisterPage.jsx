import { useState } from "react"
import { motion as Motion, AnimatePresence } from "framer-motion"
import gavelIcon from "../assets/Pasted image.png"
import advocateImg from "../assets/advocate.png"
import PolicyModal from "../components/landing/PolicyModal"


const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", iso: "IN" },
  { code: "+1",  flag: "🇺🇸", iso: "US" },
  { code: "+44", flag: "🇬🇧", iso: "GB" },
  { code: "+61", flag: "🇦🇺", iso: "AU" },
  { code: "+971", flag: "🇦🇪", iso: "AE" },
]

const FEATURES = [
  {
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Accelerate case preparation",
    desc: "in minutes with AI-powered tools",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Smart Document Vault",
    desc: "Secure, searchable, and organized",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trusted Legal Insights",
    desc: "AI-driven precedents & analysis",
  },
]

const checkPassword = (pw) => ({
  length:  pw.length >= 8,
  upper:   /[A-Z]/.test(pw),
  number:  /[0-9]/.test(pw),
  special: /[!@#$%^&*]/.test(pw),
})

const strengthLevel = (checks) => {
  const n = Object.values(checks).filter(Boolean).length
  if (n <= 1) return { label: "Weak",   color: "#EF4444", pct: "25%" }
  if (n === 2) return { label: "Fair",   color: "#F59E0B", pct: "50%" }
  if (n === 3) return { label: "Good",   color: "#3B82F6", pct: "75%" }
  return           { label: "Strong", color: "#22C55E", pct: "100%" }
}

const inputCls =
  "w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"

const Label = ({ children }) => (
  <label className="mb-1 block font-dmSans text-sm font-semibold text-juri-ink">
    {children}
  </label>
)

const Optional = () => (
  <span className="ml-1 font-normal text-juri-muted">(optional)</span>
)

/* ── Phone field ── */
const PhoneField = ({ countryCode, setCountryCode, value, onChange }) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Label>Phone Number</Label>
      <div className="flex overflow-hidden rounded-xl border border-juri-line bg-white transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
        <div className="relative">
          <button
            type="button"
            className="flex h-full items-center gap-1.5 border-r border-juri-line px-3 font-dmSans text-sm text-juri-ink transition hover:bg-gray-50"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{countryCode.flag}</span>
            <svg className="h-3 w-3 text-juri-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {open && (
              <Motion.ul
                className="absolute left-0 top-full z-20 mt-1 min-w-[130px] overflow-hidden rounded-xl border border-juri-line bg-white shadow-lg"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
              >
                {COUNTRY_CODES.map((c) => (
                  <li key={c.iso}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 font-dmSans text-sm text-juri-ink transition hover:bg-gray-50"
                      onClick={() => { setCountryCode(c); setOpen(false) }}
                    >
                      <span>{c.flag}</span>
                      <span>{c.code}</span>
                      <span className="text-xs text-juri-muted">{c.iso}</span>
                    </button>
                  </li>
                ))}
              </Motion.ul>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-1 items-center gap-2 px-3">
          <span className="whitespace-nowrap font-dmSans text-sm text-juri-ink">{countryCode.code}</span>
          <input
            type="tel"
            placeholder="Phone number"
            value={value}
            onChange={onChange}
            className="flex-1 bg-transparent py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none"
          />
        </div>
      </div>
    </div>
  )
}

/* ── Password field ── */
const PasswordField = ({ id, label, show, onToggle, value, onChange, required = true }) => (
  <div>
    <label htmlFor={id} className="mb-1 block font-dmSans text-sm font-semibold text-juri-ink">
      {label}
    </label>
    <div className="flex items-center rounded-xl border border-juri-line bg-white transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
      <input
        id={id}
        type={show ? "text" : "password"}
        required={required}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        className="flex-1 rounded-xl bg-transparent px-4 py-2.5 font-dmSans text-sm text-juri-ink placeholder-juri-subtle outline-none"
      />
      <button type="button" onClick={onToggle} className="pr-4 text-juri-muted transition hover:text-juri-ink">
        {show ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </button>
    </div>
  </div>
)

/* ── Conditional enrollment fields ── */
const EnrollmentFields = ({ enrollmentDate, stateBarCouncil, onDate, onState, optional = false }) => (
  <Motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
    className="space-y-4 overflow-hidden"
  >
    <div>
      <Label>Enrollment Date{optional && <Optional />}</Label>
      <input type="date" value={enrollmentDate} onChange={onDate} className={inputCls} />
    </div>
    <div>
      <Label>State Bar Council{optional && <Optional />}</Label>
      <input type="text" placeholder="e.g. Bar Council of Maharashtra" value={stateBarCouncil} onChange={onState} className={inputCls} />
    </div>
  </Motion.div>
)

/* ══════════════════ Main component ══════════════════ */
const RegisterPage = ({ onBackToLogin, onBackToHome }) => {
  const [mode, setMode] = useState("solo")
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0])
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed]           = useState(false)
  const [dpdpa, setDpdpa]             = useState(false)
  const [modalOpen, setModalOpen]     = useState(null) // "terms" | "dpdpa" | null

  const [form, setForm] = useState({
    fullName: "", firmName: "", advocateName: "",
    email: "", phone: "", barEnrollment: "",
    enrollmentDate: "", stateBarCouncil: "",
    password: "", confirmPassword: "",
  })

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const showBarFields  = form.barEnrollment.trim().length > 0
  const pwChecks       = checkPassword(form.password)
  const strength       = strengthLevel(pwChecks)
  const pwMismatch     = form.confirmPassword.length > 0 && form.password !== form.confirmPassword

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwMismatch) return
    window.alert("Registration submitted — connect your backend here.")
  }

  return (
    <>
    <div className="flex min-h-screen w-full">

      {/* ── Left form panel ── */}
      <div className="flex w-full flex-col items-center justify-start overflow-y-auto bg-white px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-md">
              <img src={gavelIcon} alt="JuriNex" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="font-dmSans text-2xl font-bold text-juri-ink">
              Create Your JuriNex Account
            </h1>
          </div>

          {/* Solo / Firm toggle */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className={`font-dmSans text-sm font-semibold transition-colors ${mode === "solo" ? "text-gold" : "text-juri-muted"}`}>
              Solo User
            </span>

            {/* iOS-style switch */}
            <button
              type="button"
              role="switch"
              aria-checked={mode === "firm"}
              onClick={() => {
                setMode((m) => m === "solo" ? "firm" : "solo")
                setForm((p) => ({ ...p, barEnrollment: "", enrollmentDate: "", stateBarCouncil: "" }))
              }}
              className={`relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 ${
                mode === "firm" ? "bg-gold" : "bg-gray-300"
              }`}
            >
              <Motion.span
                className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
                animate={{ x: mode === "firm" ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            </button>

            <span className={`font-dmSans text-sm font-semibold transition-colors ${mode === "firm" ? "text-gold" : "text-juri-muted"}`}>
              Firm
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <AnimatePresence mode="wait">
              {mode === "solo" ? (
                <Motion.div
                  key="solo-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <div>
                    <Label>Full Name</Label>
                    <input type="text" required placeholder="Enter your full name" value={form.fullName} onChange={set("fullName")} className={inputCls} />
                  </div>

                  {/* Email */}
                  <div>
                    <Label>Email Address</Label>
                    <input type="email" required placeholder="Enter your email" value={form.email} onChange={set("email")} className={inputCls} />
                  </div>

                  {/* Phone */}
                  <PhoneField countryCode={countryCode} setCountryCode={setCountryCode} value={form.phone} onChange={set("phone")} />

                  {/* Bar Enrollment */}
                  <div>
                    <Label>Bar Enrollment Number<Optional /></Label>
                    <input type="text" placeholder="e.g. MH/1234/2020" value={form.barEnrollment} onChange={set("barEnrollment")} className={inputCls} />
                  </div>

                  {/* Conditional enrollment fields */}
                  <AnimatePresence>
                    {showBarFields && (
                      <EnrollmentFields
                        enrollmentDate={form.enrollmentDate}
                        stateBarCouncil={form.stateBarCouncil}
                        onDate={set("enrollmentDate")}
                        onState={set("stateBarCouncil")}
                        optional={false}
                      />
                    )}
                  </AnimatePresence>
                </Motion.div>
              ) : (
                <Motion.div
                  key="firm-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Firm Name */}
                  <div>
                    <Label>Firm Name</Label>
                    <input type="text" required placeholder="Enter your firm name" value={form.firmName} onChange={set("firmName")} className={inputCls} />
                  </div>

                  {/* Advocate Name */}
                  <div>
                    <Label>Full Name of Advocate Registering Firm</Label>
                    <input type="text" required placeholder="Enter advocate's full name" value={form.advocateName} onChange={set("advocateName")} className={inputCls} />
                  </div>

                  {/* Bar Enrollment */}
                  <div>
                    <Label>Bar Enrollment Number<Optional /></Label>
                    <input type="text" placeholder="e.g. MH/1234/2020" value={form.barEnrollment} onChange={set("barEnrollment")} className={inputCls} />
                  </div>

                  {/* Conditional enrollment fields */}
                  <AnimatePresence>
                    {showBarFields && (
                      <EnrollmentFields
                        enrollmentDate={form.enrollmentDate}
                        stateBarCouncil={form.stateBarCouncil}
                        onDate={set("enrollmentDate")}
                        onState={set("stateBarCouncil")}
                        optional={true}
                      />
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div>
                    <Label>Email Address</Label>
                    <input type="email" required placeholder="Enter your email" value={form.email} onChange={set("email")} className={inputCls} />
                  </div>

                  {/* Phone */}
                  <PhoneField countryCode={countryCode} setCountryCode={setCountryCode} value={form.phone} onChange={set("phone")} />
                </Motion.div>
              )}
            </AnimatePresence>

            {/* Password */}
            <PasswordField
              id="reg-password"
              label="Password"
              show={showPass}
              onToggle={() => setShowPass((v) => !v)}
              value={form.password}
              onChange={set("password")}
            />

            {/* Password strength */}
            <AnimatePresence>
              {form.password.length > 0 && (
                <Motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 overflow-hidden"
                >
                  {/* Bar */}
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <Motion.div
                        className="h-full rounded-full"
                        animate={{ width: strength.pct }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ backgroundColor: strength.color }}
                      />
                    </div>
                    <span className="font-dmSans text-xs font-semibold" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                  {/* Checklist */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {[
                      [pwChecks.length,  "At least 8 characters"],
                      [pwChecks.upper,   "Contains an uppercase letter"],
                      [pwChecks.number,  "Contains a number"],
                      [pwChecks.special, "Contains a special character (!@#$%)"],
                    ].map(([ok, text]) => (
                      <div key={text} className="flex items-center gap-1.5">
                        <svg
                          className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${ok ? "text-green-500" : "text-gray-300"}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`font-dmSans text-xs transition-colors ${ok ? "text-green-600" : "text-juri-muted"}`}>
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>

            {/* Confirm Password */}
            <PasswordField
              id="reg-confirm"
              label="Confirm Password"
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
            />

            {/* Mismatch error */}
            <AnimatePresence>
              {pwMismatch && (
                <Motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-dmSans text-xs text-red-500"
                >
                  Passwords do not match
                </Motion.p>
              )}
            </AnimatePresence>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  readOnly
                  className="mt-0.5 h-4 w-4 accent-gold rounded cursor-pointer"
                  onClick={() => !agreed && setModalOpen("terms")}
                />
                <span className="font-dmSans text-sm text-juri-muted">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setModalOpen("terms")}
                    className="font-semibold text-gold underline hover:no-underline"
                  >
                    Terms &amp; Conditions
                  </button>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={dpdpa}
                  readOnly
                  className="mt-0.5 h-4 w-4 accent-gold rounded cursor-pointer"
                  onClick={() => !dpdpa && setModalOpen("dpdpa")}
                />
                <span className="font-dmSans text-sm text-juri-muted">
                  I consent to data processing under{" "}
                  <button
                    type="button"
                    onClick={() => setModalOpen("dpdpa")}
                    className="font-semibold text-gold underline hover:no-underline"
                  >
                    DPDPA guidelines
                  </button>
                </span>
              </div>
            </div>

            {/* Register button */}
            <Motion.button
              type="submit"
              disabled={!agreed || !dpdpa || pwMismatch}
              className="w-full rounded-xl py-3 font-dmSans text-base font-bold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#E0334A" }}
              whileHover={agreed && dpdpa && !pwMismatch ? { scale: 1.02, boxShadow: "0 8px 24px rgba(224,51,74,0.4)" } : {}}
              whileTap={agreed && dpdpa && !pwMismatch ? { scale: 0.97 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Register
            </Motion.button>

            {/* Login link */}
            <p className="text-center font-dmSans text-sm text-juri-muted">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onBackToLogin}
                className="font-semibold text-gold hover:underline"
              >
                Login
              </button>
            </p>

            {/* Back to Home */}
            <div className="pb-4 text-center">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1 font-dmSans text-sm text-juri-muted transition hover:text-juri-ink"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Right image panel ── */}
      <div className="relative hidden lg:block lg:w-1/2">
        <img
          src={advocateImg}
          alt="Legal professionals at work"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-end p-12 pb-40">
          <Motion.h2
            className="font-dmSans text-4xl font-bold leading-tight text-white xl:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
          >
            Automate Your Legal<br />Workflow in Minutes
          </Motion.h2>

          <div className="mt-8 space-y-5">
            {FEATURES.map((f, i) => (
              <Motion.div
                key={f.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.35 + i * 0.1 } }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#E0334A" }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="font-dmSans text-base font-semibold text-white">{f.title}</p>
                  <p className="font-dmSans text-sm text-white/60">{f.desc}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* Policy modals */}
      {modalOpen && (
        <PolicyModal
          policyKey={modalOpen}
          onClose={() => setModalOpen(null)}
          onAccept={() => {
            if (modalOpen === "terms") setAgreed(true)
            if (modalOpen === "dpdpa") setDpdpa(true)
            setModalOpen(null)
          }}
        />
      )}
    </>
  )
}

export default RegisterPage
