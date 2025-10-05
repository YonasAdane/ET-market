import baseConfig from "@repo/ui/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../apps/web/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config;

export default config;