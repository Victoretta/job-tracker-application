import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import JobSection from "../components/JobSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";
import TopCompanies from "../components/TopCompanies";

function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <JobSection
        title="🔥 Featured Jobs"
        subtitle="Apply now to the latest opportunities."
        status="Available"
      />

      <TopCompanies />

      <JobSection
        title="🚀 Coming Soon"
        subtitle="These positions will open soon. Prepare your resume now."
        status="Coming Soon"
        background="#ffffff"
      />

      <WhyChooseUs />

      <StatsSection />

      <JobSection
        title="📁 Recently Closed Jobs"
        subtitle="Recently closed opportunities."
        status="Closed"
      />
      <Footer />
    </>
  );
}

export default Home;