
import "./Destination.css";

const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Nikmati keindahan pantai, budaya tradisional, dan sunset terbaik di Bali.",
    price: "Rp 4.500.000",
    duration: "5 Days",
  },

  {
    id: 2,
    name: "Raja Ampat",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    description:
      "Surga bawah laut dengan pemandangan pulau eksotis dan laut biru jernih.",
    price: "Rp 8.900.000",
    duration: "7 Days",
  },

  {
    id: 3,
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Jelajahi kuil tradisional, sakura, dan budaya khas Jepang.",
    price: "Rp 12.500.000",
    duration: "6 Days",
  },

  {
    id: 4,
    name: "Swiss Alps",
    country: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Pegunungan salju indah dengan pengalaman liburan premium.",
    price: "Rp 18.000.000",
    duration: "8 Days",
  },
];

export default function Destination() {
  return (
    <section id="destination" className="destination-section">
      <div className="destination-header">
        <p>POPULAR DESTINATION</p>

        <h1>
          Explore The Most
          <span> Beautiful Places</span>
        </h1>
      </div>

      <div className="destination-grid">
        {destinations.map((item) => (
          <div className="destination-card" key={item.id}>
            <div
              className="destination-image"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="destination-overlay">
                <h2>{item.name}</h2>
                <p>{item.country}</p>
              </div>
            </div>

            <div className="destination-content">
              <p>{item.description}</p>

              <div className="destination-info">
                <span>{item.duration}</span>
                <span>{item.price}</span>
              </div>

              <button>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}