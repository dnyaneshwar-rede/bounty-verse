import withMDX from "@next/mdx";
import type { NextConfig } from "next";

// Define the Next.js configuration with MDX support and package transpilation
const nextConfig: NextConfig = {

  images: {
    domains: ["avatars.githubusercontent.com"], // ✅ Allow GitHub avatars
  },
  
  transpilePackages: ["recharts"],
  // additional configuration options can be added here
};

// Enhance the Next.js configuration with MDX support
export default withMDX()(nextConfig);
