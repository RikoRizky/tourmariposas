const WHATSAPP_NUMBER = "6281315499154";

export function buildWhatsAppUrl(packageName, customMessage) {
  const text =
    customMessage ??
    `Halo Mariposas Tour, saya tertarik dan ingin memesan ${packageName}. Boleh minta informasi lebih lanjut?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(packageNameOrMessage, customMessage) {
  let finalMessage;
  
  if (customMessage) {
    // If customMessage is provided, use it as is
    finalMessage = customMessage;
  } else if (packageNameOrMessage.includes("Halo Mariposas Tour")) {
    // If packageNameOrMessage is already a complete message, use it as is
    finalMessage = packageNameOrMessage;
  } else {
    // Otherwise, it's a package name, apply the default template
    finalMessage = `Halo Mariposas Tour, saya tertarik dan ingin memesan ${packageNameOrMessage}. Boleh minta informasi lebih lanjut?`;
  }
  
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`, "_blank", "noopener,noreferrer");
}
