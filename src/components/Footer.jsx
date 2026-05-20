import "./Footer.css";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Destination", href: "#destination" },
  { label: "Tours", href: "#tours" },
  { label: "Blog", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Paket Umroh",
  "Tour Domestik",
  "Tour Internasional",
  "Kustom Perjalanan",
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/mariposas_indonesia?igsh=MWNtaXI1ZHQwbjFkNw==",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:mariposasindonesia@gmail.com",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6281315499154",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="wa-icon">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.11.551 4.17 1.6 5.97L0 24l6.191-1.583A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.025c-1.859 0-3.682-.5-5.275-1.444l-.378-.225-3.92 1.026 1.047-3.819-.244-.391c-1.033-1.655-1.579-3.56-1.579-5.518 0-5.753 4.68-10.433 10.433-10.433 5.753 0 10.433 4.68 10.433 10.433s-4.68 10.433-10.433 10.433z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-col footer-brand">
          <a href="#" className="footer-nav-brand">
            <img
              src="logobg.png"
              alt="Mariposas Tour"
              className="footer-brand-logo"
            />
            <span className="footer-brand-divider" aria-hidden="true" />
            <span className="footer-brand-text">
              <span className="footer-brand-title">MARIPOSAS TOUR</span>
              <span className="footer-brand-sub">Indonesia</span>
            </span>
          </a>
          <p>
            Mariposas Tour Indonesia menghadirkan perjalanan spiritual dan
            petualangan berkelas. Dari Umroh hingga destinasi dunia, dengan
            layanan profesional dan perhatian penuh pada setiap detail.
          </p>
          <div className="footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <h3>Contact Info</h3>
          <ul>
            <li>
              Pasar Modern Paramount U35, Gading Serpong, Tangerang, Indonesia
            </li>
            <li>
              <a href="mailto:mariposasindonesia@gmail.com">
                mariposasindonesia@gmail.com
              </a>
            </li>
            <li>
            <a href="tel:+6281315499154">+62 813-1549-9154</a>
            <br />
            <a href="tel:+62905513869855">+90 5513-8698-55</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 Mariposas Tour Indonesia. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}