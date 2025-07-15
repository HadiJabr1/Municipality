import HeroSection from '../components/HeroSection/HeroSection'
import ExploreOurTown from '../components/ExploreOurTown/ExploreOurTown'
import QuickAccess from '../components/QuickAccess/QuickAccess'
import EventsSection from '../components/EventsSection/EventsSection'
import NewsSection from '../components/NewsSection/NewsSection'
import ContactSection from '../components/ContactSection/ContactSection'
const Home = () => {
  return (
    <div>
      <HeroSection />
      <ExploreOurTown />
      <QuickAccess />
      <EventsSection />
      <NewsSection />
      <ContactSection />
    </div>
  )
}

export default Home