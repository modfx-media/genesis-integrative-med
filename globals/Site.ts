import type { GlobalConfig } from "payload";

const navChild = {
  type: "array" as const,
  name: "children",
  fields: [
    { name: "label", type: "text" as const },
    { name: "href", type: "text" as const },
  ],
};

export const Header: GlobalConfig = {
  slug: "header",
  access: { read: () => true },
  fields: [
    { name: "logoUrl", type: "text" },
    { name: "logoAlt", type: "text" },
    {
      name: "navItems",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
        navChild,
      ],
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: "footer",
  access: { read: () => true },
  fields: [
    { name: "tagline", type: "textarea" },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
  ],
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: { read: () => true },
  fields: [
    { name: "siteName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "phoneDisplay", type: "text" },
    { name: "phoneHref", type: "text" },
    { name: "email", type: "text" },
    { name: "street", type: "text" },
    { name: "cityState", type: "text" },
    { name: "bookingUrl", type: "text" },
    { name: "reviewsUrl", type: "text" },
  ],
};
