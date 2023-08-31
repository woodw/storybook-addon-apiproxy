import React, { Fragment } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button } from "@storybook/components";
import { List } from "./List";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

enum status{
    off, proxy, mock
}

interface MockProxy {
    on: false
    pattern: string,
    proxy: string,
    mock: JSON,
    status: status
}

type Results = {
  mockProxies: MockProxy[];
};

interface PanelContentProps {
  results: Results;
  fetchData: () => void;
  clearData: () => void;
}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = ({
  results,
  fetchData,
  clearData,
}) => (
  <TabsState
    initial="overview"
    backgroundColor={convert(themes.normal).background.hoverable}
  >
    <div
      id="overview"
      title="Overview Bill"
      color={convert(themes.normal).color.positive}
    >
      <Placeholder>
        <Fragment>
          Addons can gather details about how a story is rendered. This is panel
          uses a tab pattern. Click the button below to fetch data for the other
          two tabs.
        </Fragment>
        <Fragment>
          <RequestDataButton
            secondary
            small
            onClick={fetchData}
            style={{ marginRight: 16 }}
          >
            Request data
          </RequestDataButton>

          <RequestDataButton outline small onClick={clearData}>
            Clear data
          </RequestDataButton>
        </Fragment>
      </Placeholder>
    </div>
    <div
      id="mockProxies"
      title={`${results.mockProxies.length} API Patterns`}
      color={convert(themes.normal).color.gold}
    >
      <List items={results.mockProxies} />
    </div>
  </TabsState>
);
