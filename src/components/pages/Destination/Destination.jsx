import "./Destination.css";

const packages = [
  {
    id: 1,
    title: "Wonderful Indonesia",
    description:
      "Jelajahi keindahan tanah air mulai dari eksotisme Bali, keajaiban bawah laut Raja Ampat, hingga kemegahan budaya Nusantara. Temukan petualangan tak terlupakan di destinasi terbaik domestik bersama kami.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Indonesia Destination",
    boxClass: "box-1",
    imageClass: "image-1",
  },
  {
    id: 2,
    title: "Umroh Premium",
    description:
      "Wujudkan perjalanan ibadah yang khusyuk dan nyaman ke Tanah Suci. Nikmati fasilitas hotel terbaik yang dekat dengan Masjidil Haram dan Masjid Nabawi, didampingi oleh pembimbing ibadah yang berpengalaman.",
    image:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Umroh Makkah Destination",
    boxClass: "box-2",
    imageClass: "image-2",
  },
  {
    id: 3,
    title: "Spectacular Turkiye",
    description:
      "Rasakan perpaduan menakjubkan antara sejarah Asia dan Eropa. Mulai dari keindahan bangunan kuno Hagia Sophia di Istanbul hingga sensasi terbang dengan balon udara di atas tebing-tebing indah Cappadocia.",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Turkiye Cappadocia Destination",
    boxClass: "box-3",
    imageClass: "image-3",
  },
];

export default function Destination() {
  return (
    <section id="destination" className="destination-scroll">
      <section className="destination-scroll-section" aria-labelledby="destination-heading">
        <svg
          className="line-svg"
          role="presentation"
          preserveAspectRatio="xMidYMin slice"
          width="100%"
          fill="none"
          viewBox="-480 0 2300 2241"
        >
          <path
            className="anim-overview-stroke"
            stroke="#C7DBF4"
            strokeWidth="160"
            d="M-841 100H584c124 0 225 101 225 225v0c0 124-101 225-225 225h-95a281 281 0 00-281 281v0c0 155 125 281 281 281h442c167 0 304 136 304 304v0c0 168-137 304-304 304H795a439 439 0 00-439 439v82"
            opacity=".45"
          />
        </svg>

        <div className="container">
          <h2 id="destination-heading">Explore The Most Beautiful Places</h2>

          <div className="layout-container">
            {packages.flatMap((pkg) => [
              <div key={`${pkg.id}-box`} className={`box ${pkg.boxClass}`}>
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                <a href="#contact" className="btn">
                  Find out more
                </a>
              </div>,
              <img
                key={`${pkg.id}-img`}
                className={pkg.imageClass}
                src={pkg.image}
                width="400"
                height="400"
                alt={pkg.imageAlt}
                loading="lazy"
              />,
            ])}
          </div>
        </div>
      </section>

      <section className="destination-scroll-bottom" aria-hidden="true" />
    </section>
  );
}
