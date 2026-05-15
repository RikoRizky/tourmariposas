import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

export function LandingPageContent() {
  const [selectedDestination, setSelectedDestination] = useState("Bali");

  const landingRef = useRef(null);
  const burgerRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const burger = burgerRef.current;
    const overlay = overlayRef.current;

    if (!burger || !overlay) return;

    let showMenu = false;

    overlay.style.display = "none";

    const onBurgerClick = () => {
      showMenu = !showMenu;

      if (showMenu) {
        burger.classList.add("active");

        overlay.style.display = "block";

        gsap.to(overlay, {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "expo.inOut",
        });
      } else {
        burger.classList.remove("active");

        gsap.to(overlay, {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "expo.inOut",
          onComplete: () => {
            overlay.style.display = "none";
          },
        });
      }
    };

    burger.addEventListener("click", onBurgerClick);

    const ctx = gsap.context(() => {
      let del = 3;
      let i = 1;

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        ease: "expo.out",
      });

      gsap.set(["#hero-1 h2", "#hero-1 h1", "#hero-1 h3"], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });

      gsap.set(
        [
          "#hero-2 h2",
          "#hero-3 h2",
          "#hero-4 h2",
          "#hero-5 h2",
          "#hero-2 h1",
          "#hero-3 h1",
          "#hero-4 h1",
          "#hero-5 h1",
          "#hero-2 h3",
          "#hero-3 h3",
          "#hero-4 h3",
          "#hero-5 h3",
        ],
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        }
      );

      while (i < 5) {
        tl.to(`#hero-${i} h2`, {
          duration: 0.9,
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          delay: del,
        })
          .to(
            `#hero-${i} h1`,
            {
              duration: 0.9,
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            },
            "-=0.3"
          )
          .to(
            `#hero-${i} h3`,
            {
              duration: 0.9,
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            },
            "-=0.3"
          )
          .to(
            `#hero-${i} .hi-${i}`,
            {
              duration: 0.7,
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            },
            "-=1"
          )
          .to(`#hero-${i + 1} h2`, {
            duration: 0.9,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          })
          .to(
            `#hero-${i + 1} h1`,
            {
              duration: 0.9,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            "-=0.3"
          )
          .to(
            `#hero-${i + 1} h3`,
            {
              duration: 0.9,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            "-=0.3"
          );

        i++;
      }
    }, landingRef);

    return () => {
      burger.removeEventListener("click", onBurgerClick);
      ctx.revert();
    };
  }, []);

  const packages = [
    {
      country: "Bali",
      title: "Bali Beach Resort",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1000",
      from: "From Jakarta",
      hotel: "5 Stars Hotel",
      date: "Jan 20 - Feb 01",
      price: "$1200",
      days: "7 Days",
    },

    {
      country: "Thailand",
      title: "Bangkok Premium Tour",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1000",
      from: "From Singapore",
      hotel: "5 Stars Hotel",
      date: "Feb 12 - Feb 20",
      price: "$1500",
      days: "8 Days",
    },

    {
      country: "Bali",
      title: "Ubud Luxury Trip",
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000",
      from: "From Surabaya",
      hotel: "4 Stars Hotel",
      date: "March 10 - March 17",
      price: "$1000",
      days: "7 Days",
    },
  ];

  const filteredPackages = packages.filter(
    (item) =>
      item.country.toLowerCase() ===
      selectedDestination.toLowerCase()
  );

  return (
    <div id="landing-page-content" ref={landingRef}>
      <div className="page-wrap">
        <header className="page-header">
          <nav className="modern-navbar">

  <div className="nav-left">

    <div className="nav-brand">
      <img
        src={`${import.meta.env.BASE_URL}logobg.png`}
        alt="Mariposas Logo"
      />

      <div className="brand-divider"></div>

      <div className="brand-text">
        <h1>Mariposas Tour</h1>
        <p>Indonesia</p>
      </div>
    </div>

  </div>

  <div className="nav-center">
    <a href="#">Discover</a>
    <a href="#">Experience</a>
    <a href="#">Destination</a>
    <a href="#">Information</a>
  </div>

  <div className="nav-right">

    <button className="currency-btn">
      USD
    </button>

    <button className="booking-btn">
      My Booking
    </button>

    <div ref={burgerRef} id="burger">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>

</nav>

          <main>
            <article id="hero-1">
              <div className="hero-info">
                <h2>Travel the</h2>
                <h1>World</h1>
                <h3>Pragser Wildsee, Italy</h3>
              </div>

              <div className="hero-image hi-1"></div>
            </article>

            <article id="hero-2">
              <div className="hero-info">
                <h2>Savour the</h2>
                <h1>Journey</h1>
                <h3>Marignier, France</h3>
              </div>

              <div className="hero-image hi-2"></div>
            </article>

            <article id="hero-3">
              <div className="hero-info">
                <h2>Expand Your</h2>
                <h1>Horizons</h1>
                <h3>Hooker Valley Track, New Zealand</h3>
              </div>

              <div className="hero-image hi-3"></div>
            </article>

            <article id="hero-4">
              <div className="hero-info">
                <h2>Explore and</h2>
                <h1>Reflect</h1>
                <h3>Dolmites, Italy</h3>
              </div>

              <div className="hero-image hi-4"></div>
            </article>

            <article id="hero-5">
              <div className="hero-info">
                <h2>Change Your</h2>
                <h1>Perspective</h1>
                <h3>Phuket, Thailand</h3>
              </div>

              <div className="hero-image hi-5"></div>
            </article>
          </main>
        </header>

        <section
  ref={overlayRef}
  className="menu-overlay"
>

  <div className="menu-container">

    <div className="menu-left">

      <p className="menu-label">
        EXPLORE WORLD
      </p>

      <h1>
        Choose Your
        <br />
        Destination
      </h1>

      <p className="menu-desc">
        Discover beautiful places around the world
        with premium travel experiences.
      </p>

    </div>

    <div className="menu-right">

      <div className="destination-grid">

        <button
          type="button"
          onClick={() =>
            setSelectedDestination("Bali")
          }
        >
          🇮🇩 Indonesia
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedDestination("Thailand")
          }
        >
          🇹🇭 Thailand
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedDestination("Japan")
          }
        >
          🇯🇵 Japan
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedDestination("Swiss")
          }
        >
          🇨🇭 Switzerland
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedDestination("Turkey")
          }
        >
          🇹🇷 Turkey
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedDestination("France")
          }
        >
          🇫🇷 France
        </button>

      </div>

    </div>

  </div>

          <h1 style={{ color: "white", marginTop: "40px" }}>
            {selectedDestination}
          </h1>

          <div className="travel-cards">

  {filteredPackages.map((item, index) => (

    <div
      key={index}
      className="travel-card"
    >

      <div className="travel-image">

        <img
          src={item.image}
          alt={item.title}
        />

        <div className="travel-badge">
          {item.days}
        </div>

      </div>

      <div className="travel-content">

        <div className="travel-top">

          <div>
            <p className="travel-country">
              {item.country}
            </p>

            <h3>
              {item.title}
            </h3>
          </div>

          <h2>
            {item.price}
          </h2>

        </div>

        <div className="travel-info">

          <p>✈ {item.from}</p>

          <p>🏨 {item.hotel}</p>

          <p>📅 {item.date}</p>

        </div>

        <button className="travel-btn">
          Book Now
        </button>

      </div>

    </div>

  ))}

</div>
        </section>
      </div>
    </div>
  );
}