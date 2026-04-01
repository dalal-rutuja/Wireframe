import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { motion as Motion, AnimatePresence } from "framer-motion"
import gavelIcon from "../assets/Pasted image.png"
import ProfileSetupModal from "../components/ProfileSetupModal"

/* ── Mock case data (matching the screenshot) ── */
const CASES = [
  {
    id: 1,
    title: "Jayant S/o.Madhavrao Potekar Vs State of Maharashtra and others",
    caseNo: "15926 OF 2009",
    court: "High Court of Bombay - Aurangabad",
    caseType: "WRIT JURISDICTION",
    stage: "Writ Petition (Service)",
    advocate: "Unassigned",
    nextHearing: "Never",
    status: "Active",
    docs: 1,
    lastUpdated: "28-03-2026",
  },
  {
    id: 2,
    title: "Paradeshi Tower Vs Fire Department, Municipal Corporation, Chhatrapati...",
    caseNo: "1074 OF 2027",
    court: "N/A",
    caseType: "TRIBUNALS – FINANCIAL & BANKING",
    stage: "N/A",
    advocate: "Unassigned",
    nextHearing: "Never",
    status: "Active",
    docs: 1,
    lastUpdated: "27-03-2026",
  },
  {
    id: 3,
    title: "Leave And licence",
    caseNo: "N/A",
    court: "N/A",
    caseType: "N/A",
    stage: "N/A",
    advocate: "Unassigned",
    nextHearing: "Never",
    status: "Active",
    docs: 8,
    lastUpdated: "26-03-2026",
  },
  {
    id: 4,
    title: "sale deed",
    caseNo: "N/A",
    court: "N/A",
    caseType: "N/A",
    stage: "N/A",
    advocate: "Unassigned",
    nextHearing: "Never",
    status: "Active",
    docs: 15,
    lastUpdated: "26-03-2026",
  },
  {
    id: 5,
    title: "Ajanta Pharma Limited Vs The State of Maharashtra and others",
    caseNo: "2103 OF 2024",
    court: "High Court of Bombay - Aurangabad",
    caseType: "WRIT JURISDICTION",
    stage: "Writ Petition (Civil)",
    advocate: "Amit A. Yadkikar, Akshay Kulkarni",
    nextHearing: "Never",
    status: "Active",
    docs: 1,
    lastUpdated: "26-03-2026",
  },
  {
    id: 6,
    title: "Ram Vs State of Maharashtra",
    caseNo: "3345 OF 2022",
    court: "High Court of Bombay",
    caseType: "CRIMINAL",
    stage: "Sessions Court",
    advocate: "Unassigned",
    nextHearing: "05-04-2026",
    status: "Active",
    docs: 3,
    lastUpdated: "25-03-2026",
  },
  {
    id: 7,
    title: "Shree Builders Vs Municipal Corporation",
    caseNo: "789 OF 2023",
    court: "City Civil Court",
    caseType: "CIVIL",
    stage: "Suit",
    advocate: "Unassigned",
    nextHearing: "Never",
    status: "Active",
    docs: 6,
    lastUpdated: "24-03-2026",
  },
  {
    id: 8,
    title: "Property Dispute - Patil Family",
    caseNo: "N/A",
    court: "N/A",
    caseType: "PROPERTY",
    stage: "N/A",
    advocate: "Unassigned",
    nextHearing: "Never",
    status: "Active",
    docs: 12,
    lastUpdated: "23-03-2026",
  },
  {
    id: 9,
    title: "Reliance Industries Vs Tax Authority",
    caseNo: "4512 OF 2021",
    court: "ITAT Mumbai",
    caseType: "TAXATION",
    stage: "Appeal",
    advocate: "Amit A. Yadkikar",
    nextHearing: "10-04-2026",
    status: "Active",
    docs: 22,
    lastUpdated: "22-03-2026",
  },
  {
    id: 10,
    title: "Employment Termination - Singh Vs Corp Ltd",
    caseNo: "102 OF 2025",
    court: "Labour Court",
    caseType: "LABOUR",
    stage: "Hearing",
    advocate: "Akshay Kulkarni",
    nextHearing: "08-04-2026",
    status: "Active",
    docs: 5,
    lastUpdated: "21-03-2026",
  },
]

const CASE_STATS = [
  { label: "Total Active Cases",             value: 10 },
  { label: "Cases Pending Review",           value: 0  },
  { label: "Upcoming Hearings (Next 7 Days)", value: 0  },
  { label: "Documents Uploaded This Month",  value: 45 },
  { label: "Today's Hearings",               value: 0  },
]

const DASH_STATS = [
  { label: "Active Cases",          value: 10, change: "+2 this week"  },
  { label: "Documents Analysed",    value: 45, change: "+23 this month" },
  { label: "Hours Saved",           value: 64, change: "this month"    },
  { label: "AI Drafts Created",     value: 31, change: "+8 this week"  },
]

const TABS = ["Ongoing", "Pending", "Disposed", "Draft"]
const TAB_COUNTS = { Ongoing: 10, Pending: 0, Disposed: 0, Draft: 0 }
const RECORDS_PER_PAGE_OPTIONS = [5, 10, 20]

/* ── Sidebar nav ── */
const PRIMARY_NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: "cases",
    label: "Create New Case",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "storage",
    label: "Case Storage",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Chat",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: "drafting",
    label: "AI Drafting",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

const SECONDARY_NAV = [
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "billing",
    label: "Billing",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "help",
    label: "Help",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

/* ── Animated counter ── */
const Counter = ({ target }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (target === 0) { setCount(0); return }
    let cur = 0
    const step = Math.max(1, Math.ceil(target / 40))
    const timer = setInterval(() => {
      cur += step
      if (cur >= target) { setCount(target); clearInterval(timer) }
      else setCount(cur)
    }, 28)
    return () => clearInterval(timer)
  }, [target])
  return <>{count}</>
}
Counter.propTypes = { target: PropTypes.number.isRequired }

/* ══════════════════ Dashboard overview ══════════════════ */
const DashboardOverview = ({ displayName }) => (
  <div className="p-6 lg:p-8">
    <div className="mb-6">
      <h1 className="font-playfair text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 font-dmSans text-sm text-gray-500">Welcome back, {displayName}</p>
    </div>

    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {DASH_STATS.map((stat, i) => (
        <Motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="rounded-lg border border-gray-200 bg-white p-5"
        >
          <p className="font-dmSans text-xs font-medium text-gray-500">{stat.label}</p>
          <p className="mt-2 font-dmSans text-3xl font-bold text-gray-900">
            <Counter target={stat.value} />
          </p>
          <p className="mt-1 font-dmSans text-xs text-emerald-600">{stat.change}</p>
        </Motion.div>
      ))}
    </div>

    {/* AI Insights banner */}
    <Motion.div
      className="relative overflow-hidden rounded-xl p-6 text-white"
      style={{ background: "linear-gradient(135deg, #E0334A 0%, #B91C1C 100%)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32, duration: 0.4 }}
    >
      <Motion.div
        className="pointer-events-none absolute right-[-5%] top-0 h-full w-[30%] rounded-full bg-white/10 blur-3xl"
        animate={{ x: ["0%", "20%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h3 className="font-playfair text-xl font-bold">Continue where you left off</h3>
          <p className="mt-1 font-dmSans text-sm text-white/80">
            1 citation check in progress · 2 drafts awaiting review
          </p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 rounded-lg bg-white px-5 py-2.5 font-dmSans text-sm font-bold text-gold transition hover:bg-white/90"
        >
          Resume
        </button>
      </div>
    </Motion.div>
  </div>
)

DashboardOverview.propTypes = { displayName: PropTypes.string }

/* ══════════════════ Case Briefs page ══════════════════ */
const CaseBriefs = () => {
  const [activeTab, setActiveTab]         = useState("Ongoing")
  const [currentPage, setCurrentPage]     = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(5)

  const totalPages = Math.ceil(CASES.length / recordsPerPage)
  const paginated  = CASES.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-10 lg:px-8 lg:pb-8 lg:pt-14">

        {/* Page header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-gray-900">Case Briefs</h1>
            <p className="mt-0.5 font-dmSans text-sm text-gray-500">
              Manage, track, and analyze all your cases in one place.
            </p>
          </div>
          <button
            type="button"
            className="flex-shrink-0 rounded-lg px-4 py-2.5 font-dmSans text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#E0334A" }}
          >
            Create New Case
          </button>
        </div>

        {/* Cases table card */}
        <div className="border border-gray-200 bg-white shadow-sm">
          {/* Cases heading */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-dmSans text-base font-semibold text-gray-900">Cases</h2>
          </div>

          {/* Tabs + filter icon */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6">
            <div className="flex">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => { setActiveTab(tab); setCurrentPage(1) }}
                  className={`relative mr-1 pb-3.5 pr-7 pt-4 font-dmSans text-sm transition-colors ${
                    activeTab === tab
                      ? "font-semibold text-gray-900"
                      : "font-medium text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab} ({TAB_COUNTS[tab]})
                  {activeTab === tab && (
                    <Motion.span
                      layoutId="casebriefs-tab-underline"
                      className="absolute bottom-0 left-0 right-7 h-[2.5px] rounded-t-sm bg-gray-900"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
              title="Filter"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    { label: "Title",              cls: "w-[19%]" },
                    { label: "Case No.",           cls: "w-[10%]" },
                    { label: "Court/Bench",        cls: "w-[15%]" },
                    { label: "Case Type/Stage",    cls: "w-[16%]" },
                    { label: "Advocate-in-Charge", cls: "w-[12%]" },
                    { label: "Next Hearing",       cls: "w-[9%]"  },
                    { label: "Status",             cls: "w-[7%]"  },
                    { label: "Docs",               cls: "w-[4%]"  },
                    { label: "Last Updated",       cls: "w-[9%]"  },
                    { label: "Actions",            cls: "w-[8%]"  },
                  ].map(({ label, cls }) => (
                    <th
                      key={label}
                      className={`${cls} px-5 py-3.5 text-left font-dmSans text-xs font-bold uppercase tracking-wide text-gray-700`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((c, i) => (
                  <Motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="transition-colors hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-5 font-dmSans text-sm font-medium leading-snug text-gray-800">
                      {c.title}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600 whitespace-nowrap">
                      {c.caseNo}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600">
                      {c.court}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600">
                      {c.caseType}/{c.stage}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600">
                      {c.advocate}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600 whitespace-nowrap">
                      {c.nextHearing}
                    </td>
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-dmSans text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-center font-dmSans text-sm text-gray-600">
                      {c.docs}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600 whitespace-nowrap">
                      {c.lastUpdated}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <button type="button" className="text-gray-400 transition hover:text-gray-700" title="View">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button type="button" className="text-gray-400 transition hover:text-gray-700" title="Edit">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button type="button" className="text-gray-400 transition hover:text-red-500" title="Delete">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </Motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-dmSans text-sm text-gray-500">
                Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
                {Math.min(currentPage * recordsPerPage, CASES.length)} of {CASES.length} results
              </span>
              <span className="font-dmSans text-sm text-gray-400">|</span>
              <span className="font-dmSans text-sm text-gray-500">Records per page:</span>
              <select
                value={recordsPerPage}
                onChange={(e) => { setRecordsPerPage(Number(e.target.value)); setCurrentPage(1) }}
                className="rounded-md border border-gray-200 bg-white px-2 py-1 font-dmSans text-sm text-gray-700 outline-none focus:border-gray-300"
              >
                {RECORDS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 font-dmSans text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[36px] rounded-lg border px-2.5 py-1.5 font-dmSans text-sm font-medium transition ${
                    currentPage === page
                      ? "border-transparent text-white"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                  style={currentPage === page ? { backgroundColor: "#E0334A", borderColor: "#E0334A" } : {}}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 font-dmSans text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════ Placeholder pages ══════════════════ */
const Placeholder = ({ label }) => (
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 className="font-playfair text-xl font-semibold text-gray-900">{label}</h2>
      <p className="mt-1 font-dmSans text-sm text-gray-500">This section is coming soon.</p>
    </div>
  </div>
)
Placeholder.propTypes = { label: PropTypes.string }

/* ══════════════════ Cases List page (Create New Case nav) ══════════════════ */
const CasesListPage = ({ displayName }) => {
  const [activeTab, setActiveTab]   = useState("Ongoing")
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(5)

  const totalPages = Math.ceil(CASES.length / recordsPerPage)
  const paginated  = CASES.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gray-50">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-7 lg:px-8">

        {/* Greeting header */}
        <div className="mb-6">
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900">
            Hello, Adv. {displayName.split(" ")[0]}
          </h1>
        </div>

        {/* Stat cards row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {CASE_STATS.map((stat, i) => (
            <Motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm"
            >
              <p className="font-dmSans text-sm text-gray-500 leading-snug">{stat.label}</p>
              <p className="mt-3 font-dmSans text-4xl font-bold text-gray-900 leading-none">
                <Counter target={stat.value} />
              </p>
            </Motion.div>
          ))}
        </div>

        {/* Cases card */}
        <div className="border border-gray-200 bg-white shadow-sm">

          {/* Cases heading inside card */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-dmSans text-base font-semibold text-gray-900">Cases</h2>
          </div>

          {/* Tabs row + filter icon */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6">
            <div className="flex">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => { setActiveTab(tab); setCurrentPage(1) }}
                  className={`relative mr-1 pb-3.5 pr-7 pt-4 font-dmSans text-sm transition-colors ${
                    activeTab === tab
                      ? "font-semibold text-gray-900"
                      : "font-medium text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab} ({TAB_COUNTS[tab]})
                  {activeTab === tab && (
                    <Motion.span
                      layoutId="caseslist-tab-underline"
                      className="absolute bottom-0 left-0 right-7 h-[2.5px] rounded-t-sm bg-gray-900"
                    />
                  )}
                </button>
              ))}
            </div>
            {/* Filter icon */}
            <button
              type="button"
              className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
              title="Filter"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    { label: "Title",              cls: "w-[19%]" },
                    { label: "Case No.",           cls: "w-[10%]" },
                    { label: "Court/Bench",        cls: "w-[15%]" },
                    { label: "Case Type/Stage",    cls: "w-[16%]" },
                    { label: "Advocate-in-Charge", cls: "w-[12%]" },
                    { label: "Next Hearing",       cls: "w-[9%]"  },
                    { label: "Status",             cls: "w-[7%]"  },
                    { label: "Docs",               cls: "w-[4%]"  },
                    { label: "Last Updated",       cls: "w-[9%]"  },
                    { label: "Actions",            cls: "w-[8%]"  },
                  ].map(({ label, cls }) => (
                    <th
                      key={label}
                      className={`${cls} px-5 py-3.5 text-left font-dmSans text-xs font-bold uppercase tracking-wide text-gray-700`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((c, i) => (
                  <Motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="transition-colors hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-5 font-dmSans text-sm font-medium leading-snug text-gray-800">
                      {c.title}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600 whitespace-nowrap">
                      {c.caseNo}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600">
                      {c.court}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600">
                      {c.caseType}/{c.stage}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600">
                      {c.advocate}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600 whitespace-nowrap">
                      {c.nextHearing}
                    </td>
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-dmSans text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-center font-dmSans text-sm text-gray-600">
                      {c.docs}
                    </td>
                    <td className="px-5 py-5 font-dmSans text-sm text-gray-600 whitespace-nowrap">
                      {c.lastUpdated}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <button type="button" className="text-gray-400 transition hover:text-gray-700" title="View">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button type="button" className="text-gray-400 transition hover:text-gray-700" title="Edit">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button type="button" className="text-gray-400 transition hover:text-red-500" title="Delete">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </Motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-dmSans text-sm text-gray-500">
                Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
                {Math.min(currentPage * recordsPerPage, CASES.length)} of {CASES.length} results
              </span>
              <span className="font-dmSans text-sm text-gray-400">|</span>
              <span className="font-dmSans text-sm text-gray-500">Records per page:</span>
              <select
                value={recordsPerPage}
                onChange={(e) => { setRecordsPerPage(Number(e.target.value)); setCurrentPage(1) }}
                className="rounded-md border border-gray-200 bg-white px-2 py-1 font-dmSans text-sm text-gray-700 outline-none focus:border-gray-300"
              >
                {RECORDS_PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 font-dmSans text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => setCurrentPage(pg)}
                  className={`min-w-[36px] rounded-lg border px-2.5 py-1.5 font-dmSans text-sm font-medium transition ${
                    currentPage === pg
                      ? "border-transparent text-white"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                  style={currentPage === pg ? { backgroundColor: "#E0334A", borderColor: "#E0334A" } : {}}
                >
                  {pg}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 font-dmSans text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CasesListPage.propTypes = { displayName: PropTypes.string }

/* ══════════════════ Main Dashboard ══════════════════ */
const DashboardPage = ({ user, onLogout }) => {
  const [activeNav, setActiveNav]     = useState("dashboard")
  const [collapsed, setCollapsed]     = useState(false)
  const [profileOpen, setProfileOpen] = useState(() => {
    const key = `profile_done_${user?.email || "guest"}`
    return !localStorage.getItem(key)
  })

  const displayName = user?.name || user?.email?.split("@")[0] || "User"

  const handleProfileComplete = () => {
    const key = `profile_done_${user?.email || "guest"}`
    localStorage.setItem(key, "1")
    setProfileOpen(false)
  }

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard": return <CasesListPage displayName={displayName} />
      case "cases":     return <CaseBriefs />
      default:          return <Placeholder label={PRIMARY_NAV.find(n => n.id === activeNav)?.label || SECONDARY_NAV.find(n => n.id === activeNav)?.label} />
    }
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col" style={{ backgroundColor: "#111827" }}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-6 ${collapsed ? "justify-center" : ""}`}>
        <img src={gavelIcon} alt="" aria-hidden="true" className="h-10 w-10 flex-shrink-0 rounded-xl" />
        {!collapsed && (
          <span className="flex items-start gap-0.5 font-playfair text-2xl font-extrabold leading-none tracking-tight text-white">
            JuriNex
            <span
              aria-hidden="true"
              className="mt-0.5 font-dmSans font-semibold"
              style={{ verticalAlign: "super", fontSize: "9px" }}
            >
              TM
            </span>
          </span>
        )}
      </div>

      {/* Primary nav */}
      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 pb-4">
        {PRIMARY_NAV.map((item) => {
          const isActive = activeNav === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => { setActiveNav(item.id) }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3.5 text-left transition-all duration-150 ${
                isActive
                  ? "bg-white text-gray-900 font-semibold shadow-sm"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className={`flex-shrink-0 ${isActive ? "text-gray-800" : ""}`}>{item.icon}</span>
              {!collapsed && (
                <span className="font-dmSans text-[15px] font-medium tracking-tight">
                  {item.label}
                </span>
              )}
            </button>
          )
        })}

        {/* Spacer + secondary nav */}
        <div className="mt-auto pt-6">
          <div className="mb-3 border-t border-white/10" />
          {SECONDARY_NAV.map((item) => {
            const isActive = activeNav === item.id
            const isGold = item.id === "profile" || item.id === "billing"
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { setActiveNav(item.id) }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3.5 text-left transition-all duration-150 ${
                  isActive
                    ? "bg-white text-gray-900 font-bold shadow-sm"
                    : isGold
                      ? "text-amber-400 hover:bg-white/10 hover:text-amber-300"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="font-dmSans text-[15px] font-medium tracking-tight">
                    {item.label}
                  </span>
                )}
              </button>
            )
          })}

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3.5 text-left text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <svg className="h-[18px] w-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!collapsed && <span className="font-dmSans text-sm">Logout</span>}
          </button>
        </div>
      </nav>

      {/* Collapse button */}
      <div className="border-t border-white/10 px-3 py-4">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-dmSans text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <svg
            className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-dmSans">

      {/* ── Sidebar — always visible ── */}
      <aside
        className={`flex flex-shrink-0 flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}
        style={{ backgroundColor: "#111827" }}
      >
        <SidebarContent />
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Motion.div
              key={activeNav}
              className="h-full overflow-hidden"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {renderContent()}
            </Motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={profileOpen}
        onComplete={handleProfileComplete}
        defaultName={user?.name || ""}
        defaultEmail={user?.email || ""}
      />
    </div>
  )
}

DashboardPage.propTypes = {
  user: PropTypes.shape({ name: PropTypes.string, email: PropTypes.string }),
  onLogout: PropTypes.func,
}

export default DashboardPage
