import * as React from "react";
import type { Preview } from "@storybook/react";

// Порядок важливий: спершу токени (визначають CSS-змінні), потім Tailwind.
import "@repo/tokens/tokens.css";
import "./app.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "error" },
  },
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;
      React.useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        root.style.background = "var(--background)";
        root.style.color = "var(--foreground)";
      }, [theme]);
      return (
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
