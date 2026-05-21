const WHATSAPP_NUMBER = "6281315499154";

export function buildWhatsAppUrl(packageName, customMessage) {
  const text =
    customMessage ??
    `Halo Mariposas Tour, saya tertarik dan ingin memesan ${packageName}. Boleh minta informasi lebih lanjut?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(packageName, customMessage) {
  window.open(buildWhatsAppUrl(packageName, customMessage), "_blank", "noopener,noreferrer");
}
