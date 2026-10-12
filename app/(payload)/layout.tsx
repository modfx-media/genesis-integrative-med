/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import type { Metadata } from "next";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";
import "./custom.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Genesis Integrative Medicine CMS",
  robots: { index: false, follow: false },
};

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
