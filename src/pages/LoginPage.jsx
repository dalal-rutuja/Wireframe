import { useState } from "react"
import PropTypes from "prop-types"
import { motion as Motion } from "framer-motion"
import gavelIcon from "../assets/Pasted image.png"
import advocateImg from "../assets/advocate.png"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

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

const LoginPage = ({ onBackToHome, onNavigateRegister, onLogin }) => {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Any credentials work — no backend needed for testing
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    onLogin?.({ email, name })
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Left panel ── */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
        {/* Logo */}
        <Motion.div
          className="mb-8 flex justify-center"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-md">
            <img src={gavelIcon} alt="JuriNex" className="h-full w-full object-cover" />
          </div>
        </Motion.div>

        {/* Heading */}
        <Motion.div className="mb-8 text-center" custom={1} variants={fadeUp} initial="hidden" animate="show">
          <h1 className="font-playfair text-3xl font-bold text-juri-ink">
            Welcome to JuriNex
          </h1>
          <p className="mt-2 font-dmSans text-base text-juri-muted">
            Sign in to continue managing your legal workspace.
          </p>
        </Motion.div>

        {/* Form */}
        <Motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
              Email / User ID
            </label>
            <input
              id="login-email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-juri-line bg-white px-4 py-2.5 font-dmSans text-base text-juri-ink placeholder-juri-subtle outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="mb-1.5 block font-dmSans text-sm font-semibold text-juri-ink">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-juri-line bg-white transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded-xl bg-transparent px-4 py-2.5 font-dmSans text-base text-juri-ink placeholder-juri-subtle outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="pr-4 text-juri-muted transition hover:text-juri-ink"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
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

          {/* Sign In button */}
          <Motion.button
            type="submit"
            className="w-full rounded-xl py-3 font-dmSans text-base font-bold text-white shadow-md"
            style={{ backgroundColor: "#E0334A" }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(224,51,74,0.4)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Sign In
          </Motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-juri-line" />
            <span className="font-dmSans text-sm text-juri-muted">Or continue with</span>
            <span className="h-px flex-1 bg-juri-line" />
          </div>

          {/* Google */}
          <Motion.button
            type="button"
            onClick={() => onLogin?.({ email: "google.user@gmail.com", name: "Google User" })}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-juri-line bg-white py-3.5 font-dmSans text-base font-medium text-juri-ink shadow-sm transition hover:bg-gray-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Google colour SVG */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Motion.button>

          {/* Footer links */}
          <p className="text-center font-dmSans text-sm text-juri-muted">
            Don&apos;t have an account?{" "}
            <button type="button" onClick={onNavigateRegister} className="font-semibold text-gold hover:underline">
              Create new account
            </button>
          </p>

          <div className="text-center">
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
        </Motion.form>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="relative hidden lg:block lg:w-1/2">
        <img
          src={advocateImg}
          alt="Legal professionals at work"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 pb-40">
          <Motion.h2
            className="font-playfair text-4xl font-bold leading-tight text-white xl:text-5xl"
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
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/80">
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
  )
}

LoginPage.propTypes = {
  onBackToHome: PropTypes.func,
  onNavigateRegister: PropTypes.func,
  onLogin: PropTypes.func,
}

export default LoginPage
