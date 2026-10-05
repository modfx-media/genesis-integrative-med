import type { FieldHook } from "payload";

/** Unique slug/path/legacyId cannot be empty string — Postgres unique treats '' as a value. */
export const emptyToNull: FieldHook = ({ value }) => {
  if (value === "") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
};
