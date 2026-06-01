import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import CareerPaths from '../components/CareerPaths';
import DashboardPreview from '../components/DashboardPreview';
import SuccessStories from '../components/SuccessStories';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <CareerPaths />
      <DashboardPreview />
      <SuccessStories />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Home;
