import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';
import { ReduxProvider } from "@repo/redux-utils/libs/provider";
import "@repo/ui/index.css";

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
    // (Story) => (
    //   <ReduxProvider>
    //     <Story />
    //   </ReduxProvider>
    // ),
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
