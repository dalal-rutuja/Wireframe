import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"
import TestimonialsSection from "../components/TestimonialsSection"
import PricingSection from "../components/PricingSection"
import CTASection from "../components/CTASection"
import Footer from "../components/Footer"

/**
 * Marketing landing page composition.
 * No external props.
 */
const HomePage = () => {
  const handleDemo = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLogin = () => {
    window.alert("Login would open your firm SSO here.")
  }

  const handleBookDemo = () => {
    window.alert("We'll reach out to schedule your demo.")
  }

  return (
    <div className="min-h-screen bg-juri-canvas">
      <Navbar onRequestDemo={handleDemo} onLogin={handleLogin} />
      <main>
        <HeroSection onRequestDemo={handleDemo} onLogin={handleLogin} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection onBookDemo={handleBookDemo} />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
