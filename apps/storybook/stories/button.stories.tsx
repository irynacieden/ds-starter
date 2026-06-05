import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = { args: { variant: "solid" } };
export const Outline: Story = { args: { variant: "outline" } };

export const Both: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
