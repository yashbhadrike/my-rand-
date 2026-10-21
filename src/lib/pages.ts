import { site } from "./site";

/** Simple content pages. Legal copy is a placeholder — have it reviewed before launch. */
export const pages: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  about: {
    title: "About Kavyamoment",
    intro: "We're a small design studio making wedding invitations for the way India celebrates today — on phones, in family groups, across cities.",
    sections: [
      { h: "Why we started", p: "Printed cards get lost and WhatsApp videos get forwarded without a second look. We wanted an invite that guests actually open, explore and keep coming back to — with every event, venue and detail in one place." },
      { h: "How we design", p: "Each template is drawn by our designers and tested on real phones with real families. We take cues from Indian craft — temple borders, Paithani weaves, marigold garlands — and give them a modern, editorial form." },
      { h: "Who we work with", p: "Couples, families and wedding planners across India and the diaspora. Every invite is set up by a real person on our team." },
    ],
  },
  contact: {
    title: "Contact",
    intro: "Questions about a template, a custom design or an invite that's already live? We usually reply within a day.",
    sections: [
      { h: "Email", p: site.email },
      { h: "Instagram", p: `@${site.instagramHandle}` },
      { h: "Hours", p: "Monday to Saturday, 10am – 7pm IST. During peak wedding season we also answer on Sundays." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We only collect what we need to create and host your invitation.",
    sections: [
      { h: "What we collect", p: "The details you share for your invitation (names, dates, venues, photos) and the RSVP responses your guests submit." },
      { h: "How we use it", p: "Only to build, host and support your invitation. We never sell your data or your guests' data." },
      { h: "Your choices", p: `You can ask us to take your invitation offline or delete your data at any time by writing to ${site.email}.` },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "By purchasing a template you agree to these terms.",
    sections: [
      { h: "Licence", p: "Each purchase covers one personalised invitation website for one wedding. Template designs remain the property of Kavyamoment." },
      { h: "Your content", p: "You confirm you have the right to use the photos, music and text you send us." },
      { h: "Hosting", p: "Your invitation stays online for at least 12 months after your wedding date." },
    ],
  },
  refund: {
    title: "Refund Policy",
    intro: "We want you to love your invite.",
    sections: [
      { h: "Before work begins", p: "Full refund if you cancel before we start personalising your invitation." },
      { h: "After delivery", p: "We'll keep revising until you're happy. Refunds after delivery are considered case by case." },
      { h: "How to request", p: `Email ${site.email} with your order details.` },
    ],
  },
};
