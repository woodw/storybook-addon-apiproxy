/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */
import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { PARAM_KEY } from "./constants";
import { withGlobals } from "./withGlobals";
import { withRoundTrip as oldRountTrip } from "./withRoundTrip";
import { withRoundTrip } from "./billcomp/withRoundTrip";

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

console.log('I am checked when I start up and I am added as a new decorator');
const preview: ProjectAnnotations<Renderer> = {
  decorators: [withRoundTrip],
  globals: {
    [PARAM_KEY]: {one:1},
  },
};

export default preview;
