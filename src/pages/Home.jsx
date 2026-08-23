import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import Features from "../components/Features";
import Categories from "../components/Categories";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <Hero />
        <Statistics />
        <Features />
        <Categories />
      </main>
    </>
  );
}

export default Home;