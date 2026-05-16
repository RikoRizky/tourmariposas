import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">

      <div className="contact-header">

        <p>CONTACT US</p>

        <h1>
          Let’s Plan Your
          <span> Dream Journey</span>
        </h1>

        <h3>
          Hubungi kami untuk informasi paket wisata,
          reservasi perjalanan, dan konsultasi liburan terbaik.
        </h3>

      </div>

      <div className="contact-wrapper">

        <div className="contact-info">

          <div className="contact-card">
            <h2>📍 Office Address</h2>

            <p>
              Pasar modern paramount u35
              gading serpong, tangerang, Indonesia
            </p>
          </div>

          <div className="contact-card">
            <h2>📞 Phone Number</h2>

            <p>
              +62 813 1549 9154
            </p>
          </div>

          <div className="contact-card">
            <h2>✉ Email Address</h2>

            <p>
              mariposasindonesia@gmail.com
            </p>
          </div>

          <div className="contact-card">
  <h2>📸 Instagram</h2>

  <p>
    <a
      href="https://www.instagram.com/mariposas_indonesia?igsh=MWNtaXI1ZHQwbjFkNw=="
      target="_blank"
      rel="noreferrer"
    >
      @mariposas_indonesia
    </a>
  </p>
</div>

        </div>

        <div className="contact-map">

  <iframe
    title="Google Maps"
    src="https://www.google.com/maps?q=Pasar+Modern+Paramount+U35+Gading+Serpong+Tangerang&output=embed"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

</div>

      </div>

    </section>
  );
}