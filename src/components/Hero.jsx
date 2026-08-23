import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const slides = [
    {
      image: "/images/food-donation.jpg",
      title: "Turn Surplus Into Support",
      text: "Share food and essential resources with people who need them.",
    },
    {
      image: "/images/medicine-donation.jpg",
      title: "Share. Support. Save Lives.",
      text: "Connect unused medicines and medical supplies with verified organizations.",
    },
    {
      image: "/images/community-support.jpg",
      title: "Together, We Can Make a Difference",
      text: "SafeShare connects donors, NGOs and hospitals through intelligent matching.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Next
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Previous
  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // Select slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section className="hero">

      {/* Background Image */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      ></div>

      {/* Dark overlay for readable text */}
      <div className="hero-overlay"></div>

      {/* Text Content */}
      <div className="hero-content">

        <span className="hero-tag">
          SAFE • SHARE • SUPPORT
        </span>

        <h1>{slide.title}</h1>

        <p>{slide.text}</p>

        <div className="hero-buttons">

          <Link to="/donate" className="hero-primary-btn">
            Donate Now
          </Link>

          <Link to="/about" className="hero-secondary-btn">
            Learn More
          </Link>

        </div>

      </div>

      {/* Previous Button */}
      <button
        className="slider-arrow slider-left"
        onClick={previousSlide}
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        className="slider-arrow slider-right"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="slider-dots">

        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${
              currentSlide === index ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}

      </div>

    </section>
  );
}

export default Hero;