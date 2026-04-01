import { useState } from "react"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ContactPage from "./pages/ContactPage"
import DashboardPage from "./pages/DashboardPage"

const App = () => {
  const [page, setPage]               = useState("home")
  const [pendingSection, setPendingSection] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const goToSection = (sectionId) => {
    setPendingSection(sectionId)
    setPage("home")
  }

  const handleLogin = (userCredentials) => {
    setCurrentUser(userCredentials)
    setPage("dashboard")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setPage("home")
  }

  if (page === "dashboard" && currentUser) {
    return (
      <DashboardPage
        user={currentUser}
        onLogout={handleLogout}
      />
    )
  }

  if (page === "login") {
    return (
      <LoginPage
        onBackToHome={() => setPage("home")}
        onNavigateRegister={() => setPage("register")}
        onLogin={handleLogin}
      />
    )
  }

  if (page === "register") {
    return (
      <RegisterPage
        onBackToHome={() => setPage("home")}
        onBackToLogin={() => setPage("login")}
      />
    )
  }

  if (page === "contact") {
    return (
      <ContactPage
        onBackToHome={() => setPage("home")}
        onNavigateLogin={() => setPage("login")}
        onOpenDemo={() => setPage("home")}
        onSectionNav={goToSection}
      />
    )
  }

  return (
    <HomePage
      onNavigateLogin={() => setPage("login")}
      onNavigateContact={() => setPage("contact")}
      pendingSection={pendingSection}
      onPendingSectionConsumed={() => setPendingSection(null)}
    />
  )
}

export default App
