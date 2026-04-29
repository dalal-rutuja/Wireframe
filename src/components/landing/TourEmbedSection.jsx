import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types"
import dashboardPreview from "../../assets/jurinex-dashboard-preview.png"

const TOUR_EMBED_URL =
  "https://app.supademo.com/embed/cmojngfoo6l9qza2ix8047946?embed_v=2&utm_source=embed"

const TourEmbedSection = ({ onCustomTour } = {}) => {
  const [tourOpen, setTourOpen] = useState(false)

  const openTour = () => setTourOpen(true)
  const closeTour = () => setTourOpen(false)

  const handleCustomTourClick = () => {
    if (onCustomTour) {
      onCustomTour()
      return
    }
    const next = document.getElementById("features")
    if (next) next.scrollIntoView({ behavior: "smooth" })
  }

  // Close on Escape and lock body scroll while modal is open
  useEffect(() => {
    if (!tourOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") closeTour()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [tourOpen])

  return (
    <section className="relative overflow-hidden bg-juri-canvas px-6 py-24 sm:px-10 lg:px-24">
      <div className="mx-auto w-full max-w-6xl text-center">
        <h2 className="font-playfair text-4xl font-semibold leading-tight text-juri-ink sm:text-5xl lg:text-6xl">
          Explore Jurinex now
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-juri-muted sm:text-lg">
          Deciding on your legal AI partner can be hard. That&apos;s why we&apos;ve made evaluating
          Jurinex easy. Check out free, interactive tours of all our products here.
        </p>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-juri-line bg-white p-6 shadow-2xl shadow-gold/10 sm:p-8 lg:flex-row lg:items-stretch">
        {/* Left: tour preview thumbnail */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-gold/10 p-5 lg:w-3/5">
          <button
            type="button"
            onClick={openTour}
            aria-label="Open the full Jurinex product tour"
            className="relative block w-full overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-juri-line transition hover:ring-gold/40"
            style={{ aspectRatio: "2.03 / 1" }}
          >
            <img
              src={dashboardPreview}
              alt="Preview of the Jurinex dashboard showing case management"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
          </button>
        </div>

        {/* Right: copy + CTA */}
        <div className="flex w-full flex-col justify-center gap-5 px-2 text-left lg:w-2/5 lg:px-6">
          <h3 className="font-playfair text-3xl font-bold tracking-tight text-juri-ink sm:text-4xl">
            Full Product Tour
          </h3>
          <p className="text-lg leading-relaxed text-juri-muted">
            See Jurinex in action for end-to-end workflows
          </p>
          <p className="text-sm font-semibold text-juri-subtle">
            Estimated time: ~8 minutes
          </p>

          <div className="mt-4">
            <button
              type="button"
              onClick={openTour}
              className="group inline-flex items-center gap-3 rounded-full bg-gold py-3 pl-6 pr-3 text-base font-semibold text-white shadow-lg shadow-gold/40 transition hover:scale-[1.03] hover:bg-gold-light hover:shadow-xl active:scale-[0.97]"
            >
              <span>Take the full tour</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 8l4 4-4 4" />
                  <path d="M8 12h8" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom tour prompt */}
      <div className="mx-auto mt-14 flex w-full max-w-3xl flex-col items-center text-center">
        <p className="text-base text-juri-muted sm:text-lg">
          or pick a custom tour curated for your practice and use case
        </p>
        <button
          type="button"
          onClick={handleCustomTourClick}
          aria-label="See custom tours"
          className="mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:border-gold hover:bg-gold hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {tourOpen &&
        createPortal(
          <div
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-8"
            role="dialog"
            aria-modal="true"
            aria-label="Jurinex product tour"
          >
            <div className="pointer-events-auto relative w-full max-w-[92vw] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-juri-line">
              <button
                type="button"
                onClick={closeTour}
                aria-label="Close tour"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-juri-ink shadow-md ring-1 ring-juri-line transition hover:bg-gold hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <div
                className="relative w-full"
                style={{ height: "min(88vh, calc(92vw * 9 / 16))" }}
              >
                <iframe
                  src={TOUR_EMBED_URL}
                  loading="lazy"
                  title="Jurinex Product Tour"
                  allow="clipboard-write; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}

TourEmbedSection.propTypes = {
  onCustomTour: PropTypes.func,
}

export default TourEmbedSection
