import type { Preview,ReactRenderer } from "@storybook/react";
// +import { Preview, ReactRenderer } from '@storybook/your-ReactRenderer';
import { withThemeByClassName } from '@storybook/addon-themes';

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
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      }),
     ]
  }
export default preview;
