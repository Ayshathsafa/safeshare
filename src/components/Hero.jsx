import "./Hero.css";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-text">

          <h1>
            Share Hope.
            <br />
            Save Lives.
          </h1>

          <p>
            SafeShare is an AI-powered platform that connects donors with
            people and organizations in need by redistributing food,
            medicines, clothes, books, and essential supplies safely.
          </p>

          <div className="hero-buttons">
            <button className="donate-btn">Donate Now</button>
            <button className="help-btn">Find Help</button>
          </div>

        </div>

        <div className="hero-image">
          <img src={heroImage} alt="SafeShare" />
        </div>

      </div>

    </section>
  );
}

export default Hero;