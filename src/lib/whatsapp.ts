/** Liam6Agro Exports — WhatsApp business line */
export const WHATSAPP_NUMBER = "918971296947";
export const WHATSAPP_DISPLAY = "+91 89712 96947";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  quote: `Hello Liam6Agro Exports,

I would like to request a quote for your premium ginger export products from Karnataka.

Please share details on:
• Product availability
• Export pricing & MOQ
• Shipping to my country

Thank you!`,

  contact: `Hello Liam6Agro Exports,

I would like to connect with your export team regarding ginger supply from Karnataka to our market.

Please let me know the next steps.

Thank you!`,

  catalog: `Hello Liam6Agro Exports,

I would like to receive your full product catalog and export price list for ginger products.

Thank you!`,

  product: (productName: string) =>
    `Hello Liam6Agro Exports,

I am interested in exporting *${productName}*.

Please share:
• Export-grade pricing
• Minimum order quantity (MOQ)
• Delivery & shipping timelines

Thank you!`,
};
