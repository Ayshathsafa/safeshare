import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import Features from "../components/Features";
import Footer from "../components/Footer";

import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <Hero />
        <Statistics />
        <Features />
      </main>

      <Footer />
    </>
  );
}

export default Home;