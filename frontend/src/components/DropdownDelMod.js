import React from "react";

export default function DropdownDelMod({ open, children }) {
  if (!open) return null;
  return <div>{children}</div>;
}
