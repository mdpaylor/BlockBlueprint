import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureGrid from "../components/FeatureGrid";
import HowItWorks from "../components/HowItWorks";
import ContactSection from "../components/ContactSection"
import "../css/HomePage.css";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid />
        <HowItWorks />
        <ContactSection />
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
