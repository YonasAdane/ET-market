import type { Preview } from "@storybook/react";
import "@repo/ui/index.css"
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    darkMode: {
      defaultValue: true, // Enable dark mode by default on all stories
    },
    // Optional (Default: 'dark')
    className: {
      defaultValue: 'custom-classname', // Set your custom dark mode class name
    },
  },
};
export default preview;
