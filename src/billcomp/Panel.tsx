import React from "react";
import { useAddonState, useChannel } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "../constants";
import { PanelContent } from "./PanelContent";
import { STORY_PREPARED } from "@storybook/core-events";

import { useArgs, useGlobals, useParameter   } from '@storybook/manager-api';

interface PanelProps {
  active: boolean;
}



export const Panel: React.FC<PanelProps> = (props) => {

  //const [args, updateArgs, resetArgs] = useArgs();
  //const [globals, updateGlobals] = useGlobals();

  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    mockProxies: [],
  });
  //

  const getAPIParameters = () => {
    return useParameter('api', 'initial value');
  }

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESET]: (args) => {
      //const value = useParameter('api', 'initial value');
      //const value = {two:2};
      //console.log('paramter value', value);
      //emit(EVENTS.UPDATE, value);
    },
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  const value = useParameter('api', false);
  console.log('this is the value', value)
  if(value){
    emit(EVENTS.UPDATE, value);
  }

  return (
    <AddonPanel {...props}>
      <PanelContent
        results={results}
        fetchData={() => {
          console.log('fetch data');
          //console.log('args', args);
          console.log('globals', globals);
          console.log('api value', value);
          emit(EVENTS.REQUEST);
        }}
        clearData={() => {
            console.log('clear Data');
          emit(EVENTS.CLEAR);
        }}
      />
    </AddonPanel>
  );
};
