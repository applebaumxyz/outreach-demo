import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/outreach",
  turbopack: { root: process.cwd() },
};

export default nextConfig;
