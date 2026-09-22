/**
 * Site-wide navigation, contact info, and external links.
 * Internal hrefs preserve the exact slugs from the live site
 * (trailing slashes included) for SEO parity.
 */

export type NavChild = {
  readonly label: string;
  readonly href: string;
};

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
};

export const CONDITIONS_SUBNAV: readonly NavChild[] = [
  { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
  { label: "Back Pain", href: "/conditions-treated/back-pain/" },
  { label: "Headaches", href: "/conditions-treated/headaches/" },
  { label: "Foot Pain", href: "/conditions-treated/foot-pain/" },
  { label: "Shoulder Pain", href: "/conditions-treated/shoulder-pain/" },
  { label: "Sciatica", href: "/conditions-treated/sciatica/" },
  { label: "Herniated Disc", href: "/conditions-treated/herniated-disc/" },
  { label: "Neuropathy", href: "/conditions-treated/neuropathy/" },
  { label: "Tendonitis", href: "/conditions-treated/tendonitis/" },
  { label: "Bursitis", href: "/conditions-treated/bursitis/" },
  { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
  { label: "Allergies", href: "/conditions-treated/allergies/" },
  {
    label: "Erectile Dysfunction (ED)",
    href: "/conditions-treated/erectile-dysfunction-ed/",
  },
];

export const SERVICES_SUBNAV: readonly NavChild[] = [
  { label: "Shockwave Therapy", href: "/services/shockwave-therapy/" },
  { label: "Cold Laser", href: "/services/cold-laser/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
  { label: "Active Rehab", href: "/services/active-rehab-geneva/" },
  { label: "PRP Injections", href: "/services/prp-injections-geneva/" },
  { label: "Regenerative Medicine", href: "/services/regenerative-medicine/" },
  { label: "Stem Cell Therapy", href: "/services/stem-cell-therapy/" },
  { label: "Peptide Weight Loss", href: "/services/peptide-weight-loss/" },
  {
    label: "Peripheral Neuropathy",
    href: "/services/peripheral-neuropathy-treatment/",
  },
  {
    label: "ED Shockwave & Men's Wellness",
    href: "/services/ed-shockwave-mens-wellness/",
  },
  { label: "Allergy Testing", href: "/services/allergy-testing-geneva/" },
  { label: "Sciatica", href: "/services/sciatica/" },
];

export const ABOUT_SUBNAV: readonly NavChild[] = [
  { label: "Our Practice", href: "/about-practice/" },
  { label: "Our Providers", href: "/our-providers/" },
  { label: "Meet the Staff", href: "/about-practice/meet-the-staff/" },
];

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "About Us", href: "/about-practice/", children: ABOUT_SUBNAV },
  {
    label: "Conditions Treated",
    href: "/conditions-treated/",
    children: CONDITIONS_SUBNAV,
  },
  { label: "Services", href: "/services/", children: SERVICES_SUBNAV },
  { label: "Forms", href: "/forms/" },
  { label: "Blog", href: "/blog/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Contact", href: "/contact/" },
];

export const FOOTER_LINKS = [
  { label: "About Us", href: "/about-practice/" },
  { label: "Our Providers", href: "/our-providers/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "Lipo Peptides & Weight Loss", href: "/lipo-peptides-weight/" },
  { label: "Blog", href: "/blog/" },
  { label: "Privacy Policy", href: "/your-privacy/" },
  { label: "Terms & Conditions", href: "/our-terms/" },
  { label: "Accessibility Statement", href: "/accessibility-statement/" },
  { label: "Sitemap", href: "/sitemap/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const CONTACT = {
  phoneDisplay: "630-845-8925",
  phoneHref: "tel:+16308458925",
  faxDisplay: "630-845-8965",
  email: "info@genesisintegrativemed.com",
  emailHref: "mailto:info@genesisintegrativemed.com",
  address: {
    street: "1881 S. Randall Rd, Suite C",
    cityState: "Geneva, IL 60134",
  },
  mapsUrl: "https://goo.gl/maps/RSX6cJCWCLsvrzt37",
  // Google Maps directions URL, opens native maps app on mobile,
  // otherwise routes users straight into direction planning in the browser.
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1881+S.+Randall+Rd+Suite+C+Geneva+IL+60134",
  bookingUrl:
    "https://api.leadconnectorhq.com/widget/booking/arjP5TnMoJyvrPcTYI8Z",
  reviewsUrl: "https://maps.google.com/?cid=10535579833967233480",
  careCreditUrl: "https://www.carecredit.com/apply/?sitecode=bb3lopc06182018",
  hours: [
    { day: "Mon / Wed", time: "9AM – 12PM, 3PM – 6PM" },
    { day: "Tue / Thu", time: "3PM – 6PM" },
    { day: "Friday", time: "9AM – 12PM" },
  ],
  social: {
    facebook: "https://www.facebook.com/genesisintegrativemed/",
    instagram: "https://www.instagram.com/genesis.integrative.med/?hl=en",
    yelp: "https://www.yelp.com/biz/genesis-integrative-medicine-geneva-2",
  },
} as const;

export const BRAND = {
  name: "Genesis Integrative Medicine",
  shortName: "Genesis Integrative",
  tagline: "Geneva's Trusted Partner in Wellness",
  logo: "/images/logo/Genesis_Logo.png",
} as const;

/**
 * Canonical absolute site origin used for metadataBase, canonical URLs,
 * and JSON-LD @id/url fields sitewide. Falls back to the production
 * domain if the env var isn't set (e.g. local dev without .env.local).
 */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://genesisintegrativemed.com";

/**
 * Care providers featured on /our-providers/, names, credentials, and
 * portrait images sourced from the live site.
 */
export const PROVIDERS = [
  {
    name: "Nathan Conroy",
    credentials: "DC",
    title: "Chiropractic & Physical Medicine",
    image: "/images/providers/nathan-conroy-zoom.jpg",
    href: "/our-providers/",
  },
  {
    name: "Jeff Floyd",
    credentials: "PA",
    title: "Physicians Assistant",
    image: "/images/providers/jeff-floyd.jpg",
    href: "/our-providers/",
  },
  {
    name: "Dr. Anthony Leazzo",
    credentials: "DO",
    title: "Clinic Director",
    image: "/images/providers/anthony-leazzo-new.jpg",
    href: "/our-providers/",
  },
] as const;
