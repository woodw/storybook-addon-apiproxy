import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  tags: ["autodocs"],
  parameters: {
    myAddonParameter: `
      <MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
        <SomeOtherComponent funcProp={(a) => a.id} />
      </MyComponent>
    `,
    api: {
      sendDocuments: {
        match: 'https://jsonplaceholder.typicode.com/todos',
        proxy: 'http://www.google.com',
        mock: {
          code: 200,
          json: {},
        }
      }
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: "Button",
  },
  parameters: {
    api: {
      sendDocuments: {
        match: '/xyz/456',
        proxy: 'http://www.google.com',
        mock: {
          code: 200,
          json: {},
        }
      }
    },
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
