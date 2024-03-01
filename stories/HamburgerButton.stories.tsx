import type { Meta, StoryObj } from "@storybook/react";

import HamburgerButton from "../components/Buttons/HamburgerButton";

const meta: Meta<typeof HamburgerButton> = {
  title: "Buttons/Hamburger Button",
  component: HamburgerButton,
};

type Story = StoryObj<typeof HamburgerButton>;

export const Primary: Story = {
  args: {
    label:
      "Label that describes what the Hamburger component does in terms of accessibility. ",
    screen: "mobile-tablet",
  },
};

export default meta;
