import { useChannel } from "@storybook/preview-api";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "@storybook/types";
import { CURRENT_STORY_WAS_SET, RESET_STORY_ARGS, STORY_ARGS_UPDATED, STORY_CHANGED, STORY_ERRORED, STORY_INDEX_INVALIDATED, STORY_MISSING, STORY_PREPARED, STORY_RENDERED, UPDATE_STORY_ARGS } from "@storybook/core-events";
import { EVENTS } from "../constants";


let windowRef: typeof globalThis;

let api;

const proxyFetch = {
    apply(_: any, __: any, args: any) {
      console.log('here is my proxy setup');
      console.log(...arguments);
      return { message: 'proxy done' };
    },
  };
  
const proxiedFetch = new Proxy(fetch, proxyFetch);

export const withRoundTrip = (storyFn: StoryFunction<Renderer>) => {

  console.log('checking for global', globalThis, self, global)
 

    //Round Trip is run for every story change
    //We only want to setup the fetch switch one time
    if(!windowRef){
        windowRef = globalThis ?? self ?? global;
        windowRef.fetch = proxiedFetch;
        console.log('I have taken over the proxy');
        //so now the panel hold the parameter data i think? it will always hold onto the parameter and if the story changes we reset...
    }
  

  const emit = useChannel({
    [EVENTS.REQUEST]: (...args) => {
        console.log('EVENT.REQUEST', args);
    },
    [EVENTS.SEND]: (...args) => {
        console.log('EVENT.SEND', args);
    },
    [EVENTS.UPDATE]: (api) => {
        api = api;
        console.log('EVENT.UPDATE', api);
    },
    [STORY_CHANGED]: (...args) => {
        console.log('STORY_CHANGED', args);
    },
    [EVENTS.CLEAR]: (...args) => {
        console.log('EVENTS.CLEAR ', args);
    },
    [EVENTS.RESULT]: (...args) => {
        console.log('EVENTS.RESULT', args);
    },
    [STORY_ARGS_UPDATED]: (...args) => {
        console.log('STORY_ARGS_UPDATED', args);
    },
    [STORY_RENDERED]: (...args) => {
        console.log('STORY_RENDERED', args);
    },[STORY_ERRORED]: (...args) => {
        console.log('STORY_ERRORED', args);
    },[STORY_INDEX_INVALIDATED]: (...args) => {
        console.log('STORY_INDEX_INVALIDATED', args);
    },[STORY_MISSING]: (...args) => {
        console.log('STORY_MISSING', args);
    },[STORY_PREPARED]: (...args) => {
        console.log('STORY_PREPARED', args);
    },
    [RESET_STORY_ARGS]: (...args) => {
        console.log('RESET_STORY_ARGS', args);
    },
    [UPDATE_STORY_ARGS]: (...args) => {
        console.log('UPDATE_STORY_ARGS', args);
    },
    [CURRENT_STORY_WAS_SET]: (...args) => {
        console.log('CURRENT_STORY_WAS_SET', args);
        //this one is when a story is reset so we should use this
        emit(EVENTS.RESET, args);
    },
  });

  return storyFn();
};

//const emit = useChannel({}) this is the broadcast to catch the emit

//You have to intantiate emit
// then
/**
 *   const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

 * 
then you can use it and pass data through it to anything listening. Im sure it can be foobar for all it cares. 
emit(EVENTS.RESULT, {
        danger: [],
        warning: [],
      });


      //roundtrip starts the global fetch switch
      //a fetch call will use faker
      //faker gets the parameters?
      //looks at the paramters and determines if one matches the request url

 */