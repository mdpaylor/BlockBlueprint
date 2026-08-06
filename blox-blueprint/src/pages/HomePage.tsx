import { Outlet } from "react-router-dom";
import Navbar from "../components/homePage/Navbar";
import HeroSection from "../components/homePage/HeroSection";
import FeatureGrid from "../components/homePage/FeatureGrid";
import HowItWorks from "../components/homePage/HowItWorks";
import ContactSection from "../components/homePage/ContactSection";
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

      <Outlet />
    </>
  );
}

export default HomePage;
