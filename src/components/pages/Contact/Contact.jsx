import { useState } from "react";
import { useScrollReveal } from "../../../hooks/useScrollReveal.js";
import { openWhatsApp } from "../../../utils/whatsapp.js";
import "./Contact.css";

const contactCards = [
  {
    icon: "📍",
    title: "Lokasi Kantor",
    content: "Pasar Modern Paramount U35, Gading Serpong, Tangerang, Indonesia",
    href: "https://www.google.com/maps/place/PASAR+MODERN+PARAMOUNT/@-6.248964,106.622918,16z/data=!4m6!3m5!1s0x2e69fc73f1f858ff:0x9483c141a6abb292!8m2!3d-6.2489644!4d106.6229183!16s%2Fg%2F11b6_fkm69?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: "📷",
    title: "Instagram",
    content: "@mariposas_indonesia",
    href: "https://www.instagram.com/mariposas_indonesia?igsh=MWNtaXI1ZHQwbjFkNw==",
  },
  {
    icon: "📞",
    title: "Nomor Telepon",
    content: (
      <>
        <a href="tel:+6281315499154">+62 813-1549-9154</a>
        <br />
        <a href="tel:+62905513869855">+90 5513-8698-55</a>
      </>
    ),
  },
  {
    icon: "📧",
    title: "Email",
    content: "mariposasindonesia@gmail.com",
    href: "mailto:mariposasindonesia@gmail.com",
  },
];

export default function Contact() {
  const sectionRef = useScrollReveal({ staggerStep: 100 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Halo Mariposas Tour, saya ${form.name || "calon tamu"} (${form.email || "tanpa email"}). ${form.message || "Ingin bertanya tentang paket wisata."}`;
    openWhatsApp("konsultasi perjalanan", text);
  };

  return (
    <section
      id="contact"
      className="contact-section page-section-bg"
      ref={sectionRef}
    >
      <div className="contact-header">
        <p data-reveal>CONTACT US</p>
        <h1 data-reveal>
          Let's Plan Your
          <span> Dream Journey</span>
        </h1>
        <h3 data-reveal>
          Hubungi kami untuk informasi paket wisata, reservasi perjalanan, dan
          konsultasi liburan terbaik.
        </h3>
      </div>

      <div className="contact-layout">
        <form className="contact-form" data-reveal onSubmit={handleSubmit}>
          <h2>Kirim Pesan</h2>
          <p className="contact-form-desc">
            Isi formulir singkat ini. Tim kami akan merespons secepatnya.
          </p>

          <label>
            Nama Lengkap
            <input
              type="text"
              name="name"
              placeholder="Nama Anda"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="email@contoh.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label>
            Pesan
            <textarea
              name="message"
              rows={4}
              placeholder="Ceritakan rencana perjalanan atau paket yang Anda minati..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>

          <button type="submit">Kirim via WhatsApp →</button>
        </form>

        <div className="contact-side">
          <div className="contact-cards-grid">
            {contactCards.map((card) => (
              <div className="contact-card" key={card.title} data-reveal>
                <h2>
                  <span className="contact-card-icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  {card.title}
                </h2>
                {card.href ? (
                  <p>
                    <a
                      href={card.href}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noreferrer" : undefined}
                    >
                      {card.content}
                    </a>
                  </p>
                ) : (
                  <p>{card.content}</p>
                )}
              </div>
            ))}
          </div>

          <div className="contact-map" data-reveal>
            <iframe
              title="Lokasi kantor Mariposas Tour"
              src="https://www.google.com/maps?q=Pasar+Modern+Paramount+U35+Gading+Serpong+Tangerang&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}