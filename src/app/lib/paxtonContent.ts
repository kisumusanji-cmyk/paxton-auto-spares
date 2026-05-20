export type OwnerPhoto = {
  id: string;
  title: string;
  url: string;
  note: string;
};

export type SiteContent = {
  businessName: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  hours: string;
  primaryLocation: string;
  secondaryLocation: string;
  locationNote: string;
  heroNote: string;
  photos: OwnerPhoto[];
};

export const defaultSiteContent: SiteContent = {
  businessName: "PAXTON AUTO SPARES",
  phone: "+260 967 771 609",
  whatsappPhone: "260967771609",
  email: "sales@paxtonautospares.co.zm",
  hours: "Mon - Sat: 08:00 - 18:00",
  primaryLocation: "Plot 37802 Nationalist Rd, Lusaka 10101",
  secondaryLocation: "G8XP+W4 Lusaka",
  locationNote: "Along Nationalist Road Plaza",
  heroNote: "Real Paxton photos can be added from the admin studio after client approval.",
  photos: [
    {
      id: "facebook-1",
      title: "Paxton shop media",
      url: "https://scontent.flun2-1.fna.fbcdn.net/v/t39.30808-6/698784023_982517734580268_5878739311940225848_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFirzCI6s_X3ZhxsooKVOuPYYPA0hqIVMdhg8DSGohUx4rnxW1ektd5xIXZzc0WAjpGANLF4V1ha8qJx-E7lJAu&_nc_ohc=oxWrz0flhiEQ7kNvwEJJLCV&_nc_oc=AdrCHeVjGavIxIPCceFjw9wlJaHXaTNmlkJUsMbLBF25WFb9XcMmSpNlnOG60hVIzeQ&_nc_zt=23&_nc_ht=scontent.flun2-1.fna&_nc_gid=Wv73Q1cnsURHypCeMq3SLw&_nc_ss=7a2a8&oh=00_Af74oJtUIWS3YZxTZRGrcaOcpcmIt59hiGMEBLD2vgauqA&oe=6A138CBE",
      note: "Facebook-sourced image URL. Replace with uploaded Cloudinary/Supabase image for production.",
    },
    {
      id: "facebook-2",
      title: "Product shelf media",
      url: "https://scontent.flun2-1.fna.fbcdn.net/v/t39.30808-6/697895885_982510607914314_3674233102811281167_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFYzFzz7V2pQfntGjYZiFG04Zi9qYHzYq_hmL2pgfNiryfpQAip9Q4P5ADTY06r_mR3j06NAo8Zh976bvuBpH8k&_nc_ohc=C9xKaLV0QEYQ7kNvwGX_fi8&_nc_oc=AdoI90dj1cZHKF9hf10Yzm4dCouE1SQmp9OAELkzhFO2I70oQbJTTPS1AcbLEzC_YIE&_nc_zt=23&_nc_ht=scontent.flun2-1.fna&_nc_gid=Bah3YLLmVY39Bfjm-UYRBA&_nc_ss=7a2a8&oh=00_Af69wHIha0OlpibDEs2h4No7gSvrYAYswpvgITJJoF1XYQ&oe=6A138BFA",
      note: "Owner media candidate.",
    },
  ],
};

export function whatsappUrl(phone = defaultSiteContent.whatsappPhone, text = "Hello Paxton Auto Spares") {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

export function telUrl(phone = defaultSiteContent.phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
