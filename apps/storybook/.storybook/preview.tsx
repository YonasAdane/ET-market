import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';
import { ReduxProvider } from "@repo/redux-utils/libs/provider";
import { Provider} from "react-redux";
import React from "react";
import "@repo/ui/index.css";
import { store } from "@repo/redux-utils/libs/redux/store";
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
    (story) => (
      <ReduxProvider>
          {story()}
      </ReduxProvider>),
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