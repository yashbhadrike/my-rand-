import { images } from "./images";

/** Static marketing copy for the homepage. Templates come from the store. */

export const reimaginedFeatures = [
  { icon: "Smartphone", title: "Beautiful on every screen", body: "Designed phone-first, so it looks just as good on Nani's phone as on a laptop." },
  { icon: "Send", title: "Easy to share on WhatsApp", body: "One link with a rich preview. Paste it into any chat or group." },
  { icon: "RefreshCw", title: "Update details anytime", body: "Venue changed? Muhurat moved? Edit it once and every guest sees it." },
  { icon: "Images", title: "Add your wedding photos", body: "Pre-wedding shoots, childhood photos and your story, all in one place." },
  { icon: "MapPin", title: "Interactive venue & RSVP links", body: "One-tap directions to every venue and a simple RSVP for your guests." },
  { icon: "CalendarHeart", title: "Separate pages for different events", body: "Haldi, mehendi, sangeet, wedding, reception — share only what each guest needs." },
] as const;

export const featureCards = [
  { title: "Beautiful Design", body: "Studio-made layouts, typography and motion — not a template that looks like everyone else's.", tone: "bg-[#5b1a1f] text-[#f6e6c8]", image: images.brideRed, kicker: "01" },
  { title: "Easy Sharing", body: "One link for WhatsApp, Instagram and email. No downloads, no huge video files.", tone: "bg-[#f2b134] text-[#2b1a08]", image: images.hennaHands, kicker: "02" },
  { title: "Instant Updates", body: "Change a time, a venue or a dress code and it's live for everyone in seconds.", tone: "bg-[#0f3b33] text-[#f2ead8]", image: images.coupleSteps, kicker: "03" },
  { title: "Photo Stories", body: "From how you met to the roka — tell your story with your own photos.", tone: "bg-[#e9e4f5] text-[#2a2140]", image: images.flowerCanopy, kicker: "04" },
  { title: "Venue & RSVP", body: "Maps for every event and a guest RSVP, so you know who's coming to what.", tone: "bg-[#c4553b] text-[#fff3ea]", image: images.aisle, kicker: "05" },
  { title: "Music & Motion", body: "A soft shehnai or your favourite song, with gentle animation as guests scroll.", tone: "bg-[#111111] text-[#f7f6f2]", image: images.ritual, kicker: "06" },
] as const;

export const steps = [
  { n: "01", title: "Choose your design", body: "Start with a template that matches your wedding.", image: "/templates/rajwada.svg" },
  { n: "02", title: "Make it yours", body: "Add your names, dates, photos, events and venue details.", image: "/templates/mogra-screen.svg" },
  { n: "03", title: "Share with everyone", body: "Publish your invite and send one simple link on WhatsApp.", image: "/templates/utsav-screen.svg" },
] as const;

export const comparison = {
  columns: ["Printed Card", "WhatsApp Video", "Kavyamoment"] as const,
  rows: [
    ["Cost", "High", "Moderate", "Affordable"],
    ["Customization", "Limited", "Hard", "Easy"],
    ["Interactivity", "Static", "View-only", "Interactive"],
    ["Mobile Experience", "No", "Yes", "Responsive"],
    ["Updates", "Difficult", "Difficult", "Instant"],
    ["RSVP", "No", "No", "Yes"],
    ["Venue Map", "No", "No", "Yes"],
    ["Photos", "Limited", "Limited", "Yes"],
    ["Music", "No", "Yes", "Yes"],
    ["Multiple Events", "Separate cards", "Separate videos", "Yes"],
  ] as const,
};

export const testimonials = [
  { names: "Riya & Akash", place: "Mumbai", tag: "Hindu wedding", image: images.coupleCanopy, quote: "We wanted something more personal than sending another video on WhatsApp. This felt like our own little wedding world." },
  { names: "Zoya & Imran", place: "Lucknow", tag: "Nikah & walima", image: images.sherwaniKiss, quote: "Our elders found the venue on the map in one tap. Not a single 'where is it, beta?' call. That alone was worth it." },
  { names: "Lakshmi & Karthik", place: "Chennai", tag: "South Indian", image: images.hennaHands, quote: "The Mogra design looked exactly like our wedding colours. Guests kept saying it felt like opening a gift." },
  { names: "Simran & Harjot", place: "Amritsar", tag: "Anand Karaj", image: images.groomSehra, quote: "We changed the reception venue a week before. Updated it in a minute and everyone already had the right address." },
  { names: "Sayali & Omkar", place: "Pune", tag: "Marathi wedding", image: images.attire, quote: "Separate pages for haldi and the wedding meant our office friends only saw what they were invited to. So thoughtful." },
  { names: "Natasha & Joel", place: "Goa", tag: "Church wedding", image: images.aisle, quote: "Clean, elegant and so easy to share. Our RSVPs came in faster than we expected." },
] as const;

export const faqs = [
  { q: "What exactly is a wedding invitation website?", a: "It's a beautiful, private web page for your wedding — your names, story, photos, every event with its venue and timing, and an RSVP — all shared through one link instead of a printed card or a video." },
  { q: "Do I need coding knowledge?", a: "Not at all. You pick a design and send us your details; we set everything up. Updating details later is just as simple." },
  { q: "Can I edit my invitation after purchasing?", a: "Yes. Names, dates, timings, venues, photos and text can all be updated after your invite goes live, and guests always see the latest version." },
  { q: "Can I add my own photos?", a: "Yes — pre-wedding shoots, candid moments or family photos. Every template has spaces designed for them." },
  { q: "Can I add music?", a: "Yes. Add a soft background track that guests can play or pause." },
  { q: "Can I add multiple wedding events?", a: "Absolutely. Add haldi, mehendi, sangeet, wedding, reception and more — each with its own date, time, venue and dress code." },
  { q: "Can guests open it on mobile?", a: "Every template is designed mobile-first. It opens instantly in the WhatsApp browser, Chrome or Safari — no app needed." },
  { q: "Can I add an RSVP button?", a: "Yes. Guests can RSVP right from the invite, and you can see who's coming to which event." },
  { q: "Can I add Google Maps?", a: "Yes. Each event links to Google Maps so guests get one-tap directions." },
  { q: "How do I share the invitation?", a: "You get a single link. Share it on WhatsApp, Instagram, SMS or email — it shows a rich preview with your names and design." },
  { q: "Can I use my own domain?", a: "Yes, you can connect your own domain like riyawedsakash.com. We'll guide you through it." },
  { q: "How long does it take to create?", a: "Most invites are ready within 24–48 hours of receiving your details. Save-the-dates are often same-day." },
  { q: "Are there any recurring charges?", a: "No. It's a one-time payment and your invite stays live through your wedding and well after." },
] as const;

export const instagramTiles = [images.brideDupatta, images.rings, images.ritual, images.greenSari, images.flowerCanopy, images.brideGroom];
